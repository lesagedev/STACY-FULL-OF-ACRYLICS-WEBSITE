"use client";

import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: { images: number };
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newSlug) return;
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, slug: newSlug }),
    });
    if (res.ok) {
      setNewName("");
      setNewSlug("");
      fetchCategories();
    }
  };

  const handleUpdate = async (id: string) => {
    const res = await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName, slug: editSlug }),
    });
    if (res.ok) {
      setEditingId(null);
      fetchCategories();
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Supprimer la catégorie "${name}" ?`)) return;
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    fetchCategories();
  };

  const autoSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8 font-[family-name:var(--font-display)]">
        Catégories
      </h1>

      <form onSubmit={handleCreate} className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Nom"
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
            setNewSlug(autoSlug(e.target.value));
          }}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#C9A84C] flex-1"
        />
        <input
          type="text"
          placeholder="Slug"
          value={newSlug}
          onChange={(e) => setNewSlug(e.target.value)}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#C9A84C] w-40"
        />
        <button
          type="submit"
          disabled={!newName || !newSlug}
          className="px-6 py-2 bg-[#C9A84C] text-black font-semibold rounded-xl text-sm hover:bg-[#D4AF37] disabled:opacity-50"
        >
          Créer
        </button>
      </form>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center gap-4 p-4 bg-[#111] rounded-xl border border-white/10"
            >
              {editingId === cat.id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A84C] flex-1"
                  />
                  <input
                    type="text"
                    value={editSlug}
                    onChange={(e) => setEditSlug(e.target.value)}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#C9A84C] w-32"
                  />
                  <button
                    onClick={() => handleUpdate(cat.id)}
                    className="px-3 py-1.5 bg-[#C9A84C] text-black rounded-lg text-sm"
                  >
                    Sauver
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1.5 bg-white/5 text-white/60 rounded-lg text-sm"
                  >
                    Annuler
                  </button>
                </>
              ) : (
                <>
                  <span className="text-white font-medium flex-1">{cat.name}</span>
                  <span className="text-white/40 text-sm font-mono">{cat.slug}</span>
                  <span className="text-white/30 text-sm">{cat._count.images} images</span>
                  <button
                    onClick={() => {
                      setEditingId(cat.id);
                      setEditName(cat.name);
                      setEditSlug(cat.slug);
                    }}
                    className="px-3 py-1.5 bg-white/5 text-white/60 rounded-lg text-sm hover:bg-white/10"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-sm hover:bg-red-500/20"
                  >
                    Supprimer
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
