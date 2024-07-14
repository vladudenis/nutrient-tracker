import {
    getMicronutrientRows,
    calculateTotalNutrients,
    round,
} from '@/lib/utils'
import useStore from '@/lib/store'
import SortableList from '@/components/SortableList'
import { Trash, Star } from 'lucide-react'
import { api } from '../../../convex/_generated/api'
import { useMutation } from 'convex/react'
import { Button } from '@mantine/core'

export default function HistoryMealCard({
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

    return (
        <div
            id={_id}
            className="h-[255px] flex justify-center gap-10 rounded-lg shadow-md hover:shadow-2xl border duration-500 transition-shadow animate-jump-in animate-once animate-duration-[400ms] animate-delay-100 animate-ease-in-out"
        >
            <div className="flex flex-col items-center justify-center gap-5 px-4 py-2 ml-4">
                <span className="text-center">
                    <p className="text-2xl font-semibold">{day}</p>
                    <p>{formattedDate}</p>
                </span>
                <p className="text-lg font-mono">{mealType}</p>
                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        color="yellow"
                        size="sm"
                        radius="md"
                    >
                        <Star />
                    </Button>
                    <Button
                        variant="outline"
                        radius="md"
                        onClick={() => {
                            nutritionalInfo.totalNutrientIntake =
                                totalNutrientIntake

                            setShowHistoryDetails(true)
                            setNutritionInfo(nutritionalInfo)
                        }}
                    >
                        See Details
                    </Button>
                    <Button
                        variant="outline"
                        color="red"
                        size="sm"
                        radius="md"
                        onClick={async () => {
                            await removeMealMutation({ id: _id })
                        }}
                    >
                        <Trash />
                    </Button>
                </div>
            </div>

            <div className="h-[90%] self-center">
                <SortableList title="Macros" entries={macronutrients} />
            </div>

            <div className="h-[90%] self-center">
                <SortableList title="Micros" entries={micronutrients} />
            </div>

            {notes ? (
                <div className="h-[90%] w-52 flex flex-col justify-center self-center mr-8">
                    <span className="text-xl text-center font-semibold pb-1">
                        Notes
                    </span>
                    <div className="h-40 flex border-[1px] px-2 py-1">
                        <span className="font-mono">{notes}</span>
                    </div>
                </div>
            ) : (
                <div className="w-52 h-full flex justify-center items-center mr-8">
                    <p className="font-mono">No notes to show</p>
                </div>
            )}
        </div>
    )
}
