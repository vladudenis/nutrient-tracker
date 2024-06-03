import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

export default async function Page() {
    const session = await getServerSession()

    if (!session || !session.user || !session.user.email) {
        redirect('/')
    }

    return (
        <main className="flex flex-col items-center gap-24 pl-64 py-16"></main>
    )
}
