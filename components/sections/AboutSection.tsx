"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ABOUT, SHOOTING_PHOTOS } from "@/lib/data";
import { useI18n } from "@/lib/i18n/context";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Sticker } from "@/components/ui/Sticker";
import { AboutMobileSlider } from "./AboutMobileSlider";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const slide = {
  enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
};

const ABOUT_PHOTOS = [SHOOTING_PHOTOS[0], SHOOTING_PHOTOS[1], SHOOTING_PHOTOS[4]];

export function AboutSection() {
  const { t } = useI18n();
  const [photoIdx, setPhotoIdx] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const iv = setInterval(() => {
      setPhotoIdx(p => {
        const next = (p + 1) % ABOUT_PHOTOS.length;
        setDir(next > p ? 1 : -1);
        return next;
      });
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="about" className="relative py-16 md:py-24 bg-[var(--bg-secondary)] overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />
      <Sticker className="hidden md:block top-12 right-8" rotate={6} floatY={14}>
        <div className="rounded-2xl glass-card px-5 py-3 shadow-lg">
          <p className="font-hero text-xl text-[var(--accent)]">{ABOUT.competences.length}+</p>
          <p className="text-[10px] text-[var(--text-muted)]">Compétences</p>
        </div>
      </Sticker>
      <Sticker className="hidden md:block bottom-20 left-8" delay={1.5} rotate={-4} floatY={12}>
        <div className="rounded-2xl glass-card px-5 py-3 shadow-lg">
          <p className="font-hero text-xl text-[var(--accent)]">{ABOUT.parcours.length}</p>
          <p className="text-[10px] text-[var(--text-muted)]">Années d'étude</p>
        </div>
      </Sticker>

      <div className="relative max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={{ hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        >
          <SectionLabel>{t.about.label}</SectionLabel>

          <div className="md:hidden mt-6">
            <motion.div variants={fadeUp}>
              <AboutMobileSlider />
            </motion.div>
          </div>

          <div className="mt-8 grid gap-6 lg:gap-10 lg:grid-cols-2">
            <motion.div variants={fadeUp} className="relative order-2 lg:order-1 hidden md:block">
              <div className="overflow-hidden rounded-2xl border border-[var(--border-card)] aspect-[4/5] md:aspect-auto md:h-full w-full">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={photoIdx}
                    custom={dir}
                    variants={slide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                    className="absolute inset-0"
                  >
                    <Image src={ABOUT_PHOTOS[photoIdx].src} alt={ABOUT.fullName} width={800} height={500} className="w-full h-full object-cover object-top" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-2xl glass-card px-6 py-4 shadow-lg hidden md:block">
                <p className="font-accent text-xs uppercase tracking-wider text-[var(--accent)]">Plus de</p>
                <p className="font-hero text-3xl text-[var(--text-primary)]">5 ans</p>
                <p className="text-xs text-[var(--text-muted)]">d'expérience</p>
              </div>
            </motion.div>

            <div className="space-y-6 order-1 lg:order-2">
              <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
                {t.about.heading} <span className="gradient-text">{ABOUT.fullName}</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[var(--text-secondary)] leading-relaxed">{ABOUT.shortBio}</motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                {ABOUT.competences.map(comp => (
                  <span key={comp} className="px-3 py-1 text-xs font-medium rounded-full glass-card text-[var(--accent)]">
                    {comp}
                  </span>
                ))}
              </motion.div>

              <motion.div variants={fadeUp}>
                <h3 className="font-accent text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-4">{t.about.parcours}</h3>
                <div className="space-y-3 border-l-2 border-[var(--accent)]/20 pl-4">
                  {ABOUT.parcours.map(item => (
                    <div key={item.year}>
                      <span className="text-xs font-bold text-[var(--accent)]">{item.year}</span>
                      <p className="text-sm text-[var(--text-secondary)]">{item.event}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h3 className="font-accent text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-3">Langues</h3>
                <div className="flex flex-wrap gap-2">
                  {ABOUT.langues.map(lang => (
                    <span key={lang} className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--bg-card)] border border-[var(--border-card)] text-[var(--text-primary)]">
                      {lang}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h3 className="font-accent text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-3">Centres d&apos;intérêt</h3>
                <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {ABOUT.centresInteret.map(ci => (
                    <span key={ci} className="shrink-0 px-3 py-1 text-xs font-medium rounded-full bg-[var(--bg-card)] border border-[var(--border-card)] text-[var(--text-primary)] whitespace-nowrap">
                      {ci}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
