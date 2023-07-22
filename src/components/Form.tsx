"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";
import store from "@/lib/store";
import { useForm } from "react-hook-form";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { setNutrients } = store();

  const onSubmit = async (data: any) => {
    const fullText = data.textInput.split("\n");
    setIsLoading(true);

    const allNutrients = [];

    for (const text of fullText) {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ textInput: text }),
      });
      const nutrients = await res.json();
      allNutrients.push(nutrients.body);
    }

    setNutrients(allNutrients);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Label htmlFor="food-info" className="text-lg">
          Enter some food you ate below
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
          <Button className="h-10 w-40 text-lg flex gap-2">
            <Loader2 className="animate-spin" />
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
