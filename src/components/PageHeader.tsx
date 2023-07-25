export default function PageHeader({ text }: { text: string }) {
  return (
    <section className="bg-zinc-800 p-8 rounded-lg text-white shadow-2xl animate-jump-in animate-once animate-duration-[400ms] animate-delay-100 animate-ease-in-out">
      <h1 className="text-4xl font-semibold font-mono">{text}</h1>
    </section>
  );
}
