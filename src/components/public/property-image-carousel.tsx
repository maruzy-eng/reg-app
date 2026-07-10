"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Image as ImageIcon,
  X,
} from "lucide-react";

export type PropertyCarouselImage = {
  id: string;
  src: string;
  alt: string;
  title?: string | null;
  caption?: string | null;
};

type PropertyImageCarouselProps = {
  title: string;
  images: PropertyCarouselImage[];
};

export function PropertyImageCarousel({
  title,
  images,
}: PropertyImageCarouselProps) {
  const normalizedImages = useMemo(() => {
    return images.filter((image) => Boolean(image.src));
  }, [images]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const currentImage = normalizedImages[currentIndex];
  const imageCount = normalizedImages.length;
  const hasMultipleImages = imageCount > 1;

  const goToPreviousImage = useCallback(() => {
    if (imageCount <= 1) {
      return;
    }

    setCurrentIndex((current) => {
      if (current === 0) {
        return imageCount - 1;
      }

      return current - 1;
    });
  }, [imageCount]);

  const goToNextImage = useCallback(() => {
    if (imageCount <= 1) {
      return;
    }

    setCurrentIndex((current) => {
      if (current === imageCount - 1) {
        return 0;
      }

      return current + 1;
    });
  }, [imageCount]);

  function goToImage(index: number) {
    setCurrentIndex(index);
  }

  useEffect(() => {
    if (currentIndex > imageCount - 1) {
      setCurrentIndex(0);
    }
  }, [currentIndex, imageCount]);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
        return;
      }

      if (event.key === "ArrowLeft") {
        goToPreviousImage();
        return;
      }

      if (event.key === "ArrowRight") {
        goToNextImage();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, goToPreviousImage, goToNextImage]);

  if (!currentImage) {
    return (
      <section className="mt-8 overflow-hidden rounded-[28px] border border-black/10 bg-[#f8fafc]">
        <div className="flex min-h-[360px] items-center justify-center px-6 text-center md:min-h-[500px]">
          <div>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-[#53bc76] shadow-sm">
              <ImageIcon size={34} />
            </div>

            <p className="mt-4 text-sm font-bold text-[#64748b]">
              No property images available.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="mt-8">
        <div className="relative mx-auto overflow-hidden rounded-[30px] border border-black/10 bg-white shadow-[0_22px_60px_rgba(17,17,17,0.10)]">
          <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-[#f8fafc] md:min-h-[560px]">
            <img
              src={currentImage.src}
              alt={currentImage.alt || title}
              className="h-full max-h-[620px] w-full object-contain"
            />

            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/10 to-transparent" />

            <div className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#0e3541] shadow-sm backdrop-blur md:left-6 md:top-6">
              {currentIndex + 1} / {imageCount}
            </div>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="absolute bottom-5 left-1/2 z-20 inline-flex min-h-[46px] -translate-x-1/2 items-center justify-center gap-2 rounded-full bg-[linear-gradient(94deg,#53bc76_0%,#39aff2_100%)] px-5 text-sm font-black text-white shadow-[0_16px_34px_rgba(83,188,118,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_46px_rgba(83,188,118,0.34)]"
            >
              <Expand size={17} />
              Click to view gallery
            </button>

            {hasMultipleImages && !isLightboxOpen ? (
              <>
                <button
                  type="button"
                  onClick={goToPreviousImage}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#0e3541]/25 bg-white/95 text-[#0e3541] shadow-[0_14px_34px_rgba(0,0,0,0.12)] backdrop-blur transition hover:scale-105 hover:border-[#53bc76] hover:text-[#53bc76] md:left-6 md:h-14 md:w-14"
                >
                  <ChevronLeft size={28} />
                </button>

                <button
                  type="button"
                  onClick={goToNextImage}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#0e3541]/25 bg-white/95 text-[#0e3541] shadow-[0_14px_34px_rgba(0,0,0,0.12)] backdrop-blur transition hover:scale-105 hover:border-[#53bc76] hover:text-[#53bc76] md:right-6 md:h-14 md:w-14"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            ) : null}
          </div>

          {(currentImage.title || currentImage.caption || hasMultipleImages) && (
            <div className="border-t border-black/10 bg-white px-5 py-4 md:px-6">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  {currentImage.title ? (
                    <h3 className="text-base font-black tracking-[-0.03em] text-[#0e3541]">
                      {currentImage.title}
                    </h3>
                  ) : null}

                  {currentImage.caption ? (
                    <p className="mt-1 text-sm leading-6 text-[#64748b]">
                      {currentImage.caption}
                    </p>
                  ) : null}
                </div>

                {hasMultipleImages ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {normalizedImages.map((image, index) => {
                      const isActive = index === currentIndex;

                      return (
                        <button
                          key={image.id}
                          type="button"
                          onClick={() => goToImage(index)}
                          aria-label={`Open image ${index + 1}`}
                          className={[
                            "h-2.5 rounded-full transition",
                            isActive
                              ? "w-8 bg-[#53bc76]"
                              : "w-2.5 bg-[#cbd5e1] hover:bg-[#94a3b8]",
                          ].join(" ")}
                        />
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </section>

      {isLightboxOpen ? (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-label="Property gallery"
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close gallery"
            className="absolute right-4 top-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0e3541] shadow-lg transition hover:scale-105 md:right-8 md:top-8"
          >
            <X size={26} />
          </button>

          <div className="absolute left-4 top-4 z-30 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#0e3541] shadow-lg md:left-8 md:top-8">
            {currentIndex + 1} / {imageCount}
          </div>

          {hasMultipleImages ? (
            <>
              <button
                type="button"
                onClick={goToPreviousImage}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0e3541] shadow-lg transition hover:scale-105 md:left-8 md:h-14 md:w-14"
              >
                <ChevronLeft size={30} />
              </button>

              <button
                type="button"
                onClick={goToNextImage}
                aria-label="Next image"
                className="absolute right-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0e3541] shadow-lg transition hover:scale-105 md:right-8 md:h-14 md:w-14"
              >
                <ChevronRight size={30} />
              </button>
            </>
          ) : null}

          <div className="flex h-full w-full max-w-[1200px] items-center justify-center">
            <img
              src={currentImage.src}
              alt={currentImage.alt || title}
              className="max-h-[86vh] w-auto max-w-full rounded-2xl object-contain shadow-[0_30px_90px_rgba(0,0,0,0.40)]"
            />
          </div>

          {(currentImage.title || currentImage.caption) && (
            <div className="absolute bottom-5 left-1/2 z-30 w-[calc(100%-32px)] max-w-[900px] -translate-x-1/2 rounded-2xl bg-white/95 px-5 py-4 text-center shadow-lg backdrop-blur">
              {currentImage.title ? (
                <h3 className="text-base font-black tracking-[-0.03em] text-[#0e3541]">
                  {currentImage.title}
                </h3>
              ) : null}

              {currentImage.caption ? (
                <p className="mt-1 text-sm leading-6 text-[#64748b]">
                  {currentImage.caption}
                </p>
              ) : null}
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}