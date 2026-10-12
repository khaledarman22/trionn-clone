"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Magnetic Button / Element: Follows cursor physics on hover
 */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });

      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        xTo(x * strength);
        yTo(y * strength);
      };

      const onMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", onMouseMove);
      el.addEventListener("mouseleave", onMouseLeave);

      return () => {
        el.removeEventListener("mousemove", onMouseMove);
        el.removeEventListener("mouseleave", onMouseLeave);
      };
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}

/**
 * Text Split & Staggered Reveal on Scroll
 */
export function TextReveal({
  text,
  as: Component = "h2",
  className = "",
  stagger = 0.05,
}: {
  text: string;
  as?: React.ElementType;
  className?: string;
  stagger?: number;
}) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const words = containerRef.current?.querySelectorAll(".split-word");
      if (!words || words.length === 0) return;

      gsap.fromTo(
        words,
        { y: "100%", opacity: 0, filter: "blur(6px)" },
        {
          y: "0%",
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <Component ref={containerRef} className={`overflow-hidden ${className}`}>
      {text.split(" ").map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em] align-top">
          <span className="split-word inline-block">{word}</span>
        </span>
      ))}
    </Component>
  );
}

/**
 * Parallax Container: Shifts child element smoothly during scroll
 */
export function ParallaxContainer({
  children,
  speed = 0.15,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const targetRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = targetRef.current;
      if (!el) return;

      const yMovement = speed * 100;

      gsap.fromTo(
        el,
        { yPercent: -yMovement },
        {
          yPercent: yMovement,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: targetRef }
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={targetRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
