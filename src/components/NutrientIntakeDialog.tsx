"use client";

import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import toast from "react-hot-toast";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { useSession } from "next-auth/react";
import store from "@/lib/store";
import { Loader2, Save } from "lucide-react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NutrientIntakeDialog(props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode
    | null
    | undefined;
}) {
  const { register, handleSubmit } = useForm();
  const { data: session } = useSession();
  const saveNutrientIntakeMutation = useMutation(
    api.nutrientIntake.saveNutrientIntake
  );
  const [isLoading, setIsLoading] = useState(false);
  const { nutrients, setNutrients } = store();

  const onSubmit = async (data: any) => {
    if (!nutrients || !session?.user?.email) {
      return;
    }

    const notes = data.notes || "";
    const mealType = (document.querySelector("option[selected]") as any)?.value;

    setIsLoading(true);

    await saveNutrientIntakeMutation({
      nutrientIntake: nutrients,
      user: session?.user?.email,
      mealType,
      notes,
    });

    toast.success("Nutrient intake was saved.");

    setIsLoading(false);
    setNutrients(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Nutrient Intake</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="mb-4 flex flex-col gap-2">
              <Label className="text-left">Meal Type</Label>
              <Select {...register("mealType")} defaultValue="Breakfast">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a meal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Meal Type</SelectLabel>
                    <SelectItem value="Breakfast">Breakfast</SelectItem>
                    <SelectItem value="Brunch">Brunch</SelectItem>
                    <SelectItem value="Lunch">Lunch</SelectItem>
                    <SelectItem value="Dinner">Dinner</SelectItem>
                    <SelectItem value="Snack">Snack</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="notes" className="text-left">
                Additional Notes
              </Label>
              <Textarea
                {...register("notes")}
                id="notes"
                className="resize-none"
              />
            </div>
            {isLoading ? (
              <Button className="bg-emerald-600 hover:bg-emerald-500 flex gap-2">
                <Loader2 className="animate-spin" />
                Save
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 flex gap-2"
              >
                <Save />
                Save
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
