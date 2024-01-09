'use client'

import store from '@/lib/store'
import NewNutrientInfo from '../nutrientInfo/NewNutrientInfo'
import Form from '../Form'

export default function HomeAction() {
    const { nutrients } = store()

    return (
        <div className="flex justify-center items-center">
            {nutrients ? <NewNutrientInfo /> : <Form />}
        </div>
    )
}
