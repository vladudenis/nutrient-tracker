import { redirect } from 'next/navigation'
import HistoryAction from '@/components/actions/HistoryAction'
import { getServerSession } from 'next-auth'

export default async function Page() {
    const session = await getServerSession()

    if (!session || !session.user || !session.user.email) {
        redirect('/')
    }

    return (
        <main className="flex flex-col items-center gap-24 px-8 xl:px-24 py-16">
            <HistoryAction />
        </main>
    )
}
