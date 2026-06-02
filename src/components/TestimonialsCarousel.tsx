"use client";

import { useEffect, useMemo, useState } from "react";
import type { CustomerReview } from "@/types/site";
import { useReveal } from "@/components/useReveal";

type TestimonialsCarouselProps = {
  reviews: CustomerReview[];
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

export function TestimonialsCarousel({ reviews }: TestimonialsCarouselProps) {
  const revealRef = useReveal<HTMLDivElement>();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeReview, setActiveReview] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reviewCount = reviews.length;
  const safeActiveReview = reviewCount > 0 ? activeReview % reviewCount : 0;

  const featuredReview = reviews[safeActiveReview];
  const previewReviews = useMemo(() => {
    if (reviewCount <= 1) {
      return [];
    }

    return [1, 2, 3].slice(0, reviewCount - 1).map((offset) => {
      const index = (safeActiveReview + offset) % reviewCount;

      return {
        ...reviews[index],
        index
      };
    });
  }, [reviewCount, reviews, safeActiveReview]);

  useEffect(() => {
    if (prefersReducedMotion || isPaused || reviewCount <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % reviewCount);
    }, 4600);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPaused, prefersReducedMotion, reviewCount, safeActiveReview]);

  if (!featuredReview) {
    return null;
  }

  function showReview(index: number) {
    setActiveReview((index + reviewCount) % reviewCount);
  }

  return (
    <div
      className="testimonial-carousel reveal"
      aria-label="客户评价轮播"
      ref={revealRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <article className="testimonial-feature" aria-live="polite" key={featuredReview.name}>
        <div className="testimonial-meta">
          <span>{featuredReview.service}</span>
          <strong>{featuredReview.rating}</strong>
        </div>
        <blockquote>“{featuredReview.quote}”</blockquote>
        <div className="testimonial-author">
          <span className="testimonial-avatar" aria-hidden="true">
            {featuredReview.name.slice(0, 1)}
          </span>
          <div>
            <strong>{featuredReview.name}</strong>
            <span>
              {featuredReview.pet} · {featuredReview.date}
            </span>
          </div>
        </div>
        <p className="testimonial-highlight">{featuredReview.highlight}</p>
      </article>

      <div className="testimonial-side">
        <div className="testimonial-previews" aria-label="更多客户评价">
          {previewReviews.map((review) => (
            <button
              className="testimonial-preview"
              type="button"
              key={`${review.name}-${review.pet}`}
              onClick={() => showReview(review.index)}
            >
              <span>{review.highlight}</span>
              <strong>{review.pet}</strong>
            </button>
          ))}
        </div>

        <div className="testimonial-controls">
          <button
            className="testimonial-btn"
            type="button"
            aria-label="上一条客户评价"
            onClick={() => showReview(safeActiveReview - 1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <div className="testimonial-dots" aria-label="选择客户评价">
            {reviews.map((review, index) => (
              <button
                className={`testimonial-dot${index === safeActiveReview ? " is-active" : ""}`}
                type="button"
                aria-label={`查看${review.pet}的评价`}
                aria-current={index === safeActiveReview ? "true" : undefined}
                key={`${review.name}-${review.date}`}
                onClick={() => showReview(index)}
              />
            ))}
          </div>
          <button
            className="testimonial-btn"
            type="button"
            aria-label="下一条客户评价"
            onClick={() => showReview(safeActiveReview + 1)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
