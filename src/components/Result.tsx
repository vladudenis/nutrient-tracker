"use client";

import { Button } from "./ui/button";
import NutrientInfo from "./NutrientInfo";
import store from "@/lib/store";
import { Save, RotateCw, Loader2 } from "lucide-react";
import DialogComponent from "./Dialog";
import { useSession } from "next-auth/react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Result() {
  const { nutrients, setNutrients } = store();
  const { data: session } = useSession();
  const hideSaveNutrientIntakeButton =
    nutrients && nutrients.length == 1 && !nutrients[0]?.ingredients[0].parsed;
  const saveNutrientIntakeMutation = useMutation(
    api.nutrientIntake.saveNutrientIntake
  );
  const [isLoading, setIsLoading] = useState(false);

  const saveNutrientIntake = async () => {
    if (!nutrients || !session?.user?.email) {
      return;
    }

    setIsLoading(true);

    await saveNutrientIntakeMutation({
      nutrientIntake: nutrients,
      user: session?.user?.email,
    });

    toast.success("Nutrient intake was saved.");

    setIsLoading(false);
    setNutrients(null);
  };

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
            ? !hideSaveNutrientIntakeButton &&
              (isLoading ? (
                <Button
                  onClick={saveNutrientIntake}
                  className="bg-emerald-600 hover:bg-emerald-500 flex gap-2"
                >
                  <Loader2 />
                  Save nutrient intake
                </Button>
              ) : (
                <Button
                  onClick={saveNutrientIntake}
                  className="bg-emerald-600 hover:bg-emerald-500 flex gap-2"
                >
                  <Save />
                  Save nutrient intake
                </Button>
              ))
            : !hideSaveNutrientIntakeButton && (
                <DialogComponent>
                  <Button className="bg-emerald-600 hover:bg-emerald-500 flex gap-2">
                    <Save />
                    Save nutrient intake
                  </Button>
                </DialogComponent>
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
