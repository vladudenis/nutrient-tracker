"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import HistoryCard from "@/components/HistoryCard";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import useStore from "@/lib/store";
import SavedResult from "@/components/SavedResult";

export default function Page() {
  const { data: session } = useSession();

  if (!session || !session.user || !session.user.email) {
    redirect("/");
  }

  const nutritionalInfos = useQuery(
    api.nutrientInfo.fetchNutritionalInformations,
    {
      user: session.user.email,
    }
  );
  const { showHistoryDetails, nutritionInfo } = useStore();
  // TODO maybe render notes on the page too

  let date;
  let formattedDate;
  let formattedTime;

  if (showHistoryDetails) {
    date = new Date(nutritionInfo._creationTime);
    formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    formattedTime = `${date.getHours()}:${date.getMinutes()}`;
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-24 px-24 py-16">
      <PageHeader
        text={
          showHistoryDetails
            ? `Nutrition Details: ${nutritionInfo.mealType} on ${formattedDate} at ${formattedTime}`
            : "Your Nutrition History"
        }
      />

      {showHistoryDetails ? (
        <SavedResult />
      ) : (
        <div className="flex flex-col gap-8">
          {nutritionalInfos ? (
            nutritionalInfos.length ? (
              nutritionalInfos.map((nutritionalInfo, idx) => (
                <HistoryCard key={idx} nutritionalInfo={nutritionalInfo} />
              ))
            ) : (
              <p className="text-lg">No entries found!</p>
            )
          ) : (
            <Loader2 className="animate-spin h-12 w-12" />
          )}
        </div>
      )}
    </main>
  );
}
