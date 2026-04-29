"use client";

import Footer from "../components/footer";
import Navbar from "../components/navbar";
import HeroSection from "../sections/homepagesections/herosection";
import PhilosophySection from "../sections/homepagesections/philosophy";
import ProductsSection from "../sections/homepagesections/products";
import UseCasesSection from "../sections/homepagesections/usecases";
import InsightsSection from "../sections/homepagesections/insights";
import BookADemoSection from "../sections/homepagesections/bookademo";
import GrainOverlay from "../components/GrainOverlay";
import ScrollToTop from "../components/ScrollToTop";

export default function HomePage() {
	return (
		<div id="top" className="relative min-h-screen bg-[#050505] text-white">
      <GrainOverlay />
			<Navbar />
      <ScrollToTop />

			<main className="relative">
				<HeroSection />
        <PhilosophySection />
				<ProductsSection />
				<UseCasesSection />
				<InsightsSection />
				<BookADemoSection />
			</main>

			<Footer />
		</div>
	);
}
