'use client'

import NutrientInfoCard from './NutrientInfoCard'
import store from '@/lib/store'
import { Save, RotateCw } from 'lucide-react'
import SignInDialog from '../dialogs/SignInDialog'
import { useSession } from 'next-auth/react'
import NutrientIntakeDialog from '../dialogs/NutrientIntakeDialog'
import { calculateTotalNutrients } from '@/lib/utilFuncs'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import NutrientInfoButtons from '@/components/nutrientInfo/NutrientInfoButtons'

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
                              <NutrientIntakeDialog>
                                  <button className="bg-emerald-600 hover:bg-emerald-500 flex gap-2 btn">
                                      <Save />
                                      Save nutrient intake
                                  </button>
                              </NutrientIntakeDialog>
                          )
                        : !hideButtons && (
                              <SignInDialog>
                                  <button className="bg-emerald-600 hover:bg-emerald-500 flex gap-2 btn">
                                      <Save />
                                      Save nutrient intake
                                  </button>
                              </SignInDialog>
                          )}
                    <button
                        className="bg-red-600 hover:bg-red-500 flex gap-2 btn"
                        onClick={() => {
                            setNutrients(null)
                        }}
                    >
                        <RotateCw />
                        Try with other food
                    </button>
                </div>
            </div>
        </div>
    )
}
