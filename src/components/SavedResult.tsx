"use client";

import { Button } from "./ui/button";
import NutrientInfo from "./NutrientInfoCard";
import store from "@/lib/store";
import { ArrowBigLeft, Calculator, Eye } from "lucide-react";
import { useState } from "react";

export default function SavedResult() {
  const { nutritionInfo, setShowHistoryDetails } = store();
  const nutrients: any[] = nutritionInfo.intakes;
  const hideButtons =
    nutrients && nutrients.length == 1 && !nutrients[0]?.ingredients[0].parsed;
  const [showTotal, setShowTotal] = useState(false);
  const totalNutrients = nutritionInfo.totalNutrientIntake;

  return (
    <div className="flex flex-col gap-12">
      <div className="flex gap-8 justify-center">
        {nutrients?.map((nutrientInfo, idx) => (
          <NutrientInfo key={idx} nutrientInfo={nutrientInfo} />
        ))}
        {
          <NutrientInfo
            nutrientInfo={totalNutrients}
            hidden={true}
            mealName="Total"
            id="totalNutrientInfo"
          />
        }
      </div>

      <div className="flex justify-center">
        <div className="flex gap-12">
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

          <Button
            className="bg-red-600 hover:bg-red-500 flex gap-2"
            onClick={() => {
              setShowHistoryDetails(false);
            }}
          >
            <ArrowBigLeft />
            Go back to history
          </Button>
        </div>
      </div>
    </div>
  );
}
