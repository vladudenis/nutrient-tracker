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
import { Button, Modal, Select, Textarea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export default function NutrientIntakeModal(props: {
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
    const [opened, { open, close }] = useDisclosure(false)
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
            <Button variant="filled" size="lg" radius="md" onClick={open}>
                {props.children}
            </Button>

            <Modal
                opened={opened}
                onClose={close}
                title="Save Nutrient Intake"
                centered
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="mb-4 flex flex-col gap-2">
                            {/* @ts-ignore */}
                            <Select
                                {...register('mealType')}
                                label="Meal Type"
                                placeholder="Choose a meal type"
                                data={[
                                    'Breakfast',
                                    'Brunch',
                                    'Lunch',
                                    'Dinner',
                                    'Snack',
                                ]}
                                defaultValue="Breakfast"
                                clearable
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Textarea
                                {...register('notes')}
                                label="Additional Notes"
                                placeholder="Input placeholder"
                            />
                        </div>
                        {isLoading ? (
                            <Button variant="filled">
                                <Loader2 className="animate-spin mr-2" />
                                Save
                            </Button>
                        ) : (
                            <Button variant="filled" type="submit">
                                <Save className="mr-2" />
                                Save
                            </Button>
                        )}
                    </div>
                </form>
            </Modal>
        </>
    )
}
