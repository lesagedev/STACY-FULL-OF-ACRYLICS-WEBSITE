"use client";
import { useState } from "react";
import { Send, Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import { CONTACT } from "@/lib/data";
import { useI18n } from "@/lib/i18n/context";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 10.86 4.48V13a8.28 8.28 0 0 0 5.58 2.15v-3.44a4.85 4.85 0 0 1-5.58-2.76V6.69h5.58z"/>
    </svg>
  );
}

function SnapchatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12.922-.214.094-.04.19-.06.29-.06.319 0 .596.18.745.392.116.157.19.346.19.546 0 .42-.375.75-.747.943-.195.09-.405.135-.615.135-.24 0-.465-.06-.66-.135a3.37 3.37 0 0 0-.255-.075c-.06.12-.165.285-.3.435-.255.3-.645.54-1.14.54h-.03c-.32 0-.645-.09-.945-.255-.12-.06-.24-.15-.375-.24-.15-.12-.33-.24-.54-.33-.39-.165-.84-.165-1.23 0-.21.09-.39.21-.54.33-.135.09-.255.18-.375.24-.3.165-.63.255-.945.255h-.03c-.495 0-.885-.24-1.14-.54-.135-.15-.24-.33-.3-.435a2.61 2.61 0 0 0-.66.135c-.375.195-.747.525-.747.945 0 .2.064.389.19.546.149.21.426.39.745.39.1 0 .196-.02.29-.06.279-.105.627-.21.923-.214.197 0 .326-.045.4-.09-.008-.165-.018-.33-.03-.51l-.004-.06c-.104-1.628-.23-3.654.3-4.847C7.855 1.069 11.216.793 12.206.793zM12 13.485c-1.062 0-1.934.87-1.934 1.94 0 .75.437 1.392 1.068 1.702l.026.014c.168.084.348.148.54.148s.372-.064.54-.148l.026-.014c.631-.31 1.068-.952 1.068-1.702 0-1.07-.872-1.94-1.934-1.94z"/>
    </svg>
  );
}

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
    <section id="contact" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <span className="font-hero text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">{t.contact.label}</span>
        <h2 className="mt-3 font-hero text-3xl md:text-4xl font-bold">
          {t.contact.heading} <span className="gradient-text">{t.contact.accent}</span>
        </h2>
        <p className="mt-2 text-[var(--text-2)]">{t.contact.sub}</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            {CONTACT.phones.map((phone, i) => (
              <a key={i} href={`tel:${phone.replace(/\s/g, "")}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl bg-[var(--card)] border border-[var(--border)] p-4 hover:border-[#25D366] transition-colors">
                <div className="rounded-xl bg-[#25D366]/10 p-3"><Phone className="h-5 w-5 text-[#25D366]" /></div>
                <div>
                  <span className="font-hero text-sm font-bold">{phone}</span>
                  <p className="text-xs text-[var(--muted)]">Appeler maintenant</p>
                </div>
              </a>
            ))}
            <div className="flex items-center gap-4 rounded-xl bg-[var(--card)] border border-[var(--border)] p-4">
              <div className="rounded-xl bg-[var(--accent)]/10 p-3"><Mail className="h-5 w-5 text-[var(--accent)]" /></div>
              <div>
                <span className="font-hero text-sm font-bold">{t.contact.email_label}</span>
                <p className="text-xs text-[var(--muted)]">{CONTACT.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-[var(--card)] border border-[var(--border)] p-4">
              <div className="rounded-xl bg-[var(--accent-2)]/10 p-3"><MapPin className="h-5 w-5 text-[var(--accent-2)]" /></div>
              <div>
                <span className="font-hero text-sm font-bold">{t.contact.location_label}</span>
                <p className="text-xs text-[var(--muted)]">{CONTACT.location}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-hero text-sm font-bold text-[var(--accent)] mb-3">Suivez-moi</h3>
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
          </div>

          <div className="rounded-2xl bg-[var(--card)] border border-[var(--border)] p-6">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="mb-4 h-10 w-10 text-[var(--accent)]" />
                <h3 className="font-hero text-xl font-bold">{t.contact.sent_title}</h3>
                <p className="mt-2 text-sm text-[var(--text-2)]">{t.contact.sent_sub}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <h3 className="font-hero text-lg font-bold">{t.contact.form_title}</h3>
                <input type="text" required placeholder={t.contact.name_placeholder}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)] transition-colors" />
                <input type="email" required placeholder={t.contact.email_placeholder}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)] transition-colors" />
                <textarea required rows={4} placeholder={t.contact.message_placeholder}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)] transition-colors resize-none" />
                <button type="submit" disabled={sending}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50">
                  {sending ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <Send className="h-4 w-4" />}
                  {sending ? t.contact.sending : t.contact.send}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
