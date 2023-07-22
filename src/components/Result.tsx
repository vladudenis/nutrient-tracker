"use client";

import { Button } from "./ui/button";
import NutrientInfo from "./NutrientInfo";
import store from "@/lib/store";

export default function Result() {
  const { nutrients } = store();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-8">
        {nutrients?.map((nutrientInfo) => (
          <NutrientInfo nutrientInfo={nutrientInfo} />
        ))}
      </div>

      <div className="flex justify-around">
        <Button className="bg-emerald-600 hover:bg-emerald-500">
          Save nutrient intake
        </Button>
        <Button className="bg-cyan-600 hover:bg-cyan-500">
          Try again with other food
        </Button>
      </div>
    </div>
  );
}
