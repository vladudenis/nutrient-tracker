"use client";

import { Button } from "./ui/button";
import NutrientInfo from "./NutrientInfoCard";
import store from "@/lib/store";
import { Save, RotateCw, Calculator, Eye } from "lucide-react";
import SignInDialog from "./SignInDialog";
import { useSession } from "next-auth/react";
import NutrientIntakeDialog from "./NutrientIntakeDialog";
import { useState } from "react";
import { calculateTotal } from "@/lib/utilFuncs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Result() {
  const { nutrients, setNutrients } = store();
  const { data: session } = useSession();
  const healthParameters = useQuery(
    api.healthParameters.fetchHealthParameters,
    { user: session?.user?.email || "" }
  );
  const hideButtons =
    nutrients && nutrients.length == 1 && !nutrients[0]?.ingredients[0].parsed;
  const [showTotal, setShowTotal] = useState(false);
  const totalNutrients = calculateTotal(nutrients);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex gap-8 justify-center flex-wrap">
        {nutrients?.map((nutrientInfo, idx) => (
          <NutrientInfo
            key={idx}
            nutrientInfo={nutrientInfo}
            healthParams={healthParameters}
          />
        ))}
        <NutrientInfo
          nutrientInfo={totalNutrients}
          hidden={true}
          mealName="Total"
          id="totalNutrientInfo"
          healthParams={healthParameters}
        />
      </div>

      <div className="flex justify-center">
        <div className="flex justify-center gap-4 md:gap-12 flex-wrap">
          {nutrients &&
            nutrients.length >= 2 &&
            !hideButtons &&
            (showTotal ? (
              <Button
                className="bg-cyan-600 hover:bg-cyan-500 flex gap-2"
                onClick={() => {
                  const nutrientInfoCards = Array.from(
                    document.querySelectorAll("#nutrientInfo")
                  );
                  const totalNutrientInfoCard =
                    document.querySelector("#totalNutrientInfo");

                  for (const infoCard of nutrientInfoCards) {
                    infoCard.classList.remove("animate-jump-out");
                    infoCard.classList.remove("hidden");
                    infoCard.classList.add("animate-jump-in");
                  }

                  totalNutrientInfoCard?.classList.remove("animate-jump-in");
                  totalNutrientInfoCard?.classList.add("hidden");
                  totalNutrientInfoCard?.classList.add("animate-jump-out");

                  setShowTotal(false);
                }}
              >
                <Eye />
                Show Details
              </Button>
            ) : (
              <Button
                className="bg-cyan-600 hover:bg-cyan-500 flex gap-2"
                onClick={() => {
                  const nutrientInfoCards = Array.from(
                    document.querySelectorAll("#nutrientInfo")
                  );
                  const totalNutrientInfoCard =
                    document.querySelector("#totalNutrientInfo");

                  for (const infoCard of nutrientInfoCards) {
                    infoCard.classList.remove("animate-jump-in");
                    infoCard.classList.add("animate-jump-out");
                    infoCard.classList.add("hidden");
                  }

                  totalNutrientInfoCard?.classList.remove("hidden");
                  totalNutrientInfoCard?.classList.remove("animate-jump-out");
                  totalNutrientInfoCard?.classList.add("animate-jump-in");

                  setShowTotal(true);
                }}
              >
                <Calculator />
                Calculate Total
              </Button>
            ))}
          {session
            ? !hideButtons && (
                <NutrientIntakeDialog>
                  <Button className="bg-emerald-600 hover:bg-emerald-500 flex gap-2">
                    <Save />
                    Save nutrient intake
                  </Button>
                </NutrientIntakeDialog>
              )
            : !hideButtons && (
                <SignInDialog>
                  <Button className="bg-emerald-600 hover:bg-emerald-500 flex gap-2">
                    <Save />
                    Save nutrient intake
                  </Button>
                </SignInDialog>
              )}
          <Button
            className="bg-red-600 hover:bg-red-500 flex gap-2"
            onClick={() => {
              setNutrients(null);
            }}
          >
            <RotateCw />
            Try with other food
          </Button>
        </div>
      </div>
    </div>
  );
}
