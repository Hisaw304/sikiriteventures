import React from "react";
import Hero from "../components/Hero";
import ProductSection from "../components/ProductSection";
import AboutUs from "../components/AboutUs";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import HowItWorks from "../components/HowItWorks";
import FooterCTA from "../components/FooterCTA";

const Home = () => {
  return (
    <div>
      <Hero />
      <ProductSection />
      <HowItWorks />
      <AboutUs />
      <WhyChooseUs />
      <FAQ />
      <Testimonials />
      <FooterCTA />
    </div>
  );
};

export default Home;
