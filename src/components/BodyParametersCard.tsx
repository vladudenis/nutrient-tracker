"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { round } from "@/lib/utilFuncs";
import useStore from "@/lib/store";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { Loader2 } from "lucide-react";

export default function BodyParametersCard({
  user,
  id,
  weight,
  height,
  sex,
  age,
  pal,
}: {
  user: string;
  id: Id | null;
  weight: number;
  height: number;
  sex: string;
  age: number;
  pal: number;
}) {
  const setBodyParameters = useMutation(api.healthParameters.setBodyParameters);
  const updateBodyParameters = useMutation(
    api.healthParameters.updateBodyParameters
  );
  const form = useForm();
  const { setRCaloricIntake } = useStore();

  const [isLoading, setIsLoading] = useState(false);
  const [sexValue, setSexValue] = useState(sex);
  const [heightValue, setHeightValue] = useState(height);
  const [weightValue, setWeightValue] = useState(weight);
  const [ageValue, setAgeValue] = useState(age);
  const [palValue, setPalValue] = useState(pal);

  const bmr = 10 * weightValue + 6.25 * heightValue - 5 * ageValue;
  const bmi = weightValue / Math.pow(heightValue / 100, 2);

  const onSubmit = () => {
    setIsLoading(true);
    setRCaloricIntake(Math.round((bmr - 161) * Number(palValue)));

    if (id) {
      updateBodyParameters({
        id,
        weight: weightValue,
        height: heightValue,
        sex: sexValue,
        age: ageValue,
        pal: palValue,
      });
    }
    {
      setBodyParameters({
        user,
        weight: weightValue,
        height: heightValue,
        sex: sexValue,
        age: ageValue,
        pal: palValue,
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-5 items-center w-[400px] px-6 pt-4 pb-6 rounded-lg shadow-md hover:shadow-2xl duration-500 border animate-jump-in animate-once animate-duration-[400ms] animate-delay-100 animate-ease-in-out">
      <p className="font-semibold text-xl mb-2">Body Parameters</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full gap-5"
        >
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={() => setSexValue(field.value)}
                    defaultValue={sex}
                    className="flex gap-12"
                  >
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          value="male"
                          onClick={() => (field.value = "male")}
                        />
                      </FormControl>
                      <FormLabel>Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          value="female"
                          onClick={() => (field.value = "female")}
                        />
                      </FormControl>
                      <FormLabel>Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-2 w-full">
            <span className="flex justify-between">
              <Label htmlFor="height">Height</Label>
              <Label htmlFor="heightValue">{heightValue} cm</Label>
            </span>
            <Slider
              id="height"
              defaultValue={[height]}
              max={250}
              min={120}
              step={1}
              onValueChange={(value) => setHeightValue(value[0])}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <span className="flex justify-between">
              <Label htmlFor="weight">Weight</Label>
              <Label htmlFor="weightValue">{weightValue} kg</Label>
            </span>
            <Slider
              id="weight"
              defaultValue={[weight]}
              max={200}
              min={1}
              step={1}
              onValueChange={(value) => setWeightValue(value[0])}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <span className="flex justify-between">
              <Label htmlFor="age">Age</Label>
              <Label htmlFor="ageValue">{ageValue} yrs</Label>
            </span>
            <Slider
              id="age"
              defaultValue={[age]}
              max={100}
              min={18}
              step={1}
              onValueChange={(value) => setAgeValue(value[0])}
            />
          </div>

          <div className="flex flex-col gap-2 w-full mt-2">
            <Label className="text-left">Intensity of physical exercise</Label>
            <FormField
              control={form.control}
              name="pal"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(v) => setPalValue(Number(v))}
                      value={palValue.toString()}
                      defaultValue={pal.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select intensity of physical activity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1.2">Little/No Exercise</SelectItem>
                        <SelectItem value="1.4">
                          Light Exercise 1-2 times/week
                        </SelectItem>
                        <SelectItem value="1.6">
                          Moderate Exercise 2-3 times/week
                        </SelectItem>
                        <SelectItem value="1.75">
                          Hard Exercise 3-5 times/week
                        </SelectItem>
                        <SelectItem value="2">
                          Physical Job or Hard Exercise 6-7 times/week
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {isLoading ? (
            <Button>
              <Loader2 className="animate-spin mr-2" />
              Update Parameters
            </Button>
          ) : (
            <Button type="submit">Update Parameters</Button>
          )}
        </form>
      </Form>

      <Separator orientation="horizontal" />

      <div className="w-full flex flex-col gap-2">
        <span className="w-full flex justify-between">
          <p>Basal Metabolic Rate</p>
          <p>
            {sexValue == "male" ? Math.round(bmr + 5) : Math.round(bmr - 161)}{" "}
            kcal/day
          </p>
        </span>
        <span className="w-full flex justify-between">
          <p>Weight Maintenance</p>
          <p>
            {sexValue == "male"
              ? Math.round((bmr + 5) * Number(palValue))
              : Math.round((bmr - 161) * Number(palValue))}{" "}
            kcal/day
          </p>
        </span>
        <span className="w-full flex justify-between">
          <p>BMI</p>
          <p>
            {round(bmi)} kg/m<sup>2</sup>{" "}
          </p>
        </span>
      </div>
    </div>
  );
}
