'use client'

import store from '@/lib/store'
import NewNutrientInfo from '../nutrientInfo/NewNutrientInfo'
import NutrientInfoForm from '../nutrientInfo/NutrientInfoForm'

export default function HomeSwitch() {
    const { nutrients } = store()

    return (
        <div className="flex justify-center items-center">
            {nutrients ? <NewNutrientInfo /> : <NutrientInfoForm />}
        </div>
    )
}
