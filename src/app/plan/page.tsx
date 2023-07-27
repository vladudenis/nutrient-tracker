import BodyParametersCard from "@/components/BodyParametersCard";
import PageHeader from "@/components/PageHeader";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-24 px-24 py-16">
      <PageHeader text="Your Nutrition Plan" />

      <div className="flex justify-center gap-24">
        <BodyParametersCard />

        <div className="flex flex-col items-center w-[400px] px-6 pt-4 pb-6 rounded-lg shadow-md hover:shadow-2xl duration-500 border animate-jump-in animate-once animate-duration-[400ms] animate-delay-100 animate-ease-in-out">
          <p className="font-semibold text-xl">Targets</p>
        </div>
      </div>
    </main>
  );
}
