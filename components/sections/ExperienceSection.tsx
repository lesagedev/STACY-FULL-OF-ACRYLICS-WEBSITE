"use client";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { EXPERIENCE } from "@/lib/data";

export function ExperienceSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <span className="font-hero text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">Parcours</span>
        <h2 className="mt-3 font-hero text-3xl md:text-4xl font-bold">
          Expérience <span className="gradient-text">Professionnelle</span>
        </h2>

        <div className="mt-8 space-y-6">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-8 border-l-2 border-[var(--accent)]/20"
            >
              <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-[var(--accent)] flex items-center justify-center">
                <Briefcase className="h-3 w-3 text-white" />
              </div>
              <div className="rounded-xl bg-[var(--card)] border border-[var(--border)] p-6">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-[var(--accent)]">{exp.year}</span>
                  <span className="text-sm font-semibold text-[var(--text)]">{exp.company}</span>
                </div>
                <h3 className="font-hero text-lg font-bold text-[var(--text)]">{exp.role}</h3>
                <p className="mt-2 text-sm text-[var(--text-2)] leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
