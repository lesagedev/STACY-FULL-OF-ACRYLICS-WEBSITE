"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { VISION, MISSION, SHOOTING_PHOTOS } from "@/lib/data";
import { useI18n } from "@/lib/i18n/context";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function VisionMissionSection() {
  const { t } = useI18n();
  const vmImage = SHOOTING_PHOTOS[3].src;

  return (
    <section id="vision-mission" className="py-16 md:py-24 bg-[var(--bg-primary)] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={{ hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <SectionLabel>{t.vision.label}</SectionLabel>
            <span className="text-[var(--text-muted)] text-xs">/</span>
            <span className="font-accent inline-flex items-center gap-2 rounded-full border border-[var(--border-card)] bg-[var(--bg-glass)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              {t.mission.label}
            </span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* Vision + Mission text (mobile first) */}
            <motion.div
              variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } } }}
              className="relative order-1 lg:order-1"
            >
              <div className="mt-6 lg:mt-0">
                <h3 className="font-hero text-2xl text-[var(--accent)]">{t.vision.heading}</h3>
                <p className="mt-2 text-[var(--text-secondary)] leading-relaxed">{VISION.text}</p>
              </div>

              <div className="mt-10">
                <h3 className="font-hero text-2xl text-[var(--text-primary)]">{t.mission.heading}</h3>
                <div className="mt-3 space-y-3">
                  {MISSION.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-[9px] font-bold text-white">
                        {i + 1}
                      </span>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Image (last on mobile) */}
            <motion.div
              variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } } }}
              className="relative order-2 lg:order-2"
            >
              <div className="overflow-hidden rounded-2xl border border-[var(--border-card)] aspect-[4/5] md:aspect-[4/3] w-full relative">
                <Image src={vmImage} alt="Vision" fill className="object-cover object-top" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}