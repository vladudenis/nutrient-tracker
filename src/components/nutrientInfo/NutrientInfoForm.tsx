'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import store from '@/lib/store'
import { useForm } from 'react-hook-form'
import { api } from '../../../convex/_generated/api'
import { useAction } from 'convex/react'

export default function NutrientInfoForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [isParseFailure, setIsParseFailure] = useState(false)
    const { setNutrients } = store()
    const fetchNutrients = useAction(api.nutrientInfo.fetchNutrientInfo)

    const onSubmit = async (data: any) => {
        const textInputs = data.textInput.split('\n')

        setIsLoading(true)
        setIsParseFailure(false)

        if (textInputs.length > 12) {
            setIsLoading(false)
            setIsParseFailure(true)
            return
        }

        const allNutrients = await fetchNutrients({ textInputs })

        if (!allNutrients) {
            setIsLoading(false)
            setIsParseFailure(true)
            return
        }

        for (const nutrientInfo of allNutrients) {
            if (!nutrientInfo.ingredients[0].parsed) {
                setIsLoading(false)
                setIsParseFailure(true)
                return
            }
        }

        setNutrients(allNutrients)
        setIsLoading(false)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 animate-jump-in animate-once animate-duration-[400ms] animate-delay-100 animate-ease-in-out"
        >
            <div className="flex flex-col gap-4">
                <p className="text-lg">
                    Enter some food and a unit of measurement:
                </p>
                <textarea
                    {...register('textInput', { required: true })}
                    className="md:w-[500px] h-[250px] resize-none text-lg textarea textarea-bordered"
                    placeholder={
                        '200 g chicken thigh\n3 ounces of rice\n150 ml orange juice\n1 cup of broccoli'
                    }
                    id="info"
                />
            </div>

            {isParseFailure && (
                <div className="md:w-[500px] flex flex-col items-center">
                    <p className="text-red-400 font-semibold text-lg">
                        The food that you entered could not be parsed!
                    </p>
                    <br />
                    <div>
                        <p className="text-red-400">Please ensure that:</p>
                        <ul className="text-red-400 list-disc ml-8">
                            <li>You entered a real food</li>
                            <li>You separated food components with an enter</li>
                            <li>
                                You did not enter more than 6 food components at
                                a time
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            <div className="flex justify-center">
                {isLoading ? (
                    <button className="h-10 w-40 text-lg btn">
                        <Loader2 className="animate-spin mr-2" />
                        Submit
                    </button>
                ) : (
                    <button type="submit" className="h-10 w-40 text-lg btn">
                        Submit
                    </button>
                )}
            </div>
        </form>
    )
}
