'use client';

import { useState } from 'react';
import Loader from '@/components/Loader';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import IntroSection from '@/components/IntroSection';
import ServicesSection from '@/components/ServicesSection';
import ProductsSection from '@/components/ProductsSection';
import PhilosophySection from '@/components/PhilosophySection';
import WhySection from '@/components/WhySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <SmoothScroll>
        <div className={`min-h-screen bg-[#F7F7F5] text-[#05062F] transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <Navigation />
          <main>
            <HeroSection />
            <IntroSection />
            <ServicesSection />
            <ProductsSection />
            <PhilosophySection />
            <WhySection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}
