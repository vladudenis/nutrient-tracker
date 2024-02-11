import { Id } from '../../../convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useForm } from 'react-hook-form'
import useStore from '@/lib/store'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function PhysicalParamsCard({
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

    return <></>
}
