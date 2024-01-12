'use client'

import store from '@/lib/store'
import SavedNutrientInfo from '@/components/nutrientInfo/SavedNutrientInfo'
import PageHeader from '@/components/PageHeader'
import HistoryCard from '@/components/history/HistoryCard'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { usePaginatedQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

export default function HistoryAction() {
    const { showHistoryDetails, nutritionInfo } = store()

    const batchSize = 10
    const { data: session } = useSession()
    const {
        results,
        status: paginationStatus,
        loadMore,
    } = usePaginatedQuery(
        api.nutrientInfo.fetchNutritionalInformations,
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
            <div className="flex justify-center items-center">
                {showHistoryDetails ? (
                    <SavedNutrientInfo />
                ) : (
                    <>
                        <div className="flex flex-col gap-8">
                            {paginationStatus !== 'LoadingFirstPage' ? (
                                results.length ? (
                                    results.map((nutritionalInfo, idx) => (
                                        <HistoryCard
                                            key={idx}
                                            nutritionalInfo={nutritionalInfo}
                                        />
                                    ))
                                ) : (
                                    <p className="text-lg">No entries found!</p>
                                )
                            ) : (
                                <Loader2 className="animate-spin h-12 w-12" />
                            )}
                        </div>
                        {paginationStatus == 'CanLoadMore' && (
                            <Button onClick={() => loadMore(batchSize)}>
                                Load More
                            </Button>
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
