import PageHeader from '@/components/PageHeader'
import { getServerSession } from 'next-auth'
import { permanentRedirect } from 'next/navigation'

export default async function Page() {
    const session = await getServerSession()

    if (!session) {
        permanentRedirect('/')
    }

    return (
        <main className="flex flex-col items-center gap-24 px-24 py-16">
            <PageHeader text="Coming Soon!" />
        </main>
    )
}
