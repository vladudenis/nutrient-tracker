"use client";

import { Button } from "./ui/button";
import NutrientInfo from "./NutrientInfo";
import store from "@/lib/store";
import { Save, RotateCw } from "lucide-react";
import DialogComponent from "./Dialog";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export default async function Result() {
  const { nutrients, setNutrients } = store();
  const session = await getServerSession(authOptions);

  const saveNutrientIntake = () => {
    // TODO
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-8">
        {nutrients?.map((nutrientInfo) => (
          <NutrientInfo nutrientInfo={nutrientInfo} />
        ))}
      </div>

      <div className="flex justify-center">
        <div className="flex gap-12">
          {session ? (
            <Button
              onClick={saveNutrientIntake}
              className="bg-emerald-600 hover:bg-emerald-500 flex gap-2"
            >
              <Save />
              Save nutrient intake
            </Button>
          ) : (
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
