import {
    calculateTotalNutrients,
    getMicronutrientRows,
    round,
} from '@/lib/utils'
import useStore from '@/lib/store'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'

export default function HistoryDayCard({
    nutritionalInfo,
}: {
    nutritionalInfo: any
}) {
    const { _id, _creationTime, day, mealType, notes, intakes } =
        nutritionalInfo
    const totalNutrientIntake = calculateTotalNutrients(intakes)
    const micronutrients = getMicronutrientRows(totalNutrientIntake)
    const macronutrients = [
        ['Macronutrient', 'Intake'],
        ['Calories', `${round(totalNutrientIntake.calories)}kcal`],
        ['Fat', `${round(totalNutrientIntake.totalNutrients.FAT.quantity)}g`],
        [
            'Protein',
            `${round(totalNutrientIntake.totalNutrients.PROCNT.quantity)}g`,
        ],
        [
            'Carbohydrates',
            `${round(totalNutrientIntake.totalNutrients.CHOCDF.quantity)}g`,
        ],
    ]

    const date = new Date(_creationTime)
    const formattedDate = `${date.getDate()}/${
        date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${
        date.getMinutes().toString().length == 1
            ? `0${date.getMinutes()}`
            : date.getMinutes()
    }`
    const { setShowHistoryDetails, setNutritionInfo } = useStore()
    const removeMealMutation = useMutation(api.meal.removeMeal)

    return <></>
}
