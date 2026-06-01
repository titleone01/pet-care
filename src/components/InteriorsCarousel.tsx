"use client";

import { useEffect, useMemo, useState } from "react";
import type { InteriorSlide } from "@/types/site";
import { useReveal } from "@/components/useReveal";

type InteriorsCarouselProps = {
  slides: InteriorSlide[];
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    function updatePreference() {
      setPrefersReducedMotion(query.matches);
    }

    updatePreference();
    query.addEventListener("change", updatePreference);

    return () => {
      query.removeEventListener("change", updatePreference);
    };
  }, []);

  return prefersReducedMotion;
}

export function InteriorsCarousel({ slides }: InteriorsCarouselProps) {
  const revealRef = useReveal<HTMLDivElement>();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = slides.length;
  const safeActiveSlide = useMemo(() => activeSlide % slideCount, [activeSlide, slideCount]);

  useEffect(() => {
    if (prefersReducedMotion || isPaused || slideCount <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideCount);
    }, 5200);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPaused, prefersReducedMotion, slideCount, safeActiveSlide]);

  function showSlide(index: number) {
    setActiveSlide((index + slideCount) % slideCount);
  }

  return (
    <div
      className="store-carousel reveal"
      data-carousel
      aria-label="店内环境轮播"
      ref={revealRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="carousel-viewport">
        {slides.map((slide, index) => {
          const isActive = index === safeActiveSlide;

          return (
            <article
              className={`carousel-slide${isActive ? " is-active" : ""}`}
              data-slide
              aria-hidden={!isActive}
              key={slide.title}
            >
              <img src={slide.imageSrc} alt={slide.imageAlt} loading="lazy" />
              <div className="carousel-caption">
                <strong>{slide.title}</strong>
                <p>{slide.description}</p>
              </div>
            </article>
          );
        })}
      </div>
      <div className="carousel-controls" aria-hidden="false">
        <button
          className="carousel-btn"
          type="button"
          data-carousel-prev
          aria-label="上一张店内环境图"
          onClick={() => showSlide(safeActiveSlide - 1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          className="carousel-btn"
          type="button"
          data-carousel-next
          aria-label="下一张店内环境图"
          onClick={() => showSlide(safeActiveSlide + 1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
      <div className="carousel-dots" aria-label="选择店内环境图">
        {slides.map((slide, index) => (
          <button
            className={`carousel-dot${index === safeActiveSlide ? " is-active" : ""}`}
            type="button"
            data-carousel-dot={index}
            aria-label={slide.dotLabel}
            aria-current={index === safeActiveSlide ? "true" : undefined}
            key={slide.dotLabel}
            onClick={() => showSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
