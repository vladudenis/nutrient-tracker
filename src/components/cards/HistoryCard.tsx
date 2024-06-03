import {
    getMicronutrientRows,
    calculateTotalNutrients,
    round,
} from '@/lib/utilFuncs'
import useStore from '@/lib/store'
import SortableList from '@/components/SortableList'

export default function HistoryCard({
    nutritionalInfo,
}: {
    nutritionalInfo: any
}) {
    const { day, _creationTime, mealType, notes } = nutritionalInfo
    const totalNutrientIntake = calculateTotalNutrients(nutritionalInfo.intakes)
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

    return (
        <div className="h-[250px] flex justify-center gap-10 rounded-lg shadow-md hover:shadow-2xl border duration-500 transition-shadow animate-jump-in animate-once animate-duration-[400ms] animate-delay-100 animate-ease-in-out">
            <div className="w-48 flex flex-col items-center justify-center gap-5 px-4 py-2">
                <span className="text-center">
                    <p className="text-2xl font-semibold">{day}</p>
                    <p>{formattedDate}</p>
                </span>
                <p className="text-lg font-mono">{mealType}</p>
                <button
                    className="btn"
                    onClick={() => {
                        nutritionalInfo.totalNutrientIntake =
                            totalNutrientIntake

                        setShowHistoryDetails(true)
                        setNutritionInfo(nutritionalInfo)
                    }}
                >
                    See Details
                </button>
            </div>

            <SortableList title="Macros" entries={macronutrients} />
            <SortableList title="Micros" entries={micronutrients} />
        </div>
    )
}
