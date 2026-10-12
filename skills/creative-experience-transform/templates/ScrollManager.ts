import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Universal Lenis Smooth Scroll Manager synced with GSAP ScrollTrigger
 */
class SmoothScrollManager {
  private lenis: Lenis | null = null;
  private isInitialized = false;

  public init() {
    if (typeof window === "undefined" || this.isInitialized) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Sync Lenis scroll with GSAP ScrollTrigger
    this.lenis.on("scroll", ScrollTrigger.update);

    // Sync GSAP ticker with Lenis requestAnimationFrame
    const updateTicker = (time: number) => {
      this.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    this.isInitialized = true;
  }

  public getLenis(): Lenis | null {
    return this.lenis;
  }

  public stop() {
    this.lenis?.stop();
  }

  public start() {
    this.lenis?.start();
  }

  public scrollTo(target: string | HTMLElement | number, options?: { offset?: number; duration?: number }) {
    this.lenis?.scrollTo(target, options);
  }

  public destroy() {
    if (!this.isInitialized) return;
    this.lenis?.destroy();
    this.lenis = null;
    this.isInitialized = false;
  }
}

export const smoothScrollManager = new SmoothScrollManager();
