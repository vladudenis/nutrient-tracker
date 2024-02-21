'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { round } from '@/lib/utilFuncs'
import useStore from '@/lib/store'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'
import { Loader2, InfoIcon } from 'lucide-react'
import toast from 'react-hot-toast'

export default function BodyParametersCard({
    user,
    id,
    weight,
    height,
    sex,
    age,
    pal,
}: {
    user: string
    id: Id | null
    weight: number
    height: number
    sex: string
    age: number
    pal: number
}) {
    const setBodyParameters = useMutation(
        api.healthParameters.setBodyParameters
    )
    const updateBodyParameters = useMutation(
        api.healthParameters.updateBodyParameters
    )
    const form = useForm()
    const { setRCaloricIntake } = useStore()

    const [isLoading, setIsLoading] = useState(false)
    const [sexValue, setSexValue] = useState(sex)
    const [heightValue, setHeightValue] = useState(height)
    const [weightValue, setWeightValue] = useState(weight)
    const [ageValue, setAgeValue] = useState(age)
    const [palValue, setPalValue] = useState(pal)

    const bmr = 10 * weightValue + 6.25 * heightValue - 5 * ageValue
    const bmi = weightValue / Math.pow(heightValue / 100, 2)

    const onSubmit = () => {
        const rCaloricIntake =
            sexValue == 'male'
                ? Math.round((bmr + 5) * Number(palValue))
                : Math.round((bmr - 161) * Number(palValue))
        setIsLoading(true)
        setRCaloricIntake(rCaloricIntake)

        if (id) {
            updateBodyParameters({
                id,
                weight: weightValue,
                height: heightValue,
                sex: sexValue,
                age: ageValue,
                pal: palValue,
                recommendedCalories: rCaloricIntake,
            })
        } else {
            setBodyParameters({
                user,
                weight: weightValue,
                height: heightValue,
                sex: sexValue,
                age: ageValue,
                pal: palValue,
                recommendedCalories: rCaloricIntake,
            })
        }

        toast.success('Body parameters have been updated!')
        setIsLoading(false)
    }

    return (
        <div className="flex flex-col gap-5 items-center sm:w-[400px] px-6 pt-4 pb-6 rounded-lg shadow-md hover:shadow-2xl duration-500 border animate-jump-in animate-once animate-duration-[400ms] animate-delay-100 animate-ease-in-out">
            <p className="font-semibold text-xl mb-2">Body Parameters</p>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col items-center w-full gap-5"
            >
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">Male</span>
                        <input
                            type="radio"
                            name="radio-10"
                            className="radio checked:bg-red-500"
                            checked
                        />
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">Female</span>
                        <input
                            type="radio"
                            name="radio-10"
                            className="radio checked:bg-blue-500"
                            checked
                        />
                    </label>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <span className="flex justify-between">
                        <label htmlFor="height">Height</label>
                        <label htmlFor="heightValue">{heightValue} cm</label>
                    </span>
                    <input
                        id="height"
                        type="range"
                        min={120}
                        max={250}
                        value={weight}
                        className="range range-primary"
                        onVolumeChange={(value: any) =>
                            setHeightValue(value[0])
                        }
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <span className="flex justify-between">
                        <label htmlFor="weight">Weight</label>
                        <label htmlFor="weightValue">{weightValue} kg</label>
                    </span>
                    <input
                        id="weight"
                        type="range"
                        min={1}
                        max={200}
                        value={weight}
                        className="range range-primary"
                        onVolumeChange={(value: any) =>
                            setWeightValue(value[0])
                        }
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <span className="flex justify-between">
                        <label htmlFor="age">Age</label>
                        <label htmlFor="ageValue">{ageValue} yrs</label>
                    </span>
                    <input
                        id="age"
                        type="range"
                        min={18}
                        max={100}
                        value={age}
                        className="range range-primary"
                        onVolumeChange={(value: any) => setAgeValue(value[0])}
                    />
                </div>

                <div className="flex flex-col gap-2 w-full mt-2">
                    <label className="text-left">
                        Intensity of physical exercise
                    </label>
                    <select
                        id="pal"
                        className="select select-bordered w-full max-w-xs"
                    >
                        <option disabled selected>
                            Select intensity of physical act
                        </option>
                        <option value="1.2">Little/No Exercise</option>
                        <option value="1.4">
                            Light Exercise 1-2 times/week
                        </option>
                        <option value="1.6">
                            Moderate Exercise 2-3 times/week
                        </option>
                        <option value="1.75">
                            Hard Exercise 3-5 times/week
                        </option>
                        <option value="2">
                            Physical Job or Hard Exercise 6-7 times/week
                        </option>
                    </select>
                </div>

                {isLoading ? (
                    <button className="btn">
                        <Loader2 className="animate-spin mr-2" />
                        {id ? 'Update Parameters' : 'Set Parameters'}
                    </button>
                ) : (
                    <button className="btn" type="submit">
                        {id ? 'Update Parameters' : 'Set Parameters'}
                    </button>
                )}
            </form>

            <div className="divider" />

            <div className="w-full flex flex-col gap-2">
                <span className="w-full flex justify-between text-sm xs:text-base">
                    <p>Basal Metabolic Rate</p>
                    <p>
                        {sexValue == 'male'
                            ? Math.round(bmr + 5)
                            : Math.round(bmr - 161)}{' '}
                        kcal/day
                    </p>
                </span>
                <span className="w-full flex justify-between text-sm xs:text-base">
                    <p>Weight Maintenance</p>
                    <p>
                        {sexValue == 'male'
                            ? Math.round((bmr + 5) * Number(palValue))
                            : Math.round((bmr - 161) * Number(palValue))}{' '}
                        kcal/day
                    </p>
                </span>
                <span className="w-full flex justify-between text-sm xs:text-base">
                    <p>BMI</p>
                    <p>
                        {round(bmi)} kg/m<sup>2</sup>{' '}
                    </p>
                </span>
            </div>

            <div className="divider" />

            <label className="text-xs flex gap-2 items-center">
                <InfoIcon />
                Click the button to override existing parameters.
            </label>
        </div>
    )
}
