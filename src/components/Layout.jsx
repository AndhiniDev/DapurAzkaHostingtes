import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLocation } from 'react-router-dom';

const Layout = ({ children, simpleNavbar = false }) => {
  const location = useLocation();
  const [isReviewSectionVisible, setIsReviewSectionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsReviewSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const reviewSectionElement = document.getElementById('reviews');
    if (reviewSectionElement) {
      observer.observe(reviewSectionElement);
    }

    return () => {
      if (reviewSectionElement) {
        observer.unobserve(reviewSectionElement);
      }
    };
  }, [location.pathname]);
  
  const hideFullNavbarFeatures = simpleNavbar || (location.pathname === '/' && isReviewSectionVisible);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF9F0]">
      <Navbar hideFeatures={hideFullNavbarFeatures} />
      <main className="flex-grow pt-8 pb-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;