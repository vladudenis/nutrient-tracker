import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'
import {
    calculateInsufficiencies,
    calculateSurpluses,
    calculateTotalNutrients,
    round,
} from '@/lib/utilFuncs'
import { Separator } from './ui/separator'
import useStore from '@/lib/store'

export default function HistoryCard({
    nutritionalInfo,
}: {
    nutritionalInfo: any
}) {
    const { day, _creationTime, mealType, notes } = nutritionalInfo
    const totalNutrientIntake = calculateTotalNutrients(nutritionalInfo.intakes)
    const insufficiencies = calculateInsufficiencies(totalNutrientIntake)
    const surpluses = calculateSurpluses(totalNutrientIntake)

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
        <div className="flex gap-4 justify-center h-[250px] rounded-lg shadow-md hover:shadow-2xl border duration-500 transition-shadow animate-jump-in animate-once animate-duration-[400ms] animate-delay-100 animate-ease-in-out">
            <div className="flex flex-col items-center justify-center gap-5 px-2 xl:px-4 py-1 xl:py-2 w-48 lg:w-40 xl:w-48">
                <span className="text-center">
                    <p className="text-2xl font-semibold">{day}</p>
                    <p>{formattedDate}</p>
                </span>
                <p className="text-lg font-mono">{mealType}</p>
                <Button
                    onClick={() => {
                        nutritionalInfo.totalNutrientIntake =
                            totalNutrientIntake

                        setShowHistoryDetails(true)
                        setNutritionInfo(nutritionalInfo)
                    }}
                >
                    See Details
                </Button>
            </div>

            <div className="py-6 hidden xs:block">
                <Separator orientation="vertical" />
            </div>

            <div className="flex flex-col items-center justify-center px-2 xl:px-4 py-1 xl:py-2 hidden xs:flex">
                <div className="flex flex-col gap-1 w-48 lg:w-40 xl:w-48 px-2 xl:px-4 py-1 xl:py-2">
                    <p className="text-lg font-semibold text-center">Macros</p>
                    <span className="flex justify-between">
                        <p>Calories:</p>
                        <p>{round(totalNutrientIntake.calories)}kcal</p>
                    </span>
                    <Separator orientation="horizontal" />
                    <span className="flex justify-between">
                        <p>Fat:</p>
                        <p>
                            {round(
                                totalNutrientIntake.totalNutrients.FAT.quantity
                            )}
                            g
                        </p>
                    </span>
                    <span className="flex justify-between">
                        <p>Protein:</p>
                        <p>
                            {round(
                                totalNutrientIntake.totalNutrients.PROCNT
                                    .quantity
                            )}
                            g
                        </p>
                    </span>
                    <span className="flex justify-between">
                        <p>Carbohydrate:</p>
                        <p>
                            {round(
                                totalNutrientIntake.totalNutrients.CHOCDF
                                    .quantity
                            )}
                            g
                        </p>
                    </span>
                    <span className="flex justify-between">
                        <p>Cholesterol:</p>
                        <p>
                            {round(
                                totalNutrientIntake.totalNutrients.CHOLE
                                    .quantity
                            )}
                            g
                        </p>
                    </span>
                </div>
            </div>

            <div className="py-6 hidden lg:block">
                <Separator orientation="vertical" />
            </div>

            <div className="grid grid-rows-4 px-2 xl:px-4 py-1 xl:py-2 w-40 xl:w-48 hidden lg:grid">
                <div className="flex items-end justify-center">
                    <p className="text-lg font-semibold text-center">
                        Low Intakes
                    </p>
                </div>
                {insufficiencies && insufficiencies.length && (
                    <ScrollArea className="rounded-md border row-span-3 mb-4 px-2">
                        <div className="flex flex-col">
                            {insufficiencies[0].map((insuff, i) => (
                                <span
                                    key={i}
                                    className="text-orange-400 flex justify-between"
                                >
                                    <p>{insuff.label}</p>
                                    <p>{Math.round(insuff.quantity)}%</p>
                                </span>
                            ))}
                        </div>
                        <div className="flex flex-col">
                            {insufficiencies[1].map((deff, j) => (
                                <span
                                    key={j}
                                    className="text-red-400 flex justify-between"
                                >
                                    <p>{deff.label}</p>
                                    <p>{Math.round(deff.quantity)}%</p>
                                </span>
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </div>

            <div className="py-6 hidden lg:block">
                <Separator orientation="vertical" />
            </div>

            <div className="grid grid-rows-4 px-2 xl:px-4 py-1 xl:py-2 w-40 xl:w-48 hidden lg:grid">
                <div className="flex items-end justify-center">
                    <p className="text-lg font-semibold text-center">
                        High Intakes
                    </p>
                </div>
                {surpluses && surpluses.length && (
                    <ScrollArea className="rounded-md border row-span-3 mb-4 px-2">
                        <div className="flex flex-col">
                            {surpluses[0].map((suff, idx) => (
                                <span
                                    key={idx}
                                    className="text-emerald-400 flex justify-between"
                                >
                                    <p>{suff.label}</p>
                                    <p>{Math.round(suff.quantity)}%</p>
                                </span>
                            ))}
                        </div>
                        <div className="flex flex-col">
                            {surpluses[1].map((surpl, idx) => (
                                <span
                                    key={idx}
                                    className="text-purple-700 flex justify-between"
                                >
                                    <p>{surpl.label}</p>
                                    <p>{Math.round(surpl.quantity)}%</p>
                                </span>
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </div>

            <div className="py-6">
                <Separator orientation="vertical" />
            </div>

            <div className="grid grid-rows-4 px-2 xl:px-4 py-1 xl:py-2 w-48 lg:w-40 xl:w-48 hidden md:grid">
                <div className="flex items-end justify-center">
                    <p className="text-lg font-semibold">Notes</p>
                </div>
                <div className="row-span-3 mb-8 flex flex-col items-center">
                    <Separator orientation="horizontal" />
                    <span>{notes}</span>
                </div>
            </div>
        </div>
    )
}
