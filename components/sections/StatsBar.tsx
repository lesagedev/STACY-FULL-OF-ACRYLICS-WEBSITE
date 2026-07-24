"use client";
import { motion } from "framer-motion";
import { SOCIAL_STATS } from "@/lib/data";
import { InstagramIcon, TikTokIcon, SnapchatIcon } from "@/components/ui/SocialIcons";

export function StatsBar() {
  return (
    <section className="relative -mt-10 md:-mt-12 -mb-20 md:-mb-24 z-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-4 md:p-6 mx-auto max-w-lg md:max-w-2xl shadow-xl shadow-[var(--glow)]"
        >
          <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none justify-center">
            {SOCIAL_STATS.map((s, i) => (
              <motion.div
                key={s.platform}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="flex items-center gap-3 shrink-0 snap-start"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-[var(--bg-card)]/70 border border-[var(--border-card)]">
                  {s.platform === "Instagram" && <InstagramIcon className="h-5 w-5 text-[var(--text-muted)]" />}
                  {s.platform === "TikTok" && <TikTokIcon className="h-5 w-5 text-[var(--text-muted)]" />}
                  {s.platform === "Snapchat" && <SnapchatIcon className="h-5 w-5 text-[var(--text-muted)]" />}
                </div>
                <div>
                  <p className="font-hero text-lg leading-none text-[var(--text-primary)]">{s.count}</p>
                  <p className="text-xs text-[var(--text-muted)]">{s.platform}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}