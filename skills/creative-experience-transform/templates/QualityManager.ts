/**
 * Device Quality & Performance Tier Manager
 * Automatically degrades heavy visual effects (canvas/shaders/particles) on low-power devices.
 */
export type QualityTier = "high" | "medium" | "low";

class DeviceQualityManager {
  private tier: QualityTier = "high";

  public init(): QualityTier {
    if (typeof window === "undefined") return "high";

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const deviceMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;

    if (isMobile || hardwareConcurrency <= 2 || deviceMemory <= 2) {
      this.tier = "low";
    } else if (hardwareConcurrency <= 4 || deviceMemory <= 4) {
      this.tier = "medium";
    } else {
      this.tier = "high";
    }

    return this.tier;
  }

  public getTier(): QualityTier {
    return this.tier;
  }

  public isLowPower(): boolean {
    return this.tier === "low";
  }
}

export const deviceQualityManager = new DeviceQualityManager();
