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
import { Loader2 } from "lucide-react";

export default function TargetsCard({
  id,
  caloricIntake,
  fatIntake,
  proteinIntake,
  carbsIntake,
  disableButton,
}: {
  id: Id | null;
  caloricIntake: number;
  fatIntake: number;
  proteinIntake: number;
  carbsIntake: number;
  disableButton?: boolean;
}) {
  const addDailyTargets = useMutation(api.healthParameters.addDailyTargets);
  const form = useForm();
  const { rCaloricIntake } = useStore();

  const [isLoading, setIsLoading] = useState(false);
  const [caloricValue, setCaloricValue] = useState(caloricIntake);
  const [fatValue, setFatValue] = useState(fatIntake);
  const [proteinValue, setProteinValue] = useState(proteinIntake);
  const [carbsValue, setCarbsValue] = useState(carbsIntake);

  const onSubmit = () => {
    setIsLoading(true);

    if (id) {
      addDailyTargets({
        id,
        caloricIntake: caloricValue,
        fatIntake: fatValue,
        proteinIntake: proteinValue,
        carbsIntake: carbsValue,
      });
    }

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
              defaultValue={[caloricIntake]}
              max={6000}
              min={500}
              step={1}
              onValueChange={(value) => setCaloricValue(value[0])}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <span className="flex justify-between">
              <Label htmlFor="fat">Fat</Label>
              <Label htmlFor="fatValue">{fatValue} g</Label>
            </span>
            <Slider
              id="fat"
              defaultValue={[fatIntake]}
              max={400}
              min={10}
              step={1}
              onValueChange={(value) => setFatValue(value[0])}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <span className="flex justify-between">
              <Label htmlFor="protein">Protein</Label>
              <Label htmlFor="proteinValue">{proteinValue} g</Label>
            </span>
            <Slider
              id="protein"
              defaultValue={[proteinIntake]}
              max={600}
              min={10}
              step={1}
              onValueChange={(value) => setProteinValue(value[0])}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <span className="flex justify-between">
              <Label htmlFor="carbs">Carbohydrate</Label>
              <Label htmlFor="carbsValue">{carbsValue} g</Label>
            </span>
            <Slider
              id="carbs"
              defaultValue={[carbsIntake]}
              max={800}
              min={10}
              step={1}
              onValueChange={(value) => setCarbsValue(value[0])}
            />
          </div>

          {isLoading ? (
            <Button className="mt-2">
              <Loader2 className="animate-spin mr-2" />
              Update Targets
            </Button>
          ) : (
            <Button className="mt-2" disabled={disableButton} type="submit">
              Update Targets
            </Button>
          )}
        </form>
      </Form>

      <Separator orientation="horizontal" />

      <div className="w-full flex flex-col gap-2">
        <span className="w-full flex justify-between">
          <p>Result</p>
          <p>{calculateCaloricResult(rCaloricIntake, caloricValue)}</p>
        </span>
        <span className="w-full flex justify-between">
          <p>Fat%</p>
          <p>{round((fatValue * 900) / caloricValue)} %</p>
        </span>
        <span className="w-full flex justify-between">
          <p>Protein%</p>
          <p>{round((proteinValue * 400) / caloricValue)} %</p>
        </span>
        <span className="w-full flex justify-between">
          <p>Carbohydrate%</p>
          <p>{round((carbsValue * 400) / caloricValue)} %</p>
        </span>
      </div>

      <Label className="text-xs mt-4">
        Update Body Parameters or Targets to change the result!
      </Label>
    </div>
  );
}
