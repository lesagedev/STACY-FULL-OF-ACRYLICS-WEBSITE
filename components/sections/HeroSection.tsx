"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n/context";

const letterVariant = {
  hidden: { y: 48, skewY: 4, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    skewY: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.3 + i * 0.04, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const ROLES = [
  "Prothésiste Ongulaire", "Nail Artist", "Créatrice de Tendances", "Artiste de la Main",
  "Nail Prosthetist", "Nail Artist", "Trend Creator", "Hand Artist",
];

export function HeroSection() {
  const { t, lang } = useI18n();
  const reduced = useReducedMotion();
  const [displayed, setDisplayed] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const currentRoles = lang === "fr" ? ROLES.slice(0, 4) : ROLES.slice(4);

  useEffect(() => {
    if (reduced) { setDisplayed(currentRoles[0]); return; }

    const role = currentRoles[roleIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < role.length) {
      timer = setTimeout(() => {
        setDisplayed(role.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      }, 80);
    } else if (!deleting && charIdx === role.length) {
      timer = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => {
        setDisplayed(role.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      }, 40);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setRoleIdx(r => (r + 1) % currentRoles.length);
    }

    return () => clearTimeout(timer);
  }, [charIdx, deleting, roleIdx, currentRoles, reduced]);

  const name = "STACY";
  const letters = name.split("");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image src="/hero-bg.webp" alt="" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/95 from-45% via-[var(--bg-primary)]/85 via-65% to-transparent md:hidden" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)]/95 from-25% via-[var(--bg-primary)]/85 via-55% to-transparent hidden md:block" />
        <div className="absolute inset-0 mesh-bg opacity-60" />
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(var(--accent-rgb),0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(var(--accent-rgb),0.02) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="absolute top-1/4 right-[5%] w-72 h-72 rounded-full bg-[var(--accent)]/5 blur-3xl animate-pulse hidden lg:block" style={{ animationDuration: "6s" }} />
      <div className="absolute bottom-1/4 left-[10%] w-96 h-96 rounded-full bg-[var(--accent)]/3 blur-3xl animate-pulse hidden lg:block" style={{ animationDuration: "8s", animationDelay: "1s" }} />

      <div className="absolute right-0 top-0 bottom-0 w-[45%] hidden lg:block">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--bg-primary)]/60 to-transparent z-10" />
        <Image src="/gallery/stacy-portrait-02.webp" alt="" width={600} height={900} className="absolute bottom-0 right-0 h-[95%] w-auto object-contain object-bottom" priority />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 md:px-6 pt-16 md:pt-0 pb-16">
        <div className="max-w-2xl">
          <motion.span
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-accent inline-flex items-center gap-2 rounded-full border border-[var(--border-card)] bg-[var(--bg-glass)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            {t.hero.badge}
          </motion.span>

          <h1 className="font-hero text-[clamp(3.8rem,13vw,9rem)] leading-[0.9] tracking-tight text-[var(--text-primary)] mb-2">
            {letters.map((l, i) => (
              <motion.span
                key={i}
                custom={i}
                initial={reduced ? undefined : "hidden"}
                animate="visible"
                variants={letterVariant}
                className="inline-block"
              >
                {l}
              </motion.span>
            ))}
            <br />
            <motion.span
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="gradient-text"
            >
              Full of Acrylics
            </motion.span>
          </h1>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="h-1 w-24 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] mb-6"
          />

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="font-display text-lg md:text-xl font-medium text-[var(--text-secondary)] mb-6 h-8"
          >
            <span>{displayed}</span>
            <span className="blinking-cursor" />
          </motion.div>

          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-[var(--text-secondary)] text-sm md:text-base max-w-md leading-relaxed mb-8"
          >
            {t.hero.tagline}
          </motion.p>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="flex flex-wrap gap-3"
          >
            <a href="#creations" className="relative rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-8 py-3.5 text-sm font-semibold text-white shimmer-sweep glow-pulse">
              {t.hero.cta_gallery}
            </a>
            <a href="#contact" className="rounded-full glass-card px-8 py-3.5 text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors">
              {t.hero.cta_contact}
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-5 w-5 text-[var(--text-muted)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}