"use client";

import { Button } from "./ui/button";
import NutrientInfo from "./NutrientInfo";
import store from "@/lib/store";
import { Save, RotateCw } from "lucide-react";
import SignInDialog from "./SignInDialog";
import { useSession } from "next-auth/react";
import NutrientIntakeDialog from "./NutrientIntakeDialog";

export default function Result() {
  const { nutrients, setNutrients } = store();
  const { data: session } = useSession();
  const hideSaveNutrientIntakeButton =
    nutrients && nutrients.length == 1 && !nutrients[0]?.ingredients[0].parsed;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-8">
        {nutrients?.map((nutrientInfo, idx) => (
          <NutrientInfo key={idx} nutrientInfo={nutrientInfo} />
        ))}
      </div>

      <div className="flex justify-center">
        <div className="flex gap-12">
          {session
            ? !hideSaveNutrientIntakeButton && (
                <NutrientIntakeDialog>
                  <Button className="bg-emerald-600 hover:bg-emerald-500 flex gap-2">
                    <Save />
                    Save nutrient intake
                  </Button>
                </NutrientIntakeDialog>
              )
            : !hideSaveNutrientIntakeButton && (
                <SignInDialog>
                  <Button className="bg-emerald-600 hover:bg-emerald-500 flex gap-2">
                    <Save />
                    Save nutrient intake
                  </Button>
                </SignInDialog>
              )}
          <Button
            className="bg-cyan-600 hover:bg-cyan-500 flex gap-2"
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
