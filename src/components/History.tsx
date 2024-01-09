import HistoryCard from '@/components/HistoryCard'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePaginatedQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useSession } from 'next-auth/react'

export default function History() {
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

    return (
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
                <Button onClick={() => loadMore(batchSize)}>Load More</Button>
            )}
            {paginationStatus == 'LoadingMore' && (
                <Loader2 className="animate-spin h-12 w-12" />
            )}
        </>
    )
}
