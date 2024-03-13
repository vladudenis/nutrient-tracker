'use client'

import { useState } from 'react'
import { Calculator, Eye } from 'lucide-react'
import store from '@/lib/store'

export default function NutrientInfoButtons() {
    let { nutrients, nutritionInfo } = store()

    if (!nutrients) {
        nutrients = nutritionInfo.intakes
    }

    const [showTotal, setShowTotal] = useState(false)
    const hideButtons =
        nutrients &&
        nutrients.length == 1 &&
        !nutrients[0]?.ingredients[0].parsed

    const showDetails = () => {
        const nutrientInfoCards = Array.from(
            document.querySelectorAll('#nutrientInfo')
        )
        const totalNutrientInfoCard =
            document.querySelector('#totalNutrientInfo')

        for (const infoCard of nutrientInfoCards) {
            infoCard.classList.remove('animate-jump-out')
            infoCard.classList.remove('hidden')
            infoCard.classList.add('animate-jump-in')
        }

        totalNutrientInfoCard?.classList.remove('animate-jump-in')
        totalNutrientInfoCard?.classList.add('hidden')
        totalNutrientInfoCard?.classList.add('animate-jump-out')

        setShowTotal(false)
    }

    const calculateTotal = () => {
        const nutrientInfoCards = Array.from(
            document.querySelectorAll('#nutrientInfo')
        )
        const totalNutrientInfoCard =
            document.querySelector('#totalNutrientInfo')

        for (const infoCard of nutrientInfoCards) {
            infoCard.classList.remove('animate-jump-in')
            infoCard.classList.add('animate-jump-out')
            infoCard.classList.add('hidden')
        }

        totalNutrientInfoCard?.classList.remove('hidden')
        totalNutrientInfoCard?.classList.remove('animate-jump-out')
        totalNutrientInfoCard?.classList.add('animate-jump-in')

        setShowTotal(true)
    }

    return (
        <>
            {nutrients &&
                nutrients.length >= 2 &&
                !hideButtons &&
                (showTotal ? (
                    <button
                        className="bg-cyan-600 hover:bg-cyan-500 flex gap-2 btn text-white"
                        onClick={showDetails}
                    >
                        <Eye />
                        Show Details
                    </button>
                ) : (
                    <button
                        className="bg-cyan-600 hover:bg-cyan-500 flex gap-2 btn text-white"
                        onClick={calculateTotal}
                    >
                        <Calculator />
                        Calculate Total
                    </button>
                ))}
        </>
    )
}
