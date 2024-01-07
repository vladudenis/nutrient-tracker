'use client'

import { usePaginatedQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import HistoryCard from '@/components/HistoryCard'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import PageHeader from '@/components/PageHeader'
import useStore from '@/lib/store'
import SavedResult from '@/components/SavedResult'
import { Button } from '@/components/ui/button'

export default function Page() {
    const batch = 10
    const { data: session, status } = useSession()
    const {
        results,
        status: paginationStatus,
        loadMore,
    } = usePaginatedQuery(
        api.nutrientInfo.fetchNutritionalInformations,
        { user: session?.user?.email || '' },
        { initialNumItems: batch }
    )
    const { showHistoryDetails, nutritionInfo } = useStore()

    if (!session || !session.user || !session.user.email) {
        redirect('/')
    }

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
        <main className="flex min-h-screen flex-col items-center gap-24 px-8 xl:px-24 py-16">
            <PageHeader
                text={
                    showHistoryDetails
                        ? `Nutrition Details: ${nutritionInfo.mealType} on ${formattedDate} at ${formattedTime}`
                        : 'Your Nutrition History'
                }
            />

            {showHistoryDetails ? (
                <SavedResult />
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
                        <Button onClick={() => loadMore(batch)}>
                            Load More
                        </Button>
                    )}
                    {paginationStatus == 'LoadingMore' && (
                        <Loader2 className="animate-spin h-12 w-12" />
                    )}
                </>
            )}
        </main>
    )
}
