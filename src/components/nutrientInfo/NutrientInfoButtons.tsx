'use client'

import { useState } from 'react'
import { Calculator, Eye } from 'lucide-react'
import store from '@/lib/store'
import { Button } from '@mantine/core'

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
                    <Button
                        variant="filled"
                        radius="md"
                        size="lg"
                        onClick={showDetails}
                    >
                        <Eye className="mr-2" />
                        Show Details
                    </Button>
                ) : (
                    <Button
                        variant="filled"
                        radius="md"
                        size="lg"
                        onClick={calculateTotal}
                    >
                        <Calculator className="mr-2" />
                        Calculate Total
                    </Button>
                ))}
        </>
    )
}
