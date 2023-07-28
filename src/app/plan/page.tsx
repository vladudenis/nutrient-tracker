"use client";

import BodyParametersCard from "@/components/BodyParametersCard";
import PageHeader from "@/components/PageHeader";
import { redirect } from "next/navigation";
import TargetsCard from "@/components/TargetsCard";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

export default function Page() {
  const { data: session, status } = useSession();
  const healthParameters = useQuery(
    api.healthParameters.fetchHealthParameters,
    { user: session?.user?.email! }
  );

  if (status == "loading") {
    return;
  }

  if (!session || !session.user || !session.user.email) {
    redirect("/");
  }

  console.log(healthParameters);

  if (healthParameters == undefined) {
    <main className="flex min-h-screen flex-col items-center gap-24 px-24 py-16">
      <PageHeader text="Your Nutrition Plan" />
      <div className="flex justify-center gap-24">
        <Loader2 className="animate-spin h-12 w-12" />
      </div>
    </main>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-24 px-24 py-16">
      <PageHeader text="Your Nutrition Plan" />

      <div className="flex justify-center gap-24">
        {healthParameters ? (
          <BodyParametersCard
            user={session.user.email}
            id={healthParameters?._id}
            weight={healthParameters?.weight}
            height={healthParameters?.height}
            age={healthParameters?.age}
            sex={healthParameters?.sex}
            pal={healthParameters?.pal}
          />
        ) : (
          <BodyParametersCard
            user={session.user.email}
            id={null}
            weight={60}
            height={175}
            age={30}
            sex={"male"}
            pal={1.2}
          />
        )}
        {healthParameters && healthParameters.caloricIntake ? (
          <TargetsCard
            id={healthParameters?._id}
            caloricIntake={healthParameters?.caloricIntake}
            fatIntake={healthParameters?.fatIntake}
            proteinIntake={healthParameters?.proteinIntake}
            carbsIntake={healthParameters?.carbsIntake}
          />
        ) : (
          <TargetsCard
            id={null}
            caloricIntake={1850}
            fatIntake={50}
            proteinIntake={100}
            carbsIntake={250}
            disableButton={!healthParameters}
          />
        )}
      </div>
    </main>
  );
}
