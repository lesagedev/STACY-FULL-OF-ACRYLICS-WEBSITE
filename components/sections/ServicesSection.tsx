"use client";
import { motion } from "framer-motion";
import { Gem, Sparkles } from "lucide-react";
import { SERVICES } from "@/lib/data";
import { useI18n } from "@/lib/i18n/context";

const ICONS = { nails: Gem, sparkles: Sparkles };

export function ServicesSection() {
  const { t } = useI18n();
  return (
    <section id="services" className="py-16 md:py-24 bg-[var(--bg-alt)]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <span className="font-hero text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">{t.services.label}</span>
        <h2 className="mt-3 font-hero text-3xl md:text-4xl font-bold">
          {t.services.heading} <span className="gradient-text">{t.services.accent}</span>
        </h2>
        <p className="mt-2 text-[var(--text-2)]">{t.services.sub}</p>

        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon as keyof typeof ICONS];
            return (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-[var(--card)] border border-[var(--border)] p-6 hover:border-[var(--accent)] transition-colors">
                <div className="inline-flex rounded-xl bg-[var(--accent)]/10 p-3 mb-4">
                  <Icon className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <h3 className="font-hero text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-2)] leading-relaxed">{s.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.features.map(f => (
                    <span key={f} className="rounded-full bg-[var(--accent)]/8 border border-[var(--accent)]/15 px-3 py-1 text-xs font-medium text-[var(--accent)]">{f}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
