import { Id } from './_generated/dataModel'
import { mutation, query } from './_generated/server'

/**
 * Inserts the health parameters
 */
export const saveHealthParameters = mutation(
    async (
        { db },
        {
            user,
            age,
            sex,
            height,
            weight,
            targetCal,
            targetFat,
            targetProtein,
            targetCarbs,
        }: {
            user: string
            age: number
            sex: string
            height: number
            weight: number
            targetCal: number
            targetFat: number
            targetProtein: number
            targetCarbs: number
        }
    ) => {
        return await db.insert('healthParameters', {
            user,
            age,
            sex,
            height,
            weight,
            targetCal,
            targetFat,
            targetProtein,
            targetCarbs,
        })
    }
)

/**
 * Updates the health parameters
 */
export const updateHealthParameters = mutation(
    async (
        { db },
        {
            id,
            age,
            sex,
            height,
            weight,
            targetCal,
            targetFat,
            targetProtein,
            targetCarbs,
        }: {
            id: Id
            age: number
            sex: string
            height: number
            weight: number
            targetCal: number
            targetFat: number
            targetProtein: number
            targetCarbs: number
        }
    ) => {
        await db.patch(id, {
            age,
            sex,
            height,
            weight,
            targetCal,
            targetFat,
            targetProtein,
            targetCarbs,
        })
    }
)

/**
 * Fetches the entries inside the healthParameters table
 */
export const fetchHealthParameters = query(
    async (
        { db },
        {
            user,
        }: {
            user: string
        }
    ) => {
        return await db
            .query('healthParameters')
            .filter((q) => q.eq(q.field('user'), user))
            .unique()
    }
)
