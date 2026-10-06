import React, { useState, useEffect, useRef } from 'react';
import { useCms } from '../context/CmsContext';
import { PageType } from './Navbar';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  PhoneCall, 
  Play, 
  Pause,
  Sparkles
} from 'lucide-react';

interface HeroCarouselProps {
  onNavigate: (page: PageType) => void;
  onEnquireProduct: (productName: string) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onNavigate, onEnquireProduct }) => {
  const { heroSlides } = useCms();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const slideDuration = 5500; // 5.5 seconds per slide

  const slides = heroSlides && heroSlides.length > 0 ? heroSlides : [];

  // Auto sliding timer with real-time smooth progress bar
  useEffect(() => {
    if (slides.length <= 1) return;

    setProgress(0);
    const progressIntervalTime = 50;
    const step = (progressIntervalTime / slideDuration) * 100;

    const timer = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          if (prev >= 100) {
            handleSlideChange('next');
            return 0;
          }
          return prev + step;
        });
      }
    }, progressIntervalTime);

    return () => clearInterval(timer);
  }, [slides.length, isPaused, currentIndex]);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex] || slides[0];

  const handleSlideChange = (newDirection: 'next' | 'prev') => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(newDirection);
    setProgress(0);

    if (newDirection === 'next') {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    } else {
      setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 45) {
      handleSlideChange('next');
    }
    if (touchStartX.current - touchEndX.current < -45) {
      handleSlideChange('prev');
    }
  };

  return (
    /* Reduced Framed Banner Container with Cool Transitions & Clean Layout */
    <div className="max-w-6xl mx-auto px-4 sm:px-6 my-4 sm:my-6">
      <div
        className="relative min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800/90 shadow-2xl flex items-center select-none group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Slides with Cool Zoom, Parallax & Wipe Transitions */}
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isActive
                  ? 'opacity-100 scale-100 z-10'
                  : direction === 'next'
                  ? 'opacity-0 scale-105 translate-x-12 pointer-events-none z-0'
                  : 'opacity-0 scale-105 -translate-x-12 pointer-events-none z-0'
              }`}
            >
              {/* Slide Background Image - Clear, High-Visibility with Gentle Brand Tint */}
              <img
                src={slide.image}
                alt={slide.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-transform duration-[6500ms] ease-out ${
                  isActive ? 'scale-108' : 'scale-100'
                }`}
              />

              {/* Gentle Color Scrim (high visibility, matching cyan/slate shade) */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-slate-950/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/30" />
              <div className="absolute inset-0 bg-cyan-950/10 mix-blend-color pointer-events-none" />
            </div>
          );
        })}

        {/* Ambient Subtle Glow */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none z-20" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-lime-500/10 rounded-full blur-3xl pointer-events-none z-20" />

        {/* Clean Hero Content Area (Without Factory Specification Section) */}
        <div className="relative max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 w-full z-20 py-16 text-left">
          <div 
            key={currentSlide.id} 
            className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            {/* Slide Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs text-slate-200 backdrop-blur-md shadow-md">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              <span className="font-semibold text-white">{currentSlide.badge}</span>
            </div>

            {/* Slide Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] font-display max-w-3xl drop-shadow-md">
              {currentSlide.title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-lime-400 block mt-1.5">
                {currentSlide.highlightText}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal drop-shadow-sm">
              {currentSlide.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onNavigate(currentSlide.primaryBtnAction)}
                className="flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-lime-400 hover:from-cyan-300 hover:to-lime-300 rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                <span>{currentSlide.primaryBtnText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 rounded-xl transition-all whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4 text-cyan-400" />
                <span>{currentSlide.secondaryBtnText}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={() => handleSlideChange('prev')}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 backdrop-blur-md transition-all shadow-lg hover:scale-105 focus:outline-none"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={() => handleSlideChange('next')}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 backdrop-blur-md transition-all shadow-lg hover:scale-105 focus:outline-none"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Bottom Bar: Indicators & Autoplay Controls */}
        <div className="absolute bottom-4 left-6 right-6 z-30 flex items-center justify-between">
          {/* Pause / Play Button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-950/70 backdrop-blur-sm border border-slate-800 transition-colors text-xs flex items-center gap-1.5 font-mono"
            title={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-lime-400" /> : <Pause className="w-3.5 h-3.5 text-cyan-400" />}
            <span className="hidden sm:inline">{isPaused ? 'Paused' : 'Auto'}</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 'next' : 'prev');
                  setCurrentIndex(idx);
                  setProgress(0);
                }}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? 'w-7 h-2 bg-gradient-to-r from-cyan-400 to-lime-400'
                    : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <span className="text-xs font-mono text-slate-300 bg-slate-950/70 border border-slate-800 px-2.5 py-1 rounded-lg backdrop-blur-sm">
            {currentIndex + 1} / {slides.length}
          </span>
        </div>

        {/* Bottom Smooth Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-900/80 z-30">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-lime-400 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>
    </div>
  );
};
