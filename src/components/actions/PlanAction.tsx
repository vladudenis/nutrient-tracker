'use client'

import BodyParametersCard from '@/components/plan/BodyParametersCard'
import TargetsCard from '@/components/plan/TargetsCard'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import PageHeader from '@/components/PageHeader'

export default function PlanAction({
    userMail,
}: {
    userMail: string | undefined
}) {
    const healthParameters = useQuery(
        api.healthParameters.fetchHealthParameters,
        // @ts-ignore
        { user: userMail }
    )

    return (
        <>
            <PageHeader text="Your Nutrition Plan" />
            <div className="flex justify-center gap-12 md:gap-24 flex-wrap">
                {healthParameters ? (
                    <BodyParametersCard
                        // @ts-ignore
                        user={userMail}
                        id={healthParameters._id}
                        weight={healthParameters.weight}
                        height={healthParameters.height}
                        age={healthParameters.age}
                        sex={healthParameters.sex}
                        pal={healthParameters.pal}
                    />
                ) : (
                    <BodyParametersCard
                        // @ts-ignore
                        user={userMail}
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
        </>
    )
}
