import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import FacultySection from "../components/FacultySection";
import WhyChoose from "../components/WhyChoose";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="bg-white overflow-x-hidden">
      <Navbar />

      <Hero />

      <Stats />

      <FacultySection />

      <WhyChoose />

      <HowItWorks />

      <Testimonials />

      <CTA />

      <Footer />
    </div>
  );
}