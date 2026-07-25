import Image from "next/image";
import { HOME_HERO_IMAGE } from "@/lib/home/branding";

type HomeHeroBackgroundProps = {
  /** Use on the primary viewport LCP hero (home). */
  priority?: boolean;
  /** Extra classes on the image (default slight scale for ken-burns feel). */
  imageClassName?: string;
  /** Extra classes on the absolute wrapper (opacity, z-index, etc.). */
  className?: string;
};

/**
 * Full-bleed hero photo via next/image so browsers get AVIF/WebP,
 * long cache TTL, and discoverable LCP (unlike CSS background-image).
 */
export function HomeHeroBackground({
  priority = false,
  imageClassName = "scale-[1.035]",
  className,
}: HomeHeroBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none absolute inset-0 -z-40 overflow-hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Image
        src={HOME_HERO_IMAGE}
        alt=""
        fill
        sizes="100vw"
        quality={75}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        className={["object-cover object-center", imageClassName]
          .filter(Boolean)
          .join(" ")}
      />
    </div>
  );
}
