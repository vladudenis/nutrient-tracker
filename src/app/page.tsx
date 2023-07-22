import HomeAction from "@/components/HomeAction";
import Result from "@/components/Result";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-24 p-24">
      <section className="bg-zinc-800 p-8 rounded-lg text-white shadow-2xl">
        <h1 className="text-4xl font-semibold font-mono">
          Track your nutrient intake with each meal you eat
        </h1>
      </section>

      <Result />

      <HomeAction />
    </main>
  );
}
