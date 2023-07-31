import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

/**
 * Inserts the body parameters into the db
 */
export const setBodyParameters = mutation(
  async (
    { db },
    {
      user,
      weight,
      height,
      sex,
      age,
      pal,
      recommendedCalories,
    }: {
      user: string;
      weight: number;
      height: number;
      sex: string;
      age: number;
      pal: number;
      recommendedCalories: number;
    }
  ) => {
    const id = await db.insert("healthParameters", {
      user,
      weight,
      height,
      sex,
      age,
      pal,
      recommendedCalories,
      caloricIntake: null,
      fatIntake: null,
      proteinIntake: null,
      carbsIntake: null,
    });

    return id;
  }
);

/**
 * Updates the body parameters in the db
 */
export const updateBodyParameters = mutation(
  async (
    { db },
    {
      id,
      weight,
      height,
      sex,
      age,
      pal,
      recommendedCalories,
    }: {
      id: Id;
      weight: number;
      height: number;
      sex: string;
      age: number;
      pal: number;
      recommendedCalories: number;
    }
  ) => {
    const {
      oldWeight,
      oldHeight,
      oldSex,
      oldAge,
      oldPal,
      oldRecommendedCalories,
    } = await db.get(id);

    await db.patch(id, {
      weight: weight || oldWeight,
      height: height || oldHeight,
      sex: sex || oldSex,
      age: age || oldAge,
      pal: pal || oldPal,
      recommendedCalories: recommendedCalories || oldRecommendedCalories,
    });
  }
);

/**
 * Adds the daily targets to the db
 */
export const addDailyTargets = mutation(
  async (
    { db },
    {
      id,
      caloricIntake,
      fatIntake,
      proteinIntake,
      carbsIntake,
    }: {
      id: Id;
      caloricIntake: number;
      fatIntake: number;
      proteinIntake: number;
      carbsIntake: number;
    }
  ) => {
    const { oldCaloricIntake, oldFatIntake, oldProteinIntake, oldCarbsIntake } =
      await db.get(id);

    await db.patch(id, {
      caloricIntake: caloricIntake || oldCaloricIntake,
      fatIntake: fatIntake || oldFatIntake,
      proteinIntake: proteinIntake || oldProteinIntake,
      carbsIntake: carbsIntake || oldCarbsIntake,
    });
  }
);

/**
 * Fetches the entries inside the healthParameters table in the db
 */
export const fetchHealthParameters = query(
  async (
    { db },
    {
      user,
    }: {
      user: string;
    }
  ) => {
    const healthParameters = await db
      .query("healthParameters")
      .filter((q) => q.eq(q.field("user"), user))
      .unique();

    return healthParameters;
  }
);
