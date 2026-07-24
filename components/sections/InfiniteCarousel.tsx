"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { GALLERY_PHOTOS } from "@/lib/data";

function CarouselRow({ photos }: { photos: typeof GALLERY_PHOTOS }) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [Autoplay({ delay: 2200, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-4 md:gap-5">
        {photos.map((photo, i) => (
          <div
            key={`${photo.src}-${i}`}
            className="relative shrink-0 w-[220px] h-[150px] md:w-[270px] md:h-[180px] overflow-hidden rounded-xl border border-[var(--border-card)] group"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="270px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function InfiniteCarousel() {
  const mid = Math.ceil(GALLERY_PHOTOS.length / 2);
  const row1 = GALLERY_PHOTOS.slice(0, mid);

  return (
    <section className="py-20 md:py-28 overflow-hidden bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 mb-12 text-center">
        <p className="font-accent text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Mes créations en mouvement
        </p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
          Galerie <span className="gradient-text">live</span>
        </h2>
      </div>

      <CarouselRow photos={row1} />
    </section>
  );
}
