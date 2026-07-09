"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Images,
  X,
} from "lucide-react";

type LightboxImage = {
  id: string;
  image_url: string;
  alt_text?: string | null;
  title?: string | null;
  caption?: string | null;
  position?: number | null;
  is_cover?: boolean | null;
};

type PropertyGalleryLightboxProps = {
  title: string;
  images: LightboxImage[];
  mainImageUrl: string | null;
};

export function PropertyGalleryLightbox({
  title,
  images,
  mainImageUrl,
}: PropertyGalleryLightboxProps) {
  const galleryImages = useMemo(() => {
    if (images.length > 0) {
      return images;
    }

    if (mainImageUrl) {
      return [
        {
          id: "main-image",
          image_url: mainImageUrl,
          alt_text: title,
          title,
          caption: null,
          position: 0,
          is_cover: true,
        },
      ];
    }

    return [];
  }, [images, mainImageUrl, title]);

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = galleryImages[activeIndex];
  const sideImages = galleryImages.slice(1, 3);

  function openLightbox(index: number) {
    if (galleryImages.length === 0) {
      return;
    }

    setActiveIndex(index);
    setIsOpen(true);
  }

  function closeLightbox() {
    setIsOpen(false);
  }

  function showPreviousImage() {
    setActiveIndex((currentIndex) => {
      if (galleryImages.length === 0) {
        return 0;
      }

      return currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    });
  }

  function showNextImage() {
    setActiveIndex((currentIndex) => {
      if (galleryImages.length === 0) {
        return 0;
      }

      return currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
    });
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, galleryImages.length]);

  return (
    <>
      <div className="mt-7 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <button
          type="button"
          onClick={() => openLightbox(0)}
          className="group relative h-[300px] overflow-hidden rounded-[22px] bg-gray-100 text-left sm:h-[360px] md:h-[520px]"
          aria-label="Veja as fotos"
        >
          {galleryImages[0]?.image_url ? (
            <img
              src={galleryImages[0].image_url}
              alt={galleryImages[0].alt_text || title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[#39aff2]">
              <Building2 size={64} />
            </div>
          )}

          <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />

          <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-[#101820] shadow-lg backdrop-blur md:bottom-5 md:left-5">
            <Images size={17} />
            <span>Veja as fotos</span>

            {galleryImages.length > 0 ? (
              <span className="hidden rounded-full bg-[#0e3541]/10 px-2 py-0.5 text-xs font-bold text-[#0e3541] md:inline-flex">
                {galleryImages.length}
              </span>
            ) : null}
          </div>
        </button>

        <div className="hidden gap-4 lg:grid">
          {sideImages.length > 0 ? (
            sideImages.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => openLightbox(index + 1)}
                className="group h-[252px] overflow-hidden rounded-[22px] bg-gray-100 text-left"
                aria-label={`Abrir foto ${index + 2}`}
              >
                <img
                  src={image.image_url}
                  alt={image.alt_text || title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </button>
            ))
          ) : (
            <button
              type="button"
              onClick={() => openLightbox(0)}
              className="flex h-full min-h-[250px] items-center justify-center rounded-[22px] bg-gray-50 text-[#39aff2]"
              aria-label="Veja as fotos"
            >
              <Building2 size={48} />
            </button>
          )}
        </div>
      </div>

      {isOpen && activeImage ? (
        <div
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/90 px-4 py-20 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo gallery`}
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close gallery"
          >
            <X size={28} />
          </button>

          <div className="absolute left-1/2 top-6 z-20 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
            {activeIndex + 1} / {galleryImages.length}
          </div>

          {galleryImages.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showPreviousImage();
                }}
                className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:left-8 md:h-14 md:w-14"
                aria-label="Previous image"
              >
                <ChevronLeft size={32} />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showNextImage();
                }}
                className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:right-8 md:h-14 md:w-14"
                aria-label="Next image"
              >
                <ChevronRight size={32} />
              </button>
            </>
          ) : null}

          <div
            className="relative flex max-h-[calc(100vh-190px)] max-w-[min(1120px,90vw)] items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeImage.image_url}
              alt={activeImage.alt_text || title}
              className="max-h-[calc(100vh-190px)] max-w-full object-contain shadow-[0_26px_90px_rgba(0,0,0,0.45)]"
            />
          </div>

          {galleryImages.length > 1 ? (
            <div
              className="absolute bottom-5 left-1/2 flex w-[min(900px,calc(100vw-32px))] -translate-x-1/2 gap-3 overflow-x-auto px-1 pb-2"
              onClick={(event) => event.stopPropagation()}
            >
              {galleryImages.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 bg-white/10 transition ${
                    activeIndex === index
                      ? "border-white opacity-100"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Abrir foto ${index + 1}`}
                >
                  <img
                    src={image.image_url}
                    alt={image.alt_text || title}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}