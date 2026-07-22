"use client";
import { useMemo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { GALLERY_PHOTOS } from "@/lib/data";

function CarouselRow({ photos, reverse }: { photos: typeof GALLERY_PHOTOS; reverse?: boolean }) {
  const transforms = useMemo(
    () => photos.map(() => ({ rotate: Math.random() * 8 - 4 })),
    []
  );

  return (
    <div className={reverse ? "scale-x-[-1]" : ""}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView="auto"
        loop
        speed={700}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        className="!py-4"
        breakpoints={{ 768: { spaceBetween: 24 } }}
      >
        {[...photos, ...photos, ...photos].map((photo, i) => {
          const r = transforms[i % photos.length].rotate;
          return (
            <SwiperSlide key={`${photo.src}-${i}`} className="!w-[260px] md:!w-[280px]">
              <div
                className="relative overflow-hidden rounded-xl border border-[var(--border-card)] card-hover"
                style={{
                  width: 260,
                  height: 180,
                  transform: reverse ? `rotate(${r}deg) scaleX(-1)` : `rotate(${r}deg)`,
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="280px"
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export function InfiniteCarousel() {
  const mid = Math.ceil(GALLERY_PHOTOS.length / 2);
  const row1 = GALLERY_PHOTOS.slice(0, mid);
  const row2 = GALLERY_PHOTOS.slice(mid);

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

      <div className="space-y-8 md:space-y-12 select-none">
        <CarouselRow photos={row1} />
        <CarouselRow photos={row2} reverse />
      </div>
    </section>
  );
}