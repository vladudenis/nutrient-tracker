import { internalMutation } from "./_generated/server";

/**
 * Saves multiple entries of nutritional values in the db
 */
export const saveNutrientIntakes = internalMutation(
  async (
    { db },
    {
      nutrientIntake,
      user,
    }: {
      nutrientIntake: Object[];
      user: string;
    }
  ) => {
    for (const intake of nutrientIntake) {
      await db.insert("nutrientIntake", {
        nutrientIntake: JSON.stringify(intake),
        user,
      });
    }
  }
);
