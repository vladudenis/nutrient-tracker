'use client'

import store from '@/lib/store'
import SavedNutrientInfo from '@/components/nutrientInfo/SavedNutrientInfo'
import PageHeader from '@/components/PageHeader'
import HistoryMealCard from '@/components/cards/HistoryMealCard'
import HistoryDayCard from '@/components/cards/HistoryDayCard'
import { Loader2 } from 'lucide-react'
import { usePaginatedQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function HistorySwitch() {
    const { showHistoryDetails, nutritionInfo } = store()
    const [view, setView] = useState('meal')
    const { data: session } = useSession()

    const batchSize = 10
    const {
        results,
        status: paginationStatus,
        loadMore,
    } = usePaginatedQuery(
        api.meal.fetchMeals,
        { user: session?.user?.email || '' },
        { initialNumItems: batchSize }
    )

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
            <div className="flex flex-col justify-center items-center gap-4">
                {!showHistoryDetails && results.length > 0 && (
                    <div className="w-full h-12 flex justify-start gap-4">
                        <button
                            className={`btn ${
                                view == 'meal' ? 'bg-neutral-300' : ''
                            }`}
                            onClick={() => setView('meal')}
                        >
                            Meal View
                        </button>
                        <button
                            className={`btn ${
                                view == 'day' ? 'bg-neutral-300' : ''
                            }`}
                            onClick={() => setView('day')}
                        >
                            Day View
                        </button>
                    </div>
                )}
                {showHistoryDetails ? (
                    <SavedNutrientInfo />
                ) : (
                    <>
                        <div className="flex flex-col gap-8">
                            {paginationStatus !== 'LoadingFirstPage' ? (
                                results.length ? (
                                    results.map((nutritionalInfo, idx) =>
                                        view == 'meal' ? (
                                            <HistoryMealCard
                                                key={idx}
                                                nutritionalInfo={
                                                    nutritionalInfo
                                                }
                                            />
                                        ) : (
                                            <HistoryDayCard
                                                key={idx}
                                                nutritionalInfo={
                                                    nutritionalInfo
                                                }
                                            />
                                        )
                                    )
                                ) : (
                                    <p className="text-lg">No entries found!</p>
                                )
                            ) : (
                                <Loader2 className="animate-spin h-12 w-12" />
                            )}
                        </div>
                        {paginationStatus == 'CanLoadMore' && (
                            <button
                                onClick={() => loadMore(batchSize)}
                                className="btn"
                            >
                                Load More
                            </button>
                        )}
                        {paginationStatus == 'LoadingMore' && (
                            <Loader2 className="animate-spin h-12 w-12" />
                        )}
                    </>
                )}
            </div>
        </>
    )
}
