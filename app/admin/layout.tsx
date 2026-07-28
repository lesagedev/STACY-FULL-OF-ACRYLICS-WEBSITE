"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Tableau de bord", icon: "📊" },
  { href: "/admin/images", label: "Images", icon: "🖼️" },
  { href: "/admin/categories", label: "Catégories", icon: "🏷️" },
  { href: "/admin/projects", label: "Projets", icon: "📁" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [secret, setSecret] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSecret = params.get("s");
    const storedSecret = localStorage.getItem("admin_secret");
    const effectiveSecret = urlSecret || storedSecret;

    if (effectiveSecret) {
      localStorage.setItem("admin_secret", effectiveSecret);
      setSecret(effectiveSecret);
    }

    const token = localStorage.getItem("admin_token");
    if (!token && pathname !== "/admin") {
      router.push(`/admin?s=${effectiveSecret || ""}`);
    } else if (token) {
      setAuthenticated(true);
    }
  }, [pathname, router]);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  useEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);

  if (pathname === "/admin") {
    return <>{children}</>;
  }

  if (!authenticated) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push(`/admin?s=${secret}`);
  };

  const adminUrl = (path: string) => `${path}?s=${secret}`;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="lg:hidden sticky top-0 z-40 flex items-center gap-3 px-4 h-14 bg-[#111] border-b border-white/10">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 -ml-2 text-white/70 hover:text-white"
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {sidebarOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
        <h1 className="text-sm font-bold text-white font-[family-name:var(--font-display)] truncate">
          Admin — STACY FULL OF ACRYLICS
        </h1>
      </header>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#111] border-r border-white/10 flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-white/10 hidden lg:block">
          <h1 className="text-lg font-bold text-white font-[family-name:var(--font-display)]">
            Admin
          </h1>
          <p className="text-xs text-white/40 mt-1">STACY FULL OF ACRYLICS</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={adminUrl(item.href)}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                  isActive
                    ? "bg-[#C9A84C]/10 text-[#C9A84C]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors mb-2"
          >
            <span className="text-lg">🏠</span>
            <span>Voir le site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <span className="text-lg">🚪</span>
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      <main className="lg:ml-0 min-h-[calc(100vh-3.5rem)] lg:min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
