"use client";
import Image from "next/image";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { GALLERY_PHOTOS, type GalleryPhoto } from "@/lib/data";
import { useI18n } from "@/lib/i18n/context";
import type { EmblaCarouselType } from "embla-carousel";

export function GallerySection() {
  const { t } = useI18n();
  const [lb, setLb] = useState<number | null>(null);
  const [api1, setApi1] = useState<EmblaCarouselType | null>(null);
  const [api2, setApi2] = useState<EmblaCarouselType | null>(null);

  const row1 = GALLERY_PHOTOS.slice(0, Math.ceil(GALLERY_PHOTOS.length / 2));
  const row2 = GALLERY_PHOTOS.slice(Math.ceil(GALLERY_PHOTOS.length / 2));

  const syncApi1 = useCallback((emblaApi: EmblaCarouselType | undefined) => {
    setApi1(emblaApi ?? null);
  }, []);

  const syncApi2 = useCallback((emblaApi: EmblaCarouselType | undefined) => {
    setApi2(emblaApi ?? null);
  }, []);

  const scrollPrev = () => {
    api1?.scrollPrev();
    api2?.scrollPrev();
  };

  const scrollNext = () => {
    api1?.scrollNext();
    api2?.scrollNext();
  };

  const slides = GALLERY_PHOTOS.map(p => ({ src: p.src, alt: p.alt }));

  return (
    <section id="gallery" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <span className="font-hero text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">{t.gallery.label}</span>
        <h2 className="mt-3 font-hero text-3xl md:text-4xl font-bold">
          {t.gallery.heading} <span className="gradient-text">{t.gallery.accent}</span>
        </h2>
        <p className="mt-2 text-[var(--text-2)]">{t.gallery.sub}</p>

        <div className="mt-8 relative">
          {/* Navigation arrows */}
          <button onClick={scrollPrev} className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={scrollNext} className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Row 1 */}
          <div className="mb-4">
            <Carousel opts={{ align: "start", loop: true }} setApi={syncApi1}>
              <CarouselContent>
                {row1.map((photo, i) => (
                  <CarouselItem key={i} className="basis-1/2 md:basis-1/4 pl-2 md:pl-4">
                    <GalleryCard photo={photo} index={i} onClick={() => setLb(i)} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Row 2 */}
          <div>
            <Carousel opts={{ align: "start", loop: true }} setApi={syncApi2}>
              <CarouselContent>
                {row2.map((photo, i) => (
                  <CarouselItem key={i} className="basis-1/2 md:basis-1/4 pl-2 md:pl-4">
                    <GalleryCard photo={photo} index={i + row1.length} onClick={() => setLb(i + row1.length)} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lb !== null}
        close={() => setLb(null)}
        index={lb ?? 0}
        slides={slides}
      />
    </section>
  );
}

function GalleryCard({ photo, index, onClick }: { photo: GalleryPhoto; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
      onClick={onClick}
    >
      <div className="aspect-[4/3] relative">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-xs font-medium leading-snug">{photo.description}</p>
        </div>
      </div>
    </motion.div>
  );
}
