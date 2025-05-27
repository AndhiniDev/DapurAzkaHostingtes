import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

const slides = [
  {
    id: "mie-ayam-spesial-hero",
    title: "Mie Ayam Spesial",
    description: "Mie ayam rumahan dengan topping melimpah dan kuah yang gurih. Rasakan kenikmatan sejati!",
    imageName: "mie-ayam-spesial-hero",
    imageAlt: "Mie Ayam Spesial lezat disajikan di mangkuk",
    buttonText: "Pesan Sekarang",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
    buttonColor: "bg-orange-500 hover:bg-orange-600",
    productId: "mie-ayam-original" 
  },
  {
    id: "ayam-geprek-hero",
    title: "Ayam Geprek Mantap",
    description: "Ayam geprek pedas dengan sambal khas Dapur Azka Qanita. Pedasnya nampol, bikin nagih!",
    imageName: "ayam-geprek-hero",
    imageAlt: "Ayam Geprek pedas dengan nasi dan lalapan",
    buttonText: "Coba Sekarang",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
    buttonColor: "bg-red-500 hover:bg-red-600",
    productId: "ayam-geprek-original"
  },
  {
    id: "es-segar-hero",
    title: "Es Segar Nikmat",
    description: "Berbagai pilihan es segar untuk menemani harimu. Manis dan menyegarkan!",
    imageName: "es-segar-hero",
    imageAlt: "Berbagai macam Es Segar berwarna-warni",
    buttonText: "Lihat Pilihan",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
    buttonColor: "bg-blue-500 hover:bg-blue-600",
    productId: "es-rencengan-original" 
  },
   {
    id: "nasi-goreng-hero",
    title: "Nasi Goreng Kampung Juara",
    description: "Nasi goreng dengan bumbu kampung autentik, telur, dan kerupuk. Porsi kenyang, harga pas!",
    imageName: "nasi-goreng-hero",
    imageAlt: "Nasi Goreng Kampung dengan telur mata sapi",
    buttonText: "Pesan Sekarang",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
    buttonColor: "bg-green-500 hover:bg-green-600",
    productId: "nasi-goreng-kampung"
  },
];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide])

  return (
    <section id="home" className="relative overflow-hidden h-[500px] md:h-[600px]">
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 hero-slide ${slide.color} flex items-center ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
            }}
          >
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h2 className="text-3xl md:text-5xl font-bold text-amber-800 mb-4">{slide.title}</h2>
                <p className="text-lg md:text-xl text-amber-700 mb-6">{slide.description}</p>
                <button className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-full transition-colors">
                  Pesan Sekarang
                </button>
              </div>
              <div className="md:w-1/2">
                <img
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  className="rounded-lg shadow-lg w-full h-64 md:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-20"
      >
        <ChevronLeft size={24} className="text-amber-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-20"
      >
        <ChevronRight size={24} className="text-amber-800" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-amber-600" : "bg-amber-300"}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
