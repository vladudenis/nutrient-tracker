import { action } from "./_generated/server";

export const fetchNutrientInfo = action(
  async ({}, { textInputs }: { textInputs: string[] }) => {
    if (!textInputs.length) return;

    const allNutrients = [];

    for (const text of textInputs) {
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

    return allNutrients;
  }
);
