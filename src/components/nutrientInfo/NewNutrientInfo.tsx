'use client'

import NutrientInfoCard from '../cards/NutrientInfoCard'
import store from '@/lib/store'
import { Save, RotateCw } from 'lucide-react'
import { useSession } from 'next-auth/react'
import NutrientIntakeModal from '@/components/modals/NutrientIntakeModal'
import { calculateTotalNutrients } from '@/lib/utils'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import NutrientInfoButtons from '@/components/nutrientInfo/NutrientInfoButtons'
import { Button } from '@mantine/core'

export default function NewNutrientInfo() {
    const { nutrients, setNutrients } = store()
    const { data: session } = useSession()
    const healthParameters = useQuery(
        api.healthParameters.fetchHealthParameters,
        { user: session?.user?.email || '' }
    )
    const hideButtons =
        nutrients &&
        nutrients.length == 1 &&
        !nutrients[0]?.ingredients[0].parsed
    const totalNutrients = calculateTotalNutrients(nutrients)

    return (
        <div className="flex flex-col gap-12">
            <div className="flex gap-8 justify-center flex-wrap">
                {nutrients?.map((nutrientInfo, idx) => (
                    <NutrientInfoCard
                        key={idx}
                        nutrientInfo={nutrientInfo}
                        healthParams={healthParameters}
                    />
                ))}
                <NutrientInfoCard
                    nutrientInfo={totalNutrients}
                    hidden={true}
                    mealName="Total"
                    id="totalNutrientInfo"
                    healthParams={healthParameters}
                />
            </div>

            <div className="flex justify-center">
                <div className="flex justify-center gap-4 md:gap-12 flex-wrap">
                    <NutrientInfoButtons />
                    {session
                        ? !hideButtons && (
                              <NutrientIntakeModal>
                                  <Save className="mr-2" />
                                  Save nutrient intake
                              </NutrientIntakeModal>
                          )
                        : !hideButtons && (
                              <button className="btn" disabled>
                                  Sign In To Save
                              </button>
                          )}
                    <Button
                        variant="filled"
                        size="lg"
                        color="red"
                        radius="md"
                        onClick={() => {
                            setNutrients(null)
                        }}
                    >
                        <RotateCw className="mr-2" />
                        Try with other food
                    </Button>
                </div>
            </div>
        </div>
    )
}
