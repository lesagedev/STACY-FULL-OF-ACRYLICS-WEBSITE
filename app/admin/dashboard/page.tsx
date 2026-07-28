"use client";

import { useEffect, useState } from "react";

interface Stats {
  images: number;
  categories: number;
  projects: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ images: 0, categories: 0, projects: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/images?limit=1").then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/projects").then((r) => r.json()),
    ]).then(([imagesData, categoriesData, projectsData]) => {
      setStats({
        images: imagesData.pagination?.total || 0,
        categories: categoriesData.length || 0,
        projects: projectsData.length || 0,
      });
      setLoading(false);
    });
  }, []);

  const cards = [
    { label: "Images", value: stats.images, icon: "🖼️", href: "/admin/images" },
    { label: "Catégories", value: stats.categories, icon: "🏷️", href: "/admin/categories" },
    { label: "Projets", value: stats.projects, icon: "📁", href: "/admin/projects" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8 font-[family-name:var(--font-display)]">
        Tableau de bord
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            className="block p-6 bg-[#111] rounded-2xl border border-white/10 hover:border-[#C9A84C]/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{card.icon}</span>
              {loading ? (
                <div className="w-12 h-8 bg-white/5 rounded animate-pulse" />
              ) : (
                <span className="text-3xl font-bold text-white">
                  {card.value}
                </span>
              )}
            </div>
            <h3 className="text-white/60 text-sm">{card.label}</h3>
          </a>
        ))}
      </div>
    </div>
  );
}
