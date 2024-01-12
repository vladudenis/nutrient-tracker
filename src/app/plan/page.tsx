'use client'

import BodyParametersCard from '@/components/plan/BodyParametersCard'
import PageHeader from '@/components/PageHeader'
import { redirect } from 'next/navigation'
import TargetsCard from '@/components/plan/TargetsCard'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useSession } from 'next-auth/react'

export default function Page() {
    const { data: session } = useSession()
    const healthParameters = useQuery(
        api.healthParameters.fetchHealthParameters,
        { user: session?.user?.email! }
    )

    if (!session || !session.user || !session.user.email) {
        redirect('/')
    }

    return (
        <main className="flex min-h-screen flex-col items-center gap-24 px-8 lg:px-24 py-16">
            <PageHeader text="Your Nutrition Plan" />

            <div className="flex justify-center gap-12 md:gap-24 flex-wrap">
                {healthParameters ? (
                    <BodyParametersCard
                        user={session.user.email}
                        id={healthParameters._id}
                        weight={healthParameters.weight}
                        height={healthParameters.height}
                        age={healthParameters.age}
                        sex={healthParameters.sex}
                        pal={healthParameters.pal}
                    />
                ) : (
                    <BodyParametersCard
                        user={session.user.email}
                        id={null}
                        weight={60}
                        height={175}
                        age={30}
                        sex={'male'}
                        pal={1.2}
                    />
                )}
                {healthParameters ? (
                    healthParameters.caloricIntake ? (
                        <TargetsCard
                            id={healthParameters._id}
                            caloricIntake={healthParameters.caloricIntake}
                            fatIntake={healthParameters.fatIntake}
                            proteinIntake={healthParameters.proteinIntake}
                            carbsIntake={healthParameters.carbsIntake}
                            recommendedCalories={
                                healthParameters.recommendedCalories
                            }
                        />
                    ) : (
                        <TargetsCard
                            id={healthParameters._id}
                            caloricIntake={1850}
                            fatIntake={25}
                            proteinIntake={25}
                            carbsIntake={50}
                            recommendedCalories={
                                healthParameters.recommendedCalories
                            }
                            notSet={true}
                        />
                    )
                ) : (
                    <TargetsCard
                        id={null}
                        caloricIntake={1850}
                        fatIntake={25}
                        proteinIntake={25}
                        carbsIntake={50}
                        disableButton={true}
                        notSet={true}
                    />
                )}
            </div>
        </main>
    )
}
