import HomeAction from '@/components/actions/HomeAction'
import PageHeader from '@/components/PageHeader'
import { getServerSession } from 'next-auth'
import { permanentRedirect } from 'next/navigation'

export default async function Home() {
    const session = await getServerSession()

    if (session) {
        permanentRedirect('/dashboard')
    }

    return (
        <main className="flex flex-col items-center gap-24 px-8 sm:px-24 py-16">
            <PageHeader text="Track your nutrient intake with each meal you eat!" />
            <HomeAction />
        </main>
    )
}
