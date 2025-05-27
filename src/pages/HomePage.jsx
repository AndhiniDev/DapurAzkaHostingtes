
import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProductSection from '@/components/sections/ProductSection';
import ReviewSection from '@/components/sections/ReviewSection';
import ContactSection from '@/components/sections/ContactSection';

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ProductSection />
      <ReviewSection />
      <ContactSection />
    </Layout>
  );
};

export default HomePage;
