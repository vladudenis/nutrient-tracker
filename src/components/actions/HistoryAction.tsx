'use client'

import store from '@/lib/store'
import SavedNutrientInfo from '@/components/nutrientInfo/SavedNutrientInfo'
import History from '@/components/History'
import PageHeader from '@/components/PageHeader'

export default function HistoryAction() {
    const { showHistoryDetails, nutritionInfo } = store()

    let date
    let formattedDate
    let formattedTime

    if (showHistoryDetails) {
        date = new Date(nutritionInfo._creationTime)
        formattedDate = `${date.getDate()}/${
            date.getMonth() + 1
        }/${date.getFullYear()}`
        formattedTime = `${date.getHours()}:${
            date.getMinutes().toString().length == 1
                ? `0${date.getMinutes()}`
                : date.getMinutes()
        }`
    }

    return (
        <>
            <PageHeader
                text={
                    showHistoryDetails
                        ? `Nutrition Details: ${nutritionInfo.mealType} on ${formattedDate} at ${formattedTime}`
                        : 'Your Nutrition History'
                }
            />
            <div className="flex justify-center items-center">
                {showHistoryDetails ? <SavedNutrientInfo /> : <History />}
            </div>
        </>
    )
}
