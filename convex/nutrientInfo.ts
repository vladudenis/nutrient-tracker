import { action, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

/**
 * Fetches nutritional value from edamame api given a text input
 */
export const fetchNutrientInfo = action(
  async ({}, { textInputs }: { textInputs: string[] }) => {
    if (!textInputs.length) return;

    const allNutrients = [];

    for (const text of textInputs) {
      if (text && text.length) {
        const res = await fetch(
          "https://api.edamam.com/api/nutrition-data?" +
            new URLSearchParams({
              app_id: process.env.EDAMAM_APP_ID!,
              app_key: process.env.EDAMAM_APP_KEY!,
              ingr: text,
            }),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const nutrients = await res.json();
        allNutrients.push(nutrients);
      }
    }

    return allNutrients;
  }
);

/**
 * Saves multiple nutritional values and inserts a single entry of nutritional info into the db
 */
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const saveNutritionalInformation = mutation(
  async (
    { db, scheduler },
    {
      nutrientIntake,
      user,
      mealType,
      notes,
    }: {
      nutrientIntake: Object[];
      user: string;
      mealType: string;
      notes: string;
    }
  ) => {
    const id = await db.insert("nutritionalInfo", {
      day: days[new Date().getDay()],
      user,
      mealType,
      notes,
    });

    scheduler.runAfter(0, internal.nutrientIntake.saveNutrientIntakes, {
      refId: id,
      nutrientIntake,
      user,
    });
  }
);

/**
 * Fetches 10 entries of nutritional info and a list of all the corresponding nutritional values for every nutritional info from the db
 */
export const fetchNutritionalInformations = query({
  args: { paginationOpts: paginationOptsValidator, user: v.string() },
  handler: async (ctx, args) => {
    const nutritionalInformations = await ctx.db
      .query("nutritionalInfo")
      .filter((q) => q.eq(q.field("user"), args.user))
      .order("desc")
      .paginate(args.paginationOpts);

    for (const nutritionalInformation of nutritionalInformations.page) {
      const entries = await ctx.db
        .query("nutrientIntake")
        .filter((q) => q.eq(q.field("refId"), nutritionalInformation._id))
        .collect();

      nutritionalInformation.intakes = entries.map((entry: any) =>
        JSON.parse(entry.nutrientIntake)
      );
    }

    return nutritionalInformations || [];
  },
});

export const fetchTodaysNutrition = query(
  async (
    { db },
    {
      user,
    }: {
      user: string;
    }
  ) => {
    const dayStart = new Date();
    dayStart.setUTCHours(0, 0, 0, 0);
    const dayEnd = new Date();
    dayEnd.setUTCHours(23, 59, 59, 999);

    const nutritionalInformations = await db
      .query("nutritionalInfo")
      .filter((q) =>
        q.and(
          q.eq(q.field("user"), user),
          q.gte(q.field("_creationTime"), dayStart.getTime()),
          q.lte(q.field("_creationTime"), dayEnd.getTime())
        )
      )
      .collect();

    const todaysNutrientIntakes: any[] = [];
    for (const nutritionalInformation of nutritionalInformations) {
      const entries = await db
        .query("nutrientIntake")
        .filter((q) => q.eq(q.field("refId"), nutritionalInformation._id))
        .collect();

      entries.map((entry: any) =>
        todaysNutrientIntakes.push(JSON.parse(entry.nutrientIntake))
      );
    }

    return todaysNutrientIntakes;
  }
);
