'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import useStore from '@/lib/store'
import { calculateCaloricResult, round } from '@/lib/utilFuncs'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'
import { InfoIcon, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function TargetsCard({
    id,
    caloricIntake,
    fatIntake,
    proteinIntake,
    carbsIntake,
    disableButton,
    recommendedCalories,
    notSet,
}: {
    id: Id | null
    caloricIntake: number
    fatIntake: number
    proteinIntake: number
    carbsIntake: number
    disableButton?: boolean
    recommendedCalories?: number
    notSet?: boolean
}) {
    const addDailyTargets = useMutation(api.healthParameters.addDailyTargets)
    const form = useForm()
    const { rCaloricIntake } = useStore()

    const [isLoading, setIsLoading] = useState(false)
    const [caloricValue, setCaloricValue] = useState(
        recommendedCalories || caloricIntake
    )
    const [fatValue, setFatValue] = useState(fatIntake)
    const [proteinValue, setProteinValue] = useState(proteinIntake)
    const [carbsValue, setCarbsValue] = useState(carbsIntake)
    const totalValue = fatValue + proteinValue + carbsValue

    const onSubmit = () => {
        setIsLoading(true)

        if (!id) {
            return
        }

        addDailyTargets({
            id,
            caloricIntake: caloricValue,
            fatIntake: fatValue,
            proteinIntake: proteinValue,
            carbsIntake: carbsValue,
        })

        toast.success('Daily targets have been updated!')
        setIsLoading(false)
    }

    return (
        <div className="flex flex-col gap-5 items-center sm:w-[400px] px-6 pt-4 pb-6 rounded-lg shadow-md hover:shadow-2xl duration-500 border animate-jump-in animate-once animate-duration-[400ms] animate-delay-100 animate-ease-in-out">
            <p className="font-semibold text-xl mb-2">Daily Targets</p>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col items-center w-full gap-5"
            >
                <div className="flex flex-col gap-2 w-full">
                    <span className="flex justify-between">
                        <label htmlFor="calories">Calories</label>
                        <label htmlFor="caloricValue">
                            {caloricValue} kcal/day
                        </label>
                    </span>
                    <input
                        id="calories"
                        type="range"
                        min={500}
                        max={6000}
                        value={caloricValue}
                        className="range range-primary"
                        onVolumeChange={(value: any) =>
                            setCaloricValue(value[0])
                        }
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <span className="flex justify-between">
                        <label htmlFor="fat">Fat</label>
                        <label htmlFor="fatValue">{fatValue} %</label>
                    </span>
                    <input
                        id="fat"
                        type="range"
                        min={0}
                        max={100}
                        value={fatIntake}
                        className="range range-primary"
                        onVolumeChange={(value: any) => setFatValue(value[0])}
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <span className="flex justify-between">
                        <label htmlFor="protein">Protein</label>
                        <label htmlFor="proteinValue">{proteinValue} %</label>
                    </span>
                    <input
                        id="protein"
                        type="range"
                        min={0}
                        max={100}
                        value={proteinIntake}
                        className="range range-primary"
                        onVolumeChange={(value: any) =>
                            setProteinValue(value[0])
                        }
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <span className="flex justify-between">
                        <label htmlFor="carbs">Carbohydrate</label>
                        <label htmlFor="carbsValue">{carbsValue} %</label>
                    </span>
                    <input
                        id="carbs"
                        type="range"
                        min={0}
                        max={100}
                        value={carbsIntake}
                        className="range range-primary"
                        onVolumeChange={(value: any) => setCarbsValue(value[0])}
                    />
                </div>
                <div className="flex justify-between w-full">
                    <p>Total</p>
                    {totalValue === 100 ? (
                        <p>{totalValue} %</p>
                    ) : (
                        <p className="text-red-500">{totalValue} %</p>
                    )}
                </div>

                {isLoading ? (
                    <button className="btn">
                        <Loader2 className="animate-spin mr-2" />
                        {notSet ? 'Set Targets' : 'Update Targets'}
                    </button>
                ) : (
                    <button
                        className="btn"
                        disabled={disableButton || totalValue !== 100}
                        type="submit"
                    >
                        {notSet ? 'Set Targets' : 'Update Targets'}
                    </button>
                )}
            </form>

            <div className="divider" />

            <div className="w-full flex flex-col gap-2">
                <span className="w-full flex justify-between text-sm xs:text-base">
                    <p>Fat</p>
                    <p>{round((fatValue * caloricValue) / 900)} g</p>
                </span>
                <span className="w-full flex justify-between text-sm xs:text-base">
                    <p>Protein</p>
                    <p>{round((proteinValue * caloricValue) / 400)} g</p>
                </span>
                <span className="w-full flex justify-between text-sm xs:text-base">
                    <p>Carbohydrate</p>
                    <p>{round((carbsValue * caloricValue) / 400)} g</p>
                </span>
                <span className="w-full flex justify-between text-sm xs:text-base">
                    <p>Result</p>
                    <p>
                        {calculateCaloricResult(
                            recommendedCalories || rCaloricIntake,
                            caloricValue
                        )}
                    </p>
                </span>
            </div>

            <div className="divider" />

            <label className="text-xs flex gap-2 items-center">
                <InfoIcon />
                Update parameters or targets to change the result!
            </label>
        </div>
    )
}
