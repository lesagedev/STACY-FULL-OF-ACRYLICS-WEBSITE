"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, Menu, X, Sun, Moon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import dynamic from "next/dynamic";
import { useI18n } from "@/lib/i18n/context";
import { CONTACT } from "@/lib/data";
import { InstagramIcon, TikTokIcon, SnapchatIcon } from "@/components/ui/SocialIcons";


const AboutSection       = dynamic(() => import("@/components/sections/AboutSection").then(m => m.AboutSection), { ssr: false });
const CreationsSection    = dynamic(() => import("@/components/sections/CreationsSection").then(m => m.CreationsSection), { ssr: false });
const ServicesSection     = dynamic(() => import("@/components/sections/ServicesSection").then(m => m.ServicesSection), { ssr: false });
const ProjectsSection     = dynamic(() => import("@/components/sections/ProjectsSection").then(m => m.ProjectsSection), { ssr: false });
const VisionMissionSection = dynamic(() => import("@/components/sections/VisionMissionSection").then(m => m.VisionMissionSection), { ssr: false });
const ContactSection      = dynamic(() => import("@/components/sections/ContactSection").then(m => m.ContactSection), { ssr: false });
const InfiniteCarousel    = dynamic(() => import("@/components/sections/InfiniteCarousel").then(m => m.InfiniteCarousel), { ssr: false });
const HeroSection         = dynamic(() => import("@/components/sections/HeroSection").then(m => m.HeroSection), { ssr: false });
const StatsBar            = dynamic(() => import("@/components/sections/StatsBar").then(m => m.StatsBar), { ssr: false });

const NAV_ITEMS = [
  { id: "about",     key: "about" },
  { id: "creations", key: "creations" },
  { id: "services",  key: "services" },
  { id: "contact",   key: "contact" },
] as const;

function TopBar() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("about");
  const [dark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setDark(false);
      document.documentElement.removeAttribute("data-theme");
    } else {
      setDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleDark = () => {
    setDark(d => {
      const next = !d;
      if (next) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

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
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[var(--bg-primary)]/50 backdrop-blur-md border-b border-[var(--border-card)]" : "bg-transparent"
    }`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 font-hero text-xl text-[var(--accent)] tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-xs font-bold text-white">S</span>
          <span>STACYFULLOFACRYLICS</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map(n => (
            <button key={n.id} onClick={() => jump(n.id)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                active === n.id
                  ? "text-[var(--accent)] bg-[var(--accent)]/10"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]/50"
              }`}>
              {t.nav[n.key as keyof typeof t.nav]}
            </button>
          ))}
          <div className="ml-2 flex items-center gap-2 border-l border-[var(--border-card)] pl-3">
            <button onClick={toggleDark} className="p-2 rounded-lg hover:bg-[var(--bg-card)]/50 transition-colors" aria-label="Toggle theme">
              {!mounted ? <div className="h-4 w-4" /> : dark ? <Sun className="h-4 w-4 text-[var(--accent)]" /> : <Moon className="h-4 w-4 text-[var(--text-secondary)]" />}
            </button>
            <div className="flex rounded-full glass-card border border-[var(--border-card)] text-xs">
              <button onClick={() => setLang("fr")} className={`px-2.5 py-1 rounded-full transition-colors ${lang === "fr" ? "bg-[var(--accent)] text-white" : "text-[var(--text-secondary)]"}`}>FR</button>
              <button onClick={() => setLang("en")} className={`px-2.5 py-1 rounded-full transition-colors ${lang === "en" ? "bg-[var(--accent)] text-white" : "text-[var(--text-secondary)]"}`}>EN</button>
            </div>
            <a href="#contact" className="rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-5 py-2 text-sm font-semibold text-white shimmer-sweep">
              {t.nav.contact}
            </a>
          </div>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button onClick={toggleDark} className="p-2 rounded-lg hover:bg-[var(--bg-card)]/50 transition-colors">
            {!mounted ? <div className="h-4 w-4" /> : dark ? <Sun className="h-4 w-4 text-[var(--accent)]" /> : <Moon className="h-4 w-4 text-[var(--text-secondary)]" />}
          </button>
          <div className="flex rounded-full glass-card border border-[var(--border-card)] text-[10px]">
            <button onClick={() => setLang("fr")} className={`px-2 py-1 rounded-full transition-colors ${lang === "fr" ? "bg-[var(--accent)] text-white" : "text-[var(--text-secondary)]"}`}>FR</button>
            <button onClick={() => setLang("en")} className={`px-2 py-1 rounded-full transition-colors ${lang === "en" ? "bg-[var(--accent)] text-white" : "text-[var(--text-secondary)]"}`}>EN</button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2" aria-label="Menu">
            {menuOpen ? <X className="h-5 w-5 text-[var(--text-primary)]" /> : <Menu className="h-5 w-5 text-[var(--text-primary)]" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[var(--bg-primary)] pt-24 px-6 md:hidden">
            <nav className="flex flex-col gap-4">
              {NAV_ITEMS.map((n, i) => (
                <motion.button key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  onClick={() => jump(n.id)}
                  className="font-hero text-4xl text-left text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                  {t.nav[n.key as keyof typeof t.nav]}
                </motion.button>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)}
                className="mt-4 inline-flex w-fit rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-8 py-3 text-sm font-semibold text-white">
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
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <VisionMissionSection />
      <CreationsSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      <InfiniteCarousel />

      <footer className="border-t border-[var(--border-card)] py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-xs font-bold text-white">S</span>
              <h3 className="font-hero text-2xl text-[var(--text-primary)] tracking-tight">STACYFULLOFACRYLICS</h3>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-2 max-w-md">
              {t.footer.rights}
            </p>
          </div>
          <div className="flex gap-3">
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white hover:scale-110 transition-transform">
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a href={CONTACT.tiktok} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-[#1A1A1A] text-white hover:scale-110 transition-transform">
              <TikTokIcon className="h-4 w-4" />
            </a>
            <a href={CONTACT.snapchat} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center h-10 w-10 rounded-full bg-[#FFFC00] text-[#1A1A1A] hover:scale-110 transition-transform">
              <SnapchatIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-6 pt-4 border-t border-[var(--border-card)] flex flex-col md:flex-row justify-between text-xs text-[var(--text-muted)]">
          <span>© 2026 STACYFULLOFACRYLICS. {t.footer.rights}</span>
          <span>{t.footer.made}</span>
        </div>
      </footer>

      <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#1DA851] transition-colors shadow-lg hover:scale-110 hover:shadow-xl"
        aria-label="WhatsApp">
        <FaWhatsapp className="h-7 w-7" />
      </a>

      <AnimatePresence>
        {showTop && (
          <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 h-10 w-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-lg">
            <ChevronUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}