import HomeAction from "@/components/HomeAction";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-24 px-24 py-16">
      <section className="bg-zinc-800 p-8 rounded-lg text-white shadow-2xl animate-jump-in animate-once animate-duration-[400ms] animate-delay-100 animate-ease-in-out">
        <h1 className="text-4xl font-semibold font-mono">
          Track your nutrient intake with each meal you eat
        </h1>
      </section>

      <HomeAction />
    </main>
  );
}
