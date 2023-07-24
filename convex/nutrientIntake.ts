import { mutation } from "./_generated/server";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const saveNutrientIntake = mutation(
  async (
    { db },
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
    for (const intake of nutrientIntake) {
      await db.insert("nutrientIntakes", {
        nutrientIntake: JSON.stringify(intake),
        day: days[new Date().getDay()],
        user,
        mealType,
        notes,
      });
    }
  }
);
