import WobbleCardDemo from "@/components/wobble-card-demo";

export default function InsightsSection() {
  return (
    <section id="insights" className="w-full bg-[#050505] py-20 px-10 relative z-40 shadow-[0_-50px_100px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          Strategic <span className="text-infinitica-purple">Insights</span>
        </h2>
        <p className="text-[#C4A7F7] mt-4 max-w-2xl mx-auto text-lg opacity-80">
          Deep dives into the neural patterns and infrastructure breakthroughs driving the next era of industrial intelligence.
        </p>
      </div>
      
      <WobbleCardDemo />
    </section>
  );
}
