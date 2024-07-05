'use client'

import {
    ReactElement,
    JSXElementConstructor,
    ReactNode,
    ReactPortal,
    PromiseLikeOfReactNode,
} from 'react'
import toast from 'react-hot-toast'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import store from '@/lib/store'
import { Loader2, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'

export default function NutrientIntakeDialog(props: {
    children:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | ReactPortal
        | PromiseLikeOfReactNode
        | null
        | undefined
}) {
    const { register, handleSubmit } = useForm()
    const { data: session } = useSession()
    const saveNutrientIntakeMutation = useMutation(api.meal.saveMeal)
    const [isLoading, setIsLoading] = useState(false)
    const { nutrients, setNutrients } = store()

    const onSubmit = async (data: any) => {
        if (!nutrients || !session?.user?.email) {
            return
        }

        setIsLoading(true)

        await saveNutrientIntakeMutation({
            nutrientIntake: nutrients,
            user: session?.user?.email,
            mealType: data.mealType,
            notes: data.notes || '',
        })

        toast.success('Nutrient intake was saved.')

        setIsLoading(false)
        setNutrients(null)
    }

    return (
        <>
            <button
                className="btn bg-emerald-600 hover:bg-emerald-500 flex gap-2 text-white"
                onClick={() =>
                    // @ts-ignore
                    document.getElementById('sign-in_modal').showModal()
                }
            >
                {props.children}
            </button>
            <dialog id="sign-in_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Save Nutrient Intake</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4">
                            <div className="mb-4 flex flex-col gap-2">
                                <label
                                    htmlFor="meal-type"
                                    className="text-left"
                                >
                                    Meal Type
                                </label>
                                <select
                                    {...register('mealType')}
                                    id="meal-type"
                                    className="select select-bordered w-full max-w-xs"
                                >
                                    <option>Breakfast</option>
                                    <option>Brunch</option>
                                    <option>Lunch</option>
                                    <option>Dinner</option>
                                    <option>Snack</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="notes" className="text-left">
                                    Additional Notes
                                </label>
                                <textarea
                                    {...register('notes')}
                                    id="notes"
                                    className="textarea textarea-bordered resize-none"
                                />
                            </div>
                            {isLoading ? (
                                <button className="bg-emerald-600 hover:bg-emerald-500 flex gap-2 btn text-white">
                                    <Loader2 className="animate-spin" />
                                    Save
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="bg-emerald-600 hover:bg-emerald-500 flex gap-2 btn text-white"
                                >
                                    <Save />
                                    Save
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    )
}
