'use client'

import NutrientInfoCard from '../cards/NutrientInfoCard'
import store from '@/lib/store'
import { ArrowBigLeft } from 'lucide-react'
import NutrientInfoButtons from '@/components/nutrientInfo/NutrientInfoButtons'

export default function SavedNutrientInfo() {
    const { nutritionInfo, setShowHistoryDetails } = store()
    const nutrients: any[] = nutritionInfo.intakes
    const totalNutrients = nutritionInfo.totalNutrientIntake

    return (
        <div className="flex flex-col gap-12">
            <div className="flex gap-8 justify-center flex-wrap">
                {nutrients?.map((nutrientInfo, idx) => (
                    <NutrientInfoCard key={idx} nutrientInfo={nutrientInfo} />
                ))}
                {
                    <NutrientInfoCard
                        nutrientInfo={totalNutrients}
                        hidden={true}
                        mealName="Total"
                        id="totalNutrientInfo"
                    />
                }
            </div>

            <div className="flex justify-center">
                <div className="flex gap-12">
                    <NutrientInfoButtons />
                    <button
                        className="bg-red-600 hover:bg-red-500 flex gap-2 btn text-white"
                        onClick={() => {
                            setShowHistoryDetails(false)
                        }}
                    >
                        <ArrowBigLeft />
                        Go back to history
                    </button>
                </div>
            </div>
        </div>
    )
}
