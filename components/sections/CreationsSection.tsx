"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { GALLERY_PHOTOS, GALLERY_CATEGORIES } from "@/lib/data";
import { useI18n } from "@/lib/i18n/context";

export function CreationsSection() {
  const { t } = useI18n();
  const [active, setActive] = useState<string>("Tous");
  const [lb, setLb] = useState<number | null>(null);

  const filtered = active === "Tous"
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter(p => p.category === active);

  const slides = GALLERY_PHOTOS.map(p => ({ src: p.src, alt: p.alt }));

  return (
    <section id="creations" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-accent inline-flex items-center gap-2 rounded-full border border-[var(--border-card)] bg-[var(--bg-glass)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          {t.creations.label}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-6 font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)]"
        >
          {t.creations.heading} <span className="gradient-text">{t.creations.accent}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-2 text-[var(--text-secondary)]"
        >
          {t.creations.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {GALLERY_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                active === cat
                  ? "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white"
                  : "glass-card text-[var(--text-secondary)] hover:bg-[var(--bg-card)]"
              }`}
            >
              {cat === "Tous" ? t.creations.all : cat}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((photo, i) => (
            <motion.div
              key={photo.src}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="group relative cursor-pointer overflow-hidden rounded-xl border border-[var(--border-card)] card-hover"
              onClick={() => {
                const idx = GALLERY_PHOTOS.indexOf(photo);
                setLb(idx);
              }}
            >
              <div className="relative w-full aspect-[3/4]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-medium leading-snug">{photo.description}</p>
                  <span className="inline-block mt-1 text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">{photo.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Lightbox
        open={lb !== null}
        close={() => setLb(null)}
        index={lb ?? 0}
        slides={slides}
      />
    </section>
  );
}
