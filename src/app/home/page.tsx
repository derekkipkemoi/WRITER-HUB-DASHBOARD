"use client"
import React, { useRef } from 'react';
import FAQSection from '@/components/home/faq';
import FeatureSection from '@/components/home/features';
import Footer from '@/components/home/footer';
import { Header } from '@/components/home/header';
import { HeroSection } from '@/components/home/hero-section';
import { PricingCards } from '@/components/home/pricing';
import { ReviewCarousel } from '@/components/home/review-carousel';
import { Box } from '@mui/material';

export default function Page() {
  const pricingRef = useRef<HTMLDivElement | null>(null);

  const scrollToPricing = () => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box>
      <Header />
      <Box sx={{ backgroundColor: '#e0f7fa', textAlign: 'center' }}>
        <HeroSection scrollToPricing={scrollToPricing} />
      </Box>
      <Box sx={{ backgroundColor: '#ffe0b2', textAlign: 'center' }}>
        <ReviewCarousel />
      </Box>
      <Box ref={pricingRef} sx={{ backgroundColor: '#e0f7fa', textAlign: 'center' }}>
        <PricingCards />
      </Box>
      <Box sx={{ backgroundColor: '#ffe0b2', textAlign: 'center' }}>
        <FeatureSection />
      </Box>
      <Box sx={{ backgroundColor: '#e0f7fa', textAlign: 'center' }}>
        <FAQSection scrollToPricing={scrollToPricing}/>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Footer />
      </Box>
    </Box>
  );
}
