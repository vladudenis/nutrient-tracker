"use client";

import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { useState } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import useStore from "@/lib/store";
import { calculateCaloricResult, round } from "@/lib/utilFuncs";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { InfoIcon, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function TargetsCard({
  id,
  caloricIntake,
  fatIntake,
  proteinIntake,
  carbsIntake,
  disableButton,
  recommendedCalories,
  notSet,
}: {
  id: Id | null;
  caloricIntake: number;
  fatIntake: number;
  proteinIntake: number;
  carbsIntake: number;
  disableButton?: boolean;
  recommendedCalories?: number;
  notSet?: boolean;
}) {
  const addDailyTargets = useMutation(api.healthParameters.addDailyTargets);
  const form = useForm();
  const { rCaloricIntake } = useStore();

  const [isLoading, setIsLoading] = useState(false);
  const [caloricValue, setCaloricValue] = useState(
    recommendedCalories || caloricIntake
  );
  const [fatValue, setFatValue] = useState(fatIntake);
  const [proteinValue, setProteinValue] = useState(proteinIntake);
  const [carbsValue, setCarbsValue] = useState(carbsIntake);
  const totalValue = fatValue + proteinValue + carbsValue;

  const onSubmit = () => {
    setIsLoading(true);

    if (!id) {
      return;
    }

    addDailyTargets({
      id,
      caloricIntake: caloricValue,
      fatIntake: fatValue,
      proteinIntake: proteinValue,
      carbsIntake: carbsValue,
    });

    toast.success("Daily targets have been updated!");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-5 items-center w-[400px] px-6 pt-4 pb-6 rounded-lg shadow-md hover:shadow-2xl duration-500 border animate-jump-in animate-once animate-duration-[400ms] animate-delay-100 animate-ease-in-out">
      <p className="font-semibold text-xl mb-2">Daily Targets</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full gap-5"
        >
          <div className="flex flex-col gap-2 w-full">
            <span className="flex justify-between">
              <Label htmlFor="calories">Calories</Label>
              <Label htmlFor="caloricValue">{caloricValue} kcal/day</Label>
            </span>
            <Slider
              id="calories"
              defaultValue={[caloricValue]}
              max={6000}
              min={500}
              step={1}
              onValueChange={(value) => setCaloricValue(value[0])}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <span className="flex justify-between">
              <Label htmlFor="fat">Fat</Label>
              <Label htmlFor="fatValue">{fatValue} %</Label>
            </span>
            <Slider
              id="fat"
              defaultValue={[fatIntake]}
              max={100}
              min={0}
              step={1}
              onValueChange={(value) => setFatValue(value[0])}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <span className="flex justify-between">
              <Label htmlFor="protein">Protein</Label>
              <Label htmlFor="proteinValue">{proteinValue} %</Label>
            </span>
            <Slider
              id="protein"
              defaultValue={[proteinIntake]}
              max={100}
              min={0}
              step={1}
              onValueChange={(value) => setProteinValue(value[0])}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <span className="flex justify-between">
              <Label htmlFor="carbs">Carbohydrate</Label>
              <Label htmlFor="carbsValue">{carbsValue} %</Label>
            </span>
            <Slider
              id="carbs"
              defaultValue={[carbsIntake]}
              max={100}
              min={0}
              step={1}
              onValueChange={(value) => setCarbsValue(value[0])}
            />
          </div>
          <div className="flex justify-between w-full">
            <p>Total</p>
            {totalValue === 100 ? (
              <p>{totalValue} %</p>
            ) : (
              <p className="text-red-500">{totalValue} %</p>
            )}
          </div>

          {isLoading ? (
            <Button>
              <Loader2 className="animate-spin mr-2" />
              {notSet ? "Set Targets" : "Update Targets"}
            </Button>
          ) : (
            <Button
              disabled={disableButton || totalValue !== 100}
              type="submit"
            >
              {notSet ? "Set Targets" : "Update Targets"}
            </Button>
          )}
        </form>
      </Form>

      <Separator orientation="horizontal" />

      <div className="w-full flex flex-col gap-2">
        <span className="w-full flex justify-between">
          <p>Fat</p>
          <p>{round((fatValue * caloricValue) / 900)} g</p>
        </span>
        <span className="w-full flex justify-between">
          <p>Protein</p>
          <p>{round((proteinValue * caloricValue) / 400)} g</p>
        </span>
        <span className="w-full flex justify-between">
          <p>Carbohydrate</p>
          <p>{round((carbsValue * caloricValue) / 400)} g</p>
        </span>
        <span className="w-full flex justify-between">
          <p>Result</p>
          <p>
            {calculateCaloricResult(
              recommendedCalories || rCaloricIntake,
              caloricValue
            )}
          </p>
        </span>
      </div>

      <Separator orientation="horizontal" />

      <Label className="text-xs flex gap-2 items-center">
        <InfoIcon />
        Update parameters or targets to change the result!
      </Label>
    </div>
  );
}
