import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustStats } from "@/components/TrustStats";
import { BehaviorChallenges } from "@/components/BehaviorChallenges";
import { Services } from "@/components/Services";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { ProcessSteps } from "@/components/ProcessSteps";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Testimonials } from "@/components/Testimonials";
import { MeetExpert } from "@/components/MeetExpert";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { ComponentGallery } from "@/components/ComponentGallery";
import { CTAForm } from "@/components/CTAForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStats />
        <BehaviorChallenges />
        <Services />
        <WhyChooseUs />
        <ProcessSteps />
        <BeforeAfter />
        <Testimonials />
        <MeetExpert />
        {/* <Pricing /> */}
        <ComponentGallery />
        <FAQ />
        <CTAForm />
      </main>
      <Footer />
    </>
  );
}
