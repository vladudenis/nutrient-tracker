"use client";

import PageHeader from "@/components/PageHeader";
import Result from "@/components/Result";
import useStore from "../../../lib/store";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const { data: session } = useSession();

  if (!session || !session.user || !session.user.email) {
    redirect("/");
  }

  const { setNutrients } = useStore();
  const nutritionalInfo = useQuery(
    api.nutrientInfo.fetchNutritionalInformation,
    {
      id: params.id as Id,
    }
  );

  console.log(nutritionalInfo);

  setNutrients(nutritionalInfo.intakes);

  return (
    <main className="flex min-h-screen flex-col items-center gap-24 px-24 py-16">
      <PageHeader text="Track your nutrient intake with each meal you eat" />

      <Result />
    </main>
  );
}
