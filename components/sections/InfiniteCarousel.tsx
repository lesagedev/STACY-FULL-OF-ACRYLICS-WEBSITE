"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchCachedJson } from "@/lib/gallery-cache";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

function CarouselRow({ photos }: { photos: GalleryImage[] }) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [Autoplay({ delay: 2200, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-4 md:gap-5">
        {photos.map((photo, i) => (
          <div
            key={`${photo.id}-${i}`}
            className="relative shrink-0 w-[220px] h-[150px] md:w-[270px] md:h-[180px] overflow-hidden rounded-xl border border-[var(--border-card)] group"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              loading="lazy"
              decoding="async"
              fetchPriority="low"
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
  const [photos, setPhotos] = useState<GalleryImage[]>([]);

  useEffect(() => {
    fetchCachedJson("gallery", 5 * 60 * 1000, async () => {
      const res = await fetch("/api/gallery", { cache: "no-store" });
      if (!res.ok) throw new Error("Galerie indisponible");
      return res.json();
    })
      .then((data) => {
        const gallery = data as { images?: GalleryImage[] };
        setPhotos(gallery.images || []);
      })
      .catch(() => {});
  }, []);

  if (photos.length === 0) return null;

  const mid = Math.ceil(photos.length / 2);
  const row1 = photos.slice(0, mid);

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
