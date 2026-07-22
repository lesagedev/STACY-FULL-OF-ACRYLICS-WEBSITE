"use client";
import { motion } from "framer-motion";
import { Gem, Sparkles } from "lucide-react";
import { SERVICES } from "@/lib/data";
import { useI18n } from "@/lib/i18n/context";
import { SectionLabel } from "@/components/ui/SectionLabel";

const ICONS = { nails: Gem, sparkles: Sparkles };

export function ServicesSection() {
  const { t } = useI18n();
  return (
    <section id="services" className="py-16 md:py-24 bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={{ hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        >
          <SectionLabel>{t.services.label}</SectionLabel>

          <motion.h2
            variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
            className="mt-6 font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)]"
          >
            {t.services.heading} <span className="gradient-text">{t.services.accent}</span>
          </motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="mt-2 text-[var(--text-secondary)]"
          >
            {t.services.sub}
          </motion.p>

          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            {SERVICES.map((s, i) => {
              const Icon = ICONS[s.icon as keyof typeof ICONS];
              return (
                <motion.div
                  key={s.title}
                  variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } } }}
                  className="group rounded-2xl glass-card p-6 card-hover border border-[var(--border-card)]"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="inline-flex rounded-xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent-2)]/20 p-3 mb-4">
                    <Icon className="h-6 w-6 text-[var(--accent)]" />
                  </div>
                  <h3 className="font-hero text-2xl text-[var(--text-primary)]">{s.title}</h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{s.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.features.map(f => (
                      <span key={f} className="rounded-full glass-card border border-[var(--border-card)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
                        {f}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
