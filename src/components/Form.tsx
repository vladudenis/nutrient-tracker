"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";
import store from "@/lib/store";
import { useForm } from "react-hook-form";
import { api } from "../../convex/_generated/api";
import { useAction } from "convex/react";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { setNutrients } = store();
  const fetchNutrients = useAction(api.nutrientInfo.fetchNutrientInfo);

  const onSubmit = async (data: any) => {
    const textInputs = data.textInput.split("\n");
    setIsLoading(true);

    const allNutrients = await fetchNutrients({ textInputs });
    setNutrients(allNutrients);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Label htmlFor="food-info" className="text-lg">
          Enter some food and a unit of measurement:
        </Label>
        <Textarea
          {...register("textInput", { required: true })}
          className="w-[500px] h-[250px] resize-none text-lg"
          placeholder={
            "200 grams of chicken thigh\nthree ounces of rice\none cup of rapsberries"
          }
          id="info"
        />
      </div>

      <div className="flex justify-center">
        {isLoading ? (
          <Button className="h-10 w-40 text-lg">
            <Loader2 className="animate-spin mr-2" />
            Submit
          </Button>
        ) : (
          <Button type="submit" className="h-10 w-40 text-lg">
            Submit
          </Button>
        )}
      </div>
    </form>
  );
}
