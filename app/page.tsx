"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useI18n } from "@/lib/i18n/context";
import { CONTACT } from "@/lib/data";

const AboutSection    = dynamic(() => import("@/components/sections/AboutSection").then(m => m.AboutSection),    { ssr: false });
const ExperienceSection = dynamic(() => import("@/components/sections/ExperienceSection").then(m => m.ExperienceSection), { ssr: false });
const GallerySection  = dynamic(() => import("@/components/sections/GallerySection").then(m => m.GallerySection),  { ssr: false });
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection").then(m => m.ServicesSection), { ssr: false });
const ContactSection  = dynamic(() => import("@/components/sections/ContactSection").then(m => m.ContactSection),  { ssr: false });

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

const NAV_ITEMS = [
  { id: "about",    key: "about"   },
  { id: "gallery",  key: "gallery" },
  { id: "services", key: "services" },
  { id: "contact",  key: "contact" },
] as const;

function TopBar() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const y = window.scrollY + window.innerHeight * 0.4;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && y >= el.offsetTop) setActive(item.id);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [menuOpen]);

  const jump = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--border)]" : ""}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-hero text-lg font-bold text-[var(--text)] tracking-tight">
          STACY
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map(n => (
            <button key={n.id} onClick={() => jump(n.id)}
              className={`text-sm transition-colors ${active === n.id ? "text-[var(--accent)] font-semibold" : "text-[var(--text-2)] hover:text-[var(--text)]"}`}>
              {t.nav[n.key as keyof typeof t.nav]}
            </button>
          ))}
          <div className="flex rounded-full border border-[var(--border)] text-xs">
            <button onClick={() => setLang("fr")} className={`px-2.5 py-1 rounded-full transition-colors ${lang === "fr" ? "bg-[var(--text)] text-white" : ""}`}>FR</button>
            <button onClick={() => setLang("en")} className={`px-2.5 py-1 rounded-full transition-colors ${lang === "en" ? "bg-[var(--text)] text-white" : ""}`}>EN</button>
          </div>
          <a href="#contact" className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            {t.nav.contact}
          </a>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <div className="flex rounded-full border border-[var(--border)] text-[10px]">
            <button onClick={() => setLang("fr")} className={`px-2 py-1 rounded-full transition-colors ${lang === "fr" ? "bg-[var(--text)] text-white" : ""}`}>FR</button>
            <button onClick={() => setLang("en")} className={`px-2 py-1 rounded-full transition-colors ${lang === "en" ? "bg-[var(--text)] text-white" : ""}`}>EN</button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2" aria-label="Menu">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[var(--bg)] pt-20 px-6 md:hidden">
            <nav className="flex flex-col gap-6">
              {NAV_ITEMS.map((n, i) => (
                <motion.button key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  onClick={() => jump(n.id)}
                  className="font-hero text-3xl font-bold text-left text-[var(--text)]">
                  {t.nav[n.key as keyof typeof t.nav]}
                </motion.button>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex w-fit rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white">
                {t.nav.contact}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default function App() {
  const { t } = useI18n();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <main>
      <TopBar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-end pb-24 md:items-center md:pb-0 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="/gallery/stacy-portrait-04-roses.webp" alt="" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-white/20 md:bg-gradient-to-r md:from-white md:from-50% md:via-white/80 md:via-70% md:to-transparent" />
        </div>

        <div className="relative w-full max-w-6xl mx-auto px-6 md:py-24">
          <div className="max-w-xl">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-4">
              {t.hero.badge}
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="font-hero text-[clamp(2.5rem,8vw,5rem)] leading-[1] tracking-tight text-[var(--text)] mb-5">
              STACY<br />
              <span className="text-[var(--accent)]">Full of Acrylics</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
              className="text-[var(--text-2)] text-sm md:text-base max-w-md leading-relaxed mb-8">
              {t.hero.tagline}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3">
              <a href="#gallery"
                className="rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity">
                {t.hero.cta_gallery}
              </a>
              <a href="#contact"
                className="rounded-full border border-[var(--text)]/20 px-7 py-3 text-sm font-medium text-[var(--text)] hover:border-[var(--text)]/40 transition-colors">
                {t.hero.cta_contact}
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
          <ChevronDown className="h-5 w-5 text-[var(--muted)] animate-bounce" />
        </motion.div>
      </section>

      <AboutSection />
      <ExperienceSection />
      <GallerySection />
      <ServicesSection />
      <ContactSection />

      <footer className="border-t border-[var(--border)] py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-hero text-xl text-[var(--text)] tracking-tight">STACY FULL OF ACRYLICS</h3>
            <p className="text-xs text-[var(--muted)] mt-1">Prothésiste Ongulaire Résineuse</p>
          </div>
          <div className="flex gap-3">
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white hover:opacity-90 transition-opacity">
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a href={CONTACT.tiktok} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-[#1A1A1A] text-white hover:opacity-90 transition-opacity">
              <TikTokIcon className="h-4 w-4" />
            </a>
            <a href={CONTACT.snapchat} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-[#FFFC00] text-[#1A1A1A] hover:opacity-90 transition-opacity">
              <SnapchatIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-6 pt-4 border-t border-[var(--border)] flex flex-col md:flex-row justify-between text-xs text-[var(--muted)]">
          <span>© 2026 Stacy Full Of Acrylics. {t.footer.rights}</span>
          <span>{t.footer.made}</span>
        </div>
      </footer>

      <AnimatePresence>
        {showTop && (
          <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 h-10 w-10 rounded-full bg-[var(--text)] text-white flex items-center justify-center hover:opacity-80 transition-opacity">
            <ChevronUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
