"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import { CONTACT } from "@/lib/data";
import { useI18n } from "@/lib/i18n/context";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { InstagramIcon, TikTokIcon, SnapchatIcon } from "@/components/ui/SocialIcons";

export function ContactSection() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1200);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={{ hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        >
          <SectionLabel>{t.contact.label}</SectionLabel>

          <motion.h2
            variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
            className="mt-6 font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)]"
          >
            {t.contact.heading} <span className="gradient-text">{t.contact.accent}</span>
          </motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="mt-2 text-[var(--text-secondary)]"
          >
            {t.contact.sub}
          </motion.p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }} className="space-y-3">
              {CONTACT.phones.map((phone, i) => (
                <a key={i} href={`tel:${phone.replace(/\s/g, "")}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl glass-card p-4 card-hover border border-[var(--border-card)] hover:border-[#25D366] transition-colors">
                  <div className="rounded-xl bg-[#25D366]/10 p-3"><Phone className="h-5 w-5 text-[#25D366]" /></div>
                  <div>
                    <span className="font-hero text-lg text-[var(--text-primary)]">{phone}</span>
                    <p className="text-xs text-[var(--text-muted)]">Appeler maintenant</p>
                  </div>
                </a>
              ))}
              <div className="flex items-center gap-4 rounded-xl glass-card p-4 border border-[var(--border-card)]">
                <div className="rounded-xl bg-[var(--accent)]/10 p-3"><Mail className="h-5 w-5 text-[var(--accent)]" /></div>
                <div>
                  <span className="font-hero text-lg text-[var(--text-primary)]">{t.contact.email_label}</span>
                  <p className="text-xs text-[var(--text-muted)]">{CONTACT.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl glass-card p-4 border border-[var(--border-card)]">
                <div className="rounded-xl bg-[var(--text-primary)]/10 p-3"><MapPin className="h-5 w-5 text-[var(--text-primary)]" /></div>
                <div>
                  <span className="font-hero text-lg text-[var(--text-primary)]">{t.contact.location_label}</span>
                  <p className="text-xs text-[var(--text-muted)]">{CONTACT.location}</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-accent text-xs font-semibold uppercase tracking-wider text-[var(--accent)] mb-4">Suivez-moi</h3>
                <div className="flex gap-3">
                  <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white hover:opacity-90 transition-opacity">
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                  <a href={CONTACT.tiktok} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#1A1A1A] text-white hover:opacity-90 transition-opacity">
                    <TikTokIcon className="h-5 w-5" />
                  </a>
                  <a href={CONTACT.snapchat} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#FFFC00] text-[#1A1A1A] hover:opacity-90 transition-opacity">
                    <SnapchatIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}
              className="rounded-2xl glass-card p-6 border border-[var(--border-card)]"
            >
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="mb-4 h-10 w-10 text-[var(--accent)]" />
                  <h3 className="font-hero text-2xl text-[var(--text-primary)]">{t.contact.sent_title}</h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{t.contact.sent_sub}</p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <h3 className="font-hero text-2xl text-[var(--text-primary)]">{t.contact.form_title}</h3>
                  <input type="text" required placeholder={t.contact.name_placeholder}
                    className="w-full rounded-xl border border-[var(--border-card)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--text-muted)]" />
                  <input type="email" required placeholder={t.contact.email_placeholder}
                    className="w-full rounded-xl border border-[var(--border-card)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--text-muted)]" />
                  <textarea required rows={4} placeholder={t.contact.message_placeholder}
                    className="w-full rounded-xl border border-[var(--border-card)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-colors resize-none placeholder:text-[var(--text-muted)]" />
                  <button type="submit" disabled={sending}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50">
                    {sending ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <Send className="h-4 w-4" />}
                    {sending ? t.contact.sending : t.contact.send}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
