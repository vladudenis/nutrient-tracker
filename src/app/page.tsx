import HomeAction from "@/components/HomeAction";
import PageHeader from "@/components/PageHeader";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-24 px-24 py-16">
      <PageHeader text="Track your nutrient intake with each meal you eat" />

      <HomeAction />
    </main>
  );
}
