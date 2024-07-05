import HomeSwitch from '@/components/switches/HomeSwitch'
import PageHeader from '@/components/PageHeader'

export default async function Page() {
    return (
        <main className="flex flex-col items-center gap-24 pl-64 py-16">
            <PageHeader text="Track your nutrient intake with each meal you eat!" />
            <HomeSwitch />
        </main>
    )
}
