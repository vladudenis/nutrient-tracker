import { action, mutation, query } from './_generated/server'
import { internal } from './_generated/api'
import { paginationOptsValidator } from 'convex/server'
import { v } from 'convex/values'
import { Id } from './_generated/dataModel'

/**
 * Insert meal and nutrient intakes associated with meal into the respective tables
 */
const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]
export const saveMeal = mutation(
    async (
        { db, scheduler },
        {
            nutrientIntake,
            user,
            mealType,
            notes,
        }: {
            nutrientIntake: Object[]
            user: string
            mealType: string
            notes: string
        }
    ) => {
        const id = await db.insert('meal', {
            day: days[new Date().getDay()],
            user,
            mealType,
            notes,
        })

        await scheduler.runAfter(0, internal.nutrition.saveNutrientIntakes, {
            refId: id,
            nutrientIntake,
            user,
        })
    }
)

/**
 *
 */
export const removeMeal = mutation(
    async ({ db, scheduler }, { id }: { id: Id }) => {
        await db.delete(id)

        await scheduler.runAfter(0, internal.nutrition.removeNutrientIntakes, {
            refId: id,
        })
    }
)

/**
 * Fetches meals and a list of all the corresponding nutritional values for every meal
 */
export const fetchMeals = query({
    args: { paginationOpts: paginationOptsValidator, user: v.string() },
    handler: async (ctx, args) => {
        const meals = await ctx.db
            .query('meal')
            .filter((q) => q.eq(q.field('user'), args.user))
            .order('desc')
            .paginate(args.paginationOpts)

        for (const nutritionalInformation of meals.page) {
            const entries = await ctx.db
                .query('nutrition')
                .filter((q) =>
                    q.eq(q.field('refId'), nutritionalInformation._id)
                )
                .collect()

            nutritionalInformation.intakes = entries.map((entry: any) =>
                JSON.parse(entry.nutrientIntake)
            )
        }

        return meals || []
    },
})

/**
 * Fetches the total nutritional intake from all the meals eaten today
 */
export const fetchTodaysNutrition = query(
    async (
        { db },
        {
            user,
        }: {
            user: string
        }
    ) => {
        const dayStart = new Date()
        dayStart.setUTCHours(0, 0, 0, 0)

        const dayEnd = new Date()
        dayEnd.setUTCHours(23, 59, 59, 999)

        const meals = await db
            .query('meal')
            .filter((q) =>
                q.and(
                    q.eq(q.field('user'), user),
                    q.gte(q.field('_creationTime'), dayStart.getTime()),
                    q.lte(q.field('_creationTime'), dayEnd.getTime())
                )
            )
            .collect()

        const todaysNutrientIntakes: any[] = []
        for (const nutritionalInformation of meals) {
            const entries = await db
                .query('nutrientIntake')
                .filter((q) =>
                    q.eq(q.field('refId'), nutritionalInformation._id)
                )
                .collect()

            entries.map((entry: any) =>
                todaysNutrientIntakes.push(JSON.parse(entry.nutrientIntake))
            )
        }

        return todaysNutrientIntakes
    }
)
