import { Id } from './_generated/dataModel'
import { internalMutation, action } from './_generated/server'

/**
 * Fetches nutritional value from edamame api given a text input
 */
export const fetchNutrientInfo = action(
    async ({}, { textInputs }: { textInputs: string[] }) => {
        if (!textInputs.length) return

        const allNutrients = []

        for (const text of textInputs) {
            if (text && text.length) {
                const res = await fetch(
                    'https://api.edamam.com/api/nutrition-data?' +
                        new URLSearchParams({
                            app_id: process.env.EDAMAM_APP_ID!,
                            app_key: process.env.EDAMAM_APP_KEY!,
                            ingr: text,
                        }),
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )

                const nutrients = await res.json()
                allNutrients.push(nutrients)
            }
        }

        return allNutrients
    }
)

/**
 * Saves multiple entries of nutritional values in the db
 */
export const saveNutrientIntakes = internalMutation(
    async (
        { db },
        {
            nutrientIntake,
            user,
            refId,
        }: {
            nutrientIntake: Object[]
            user: string
            refId: Id
        }
    ) => {
        for (const intake of nutrientIntake) {
            await db.insert('nutrition', {
                nutrientIntake: JSON.stringify(intake),
                user,
                refId,
            })
        }
    }
)

/**
 * Delete entries of nutritional values associated with a meal
 */
export const removeNutrientIntakes = internalMutation(
    async ({ db }, { refId }: { refId: Id }) => {
        const entries = await db
            .query('nutrition')
            .filter((q) => q.eq(q.field('refId'), refId))
            .collect()

        for (const entry of entries) {
            await db.delete(entry._id)
        }
    }
)
