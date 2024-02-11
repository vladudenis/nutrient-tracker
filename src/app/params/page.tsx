import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import PlanAction from '@/components/actions/PlanAction'

export default async function Page() {
    const session = await getServerSession()

    if (!session || !session.user || !session.user.email) {
        redirect('/')
    }

    return (
        <main className="flex min-h-screen flex-col items-center gap-24 px-8 lg:px-24 py-16">
            <PlanAction userMail={session.user.email} />
        </main>
    )
}
