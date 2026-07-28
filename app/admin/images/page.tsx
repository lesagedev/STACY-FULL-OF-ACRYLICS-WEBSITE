"use client";

import { useEffect, useState, useCallback } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ImageCategory {
  category: Category;
}

interface Image {
  id: string;
  src: string;
  alt: string;
  description: string;
  categories: ImageCategory[];
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function ImagesPage() {
  const [images, setImages] = useState<Image[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 50, total: 0, pages: 0 });
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingImage, setEditingImage] = useState<Image | null>(null);
  const [editAlt, setEditAlt] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategories, setEditCategories] = useState<string[]>([]);

  const fetchImages = useCallback(async (page = 1) => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "50" });
    if (search) params.set("search", search);
    if (filterCategory) params.set("categoryId", filterCategory);
    const res = await fetch(`/api/images?${params}`);
    const data = await res.json();
    setImages(data.images);
    setPagination(data.pagination);
    setLoading(false);
  }, [search, filterCategory]);

  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then(setCategories);
  }, []);

  useEffect(() => {
    fetchImages(1);
  }, [fetchImages]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === images.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(images.map((img) => img.id)));
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Supprimer ${selected.size} image(s) ?`)) return;
    await fetch("/api/images/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", imageIds: [...selected] }),
    });
    setSelected(new Set());
    fetchImages(pagination.page);
  };

  const handleBulkAddCategory = async (categoryId: string) => {
    if (selected.size === 0) return;
    await fetch("/api/images/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "addCategories", imageIds: [...selected], categoryIds: [categoryId] }),
    });
    fetchImages(pagination.page);
  };

  const handleBulkRemoveCategory = async (categoryId: string) => {
    if (selected.size === 0) return;
    await fetch("/api/images/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "removeCategories", imageIds: [...selected], categoryIds: [categoryId] }),
    });
    fetchImages(pagination.page);
  };

  const openEdit = (img: Image) => {
    setEditingImage(img);
    setEditAlt(img.alt);
    setEditDescription(img.description);
    setEditCategories(img.categories.map((c) => c.category.id));
  };

  const saveEdit = async () => {
    if (!editingImage) return;
    await fetch(`/api/images/${editingImage.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alt: editAlt, description: editDescription, categoryIds: editCategories }),
    });
    setEditingImage(null);
    fetchImages(pagination.page);
  };

  const deleteImage = async (id: string) => {
    if (!confirm("Supprimer cette image ?")) return;
    await fetch(`/api/images/${id}`, { method: "DELETE" });
    fetchImages(pagination.page);
  };

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 font-[family-name:var(--font-display)]">
        Images
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#C9A84C] flex-1 min-w-0"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#C9A84C]"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {selected.size > 0 && (
        <div className="mb-6 p-3 sm:p-4 bg-[#C9A84C]/10 rounded-xl border border-[#C9A84C]/30">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[#C9A84C] text-sm font-medium">
              {selected.size} sélectionnée(s)
            </span>
            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-xs sm:text-sm hover:bg-red-500/30"
            >
              Supprimer
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <div key={cat.id} className="flex gap-1">
                <button
                  onClick={() => handleBulkAddCategory(cat.id)}
                  className="px-2.5 py-1.5 bg-white/5 text-white/70 rounded-lg text-xs hover:bg-white/10"
                >
                  + {cat.name}
                </button>
                <button
                  onClick={() => handleBulkRemoveCategory(cat.id)}
                  className="px-2.5 py-1.5 bg-white/5 text-white/40 rounded-lg text-xs hover:bg-white/10"
                >
                  − {cat.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={selected.size === images.length && images.length > 0}
            onChange={toggleSelectAll}
            className="accent-[#C9A84C]"
          />
          Tout sélectionner
        </label>
        <span className="text-white/40 text-sm">{pagination.total} images</span>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-square bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
          {images.map((img) => (
            <div
              key={img.id}
              className={`relative group rounded-xl overflow-hidden border-2 transition-colors ${
                selected.has(img.id) ? "border-[#C9A84C]" : "border-transparent hover:border-white/20"
              }`}
            >
              <input
                type="checkbox"
                checked={selected.has(img.id)}
                onChange={() => toggleSelect(img.id)}
                className="absolute top-1.5 left-1.5 z-10 accent-[#C9A84C] w-4 h-4"
              />
              <img
                src={img.src}
                alt={img.alt}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-1.5 sm:p-2">
                <p className="text-white text-[10px] sm:text-xs truncate">{img.alt || "Sans titre"}</p>
                <div className="flex flex-wrap gap-0.5 sm:gap-1 mt-1">
                  {img.categories.map((c) => (
                    <span key={c.category.id} className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 bg-[#C9A84C]/20 text-[#C9A84C] rounded">
                      {c.category.name}
                    </span>
                  ))}
                </div>
                <div className="flex gap-1 mt-1.5 sm:mt-2">
                  <button
                    onClick={() => openEdit(img)}
                    className="px-2 py-1 bg-white/10 text-white rounded text-[10px] sm:text-xs hover:bg-white/20"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => deleteImage(img.id)}
                    className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-[10px] sm:text-xs hover:bg-red-500/30"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {pagination.pages > 1 && (
        <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => fetchImages(p)}
              className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs sm:text-sm ${
                p === pagination.page
                  ? "bg-[#C9A84C] text-black"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {editingImage && (
        <div className="fixed inset-0 bg-black/80 flex items-end sm:items-center justify-center z-50 sm:p-4">
          <div className="bg-[#111] rounded-t-2xl sm:rounded-2xl border border-white/10 w-full sm:max-w-lg p-5 sm:p-6 max-h-[90vh] overflow-auto">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Modifier l&apos;image</h2>
            <img src={editingImage.src} alt={editingImage.alt} className="w-full h-40 sm:h-48 object-cover rounded-xl mb-4" />
            <div className="space-y-4">
              <div>
                <label className="text-white/60 text-sm block mb-1">Alt</label>
                <input
                  type="text"
                  value={editAlt}
                  onChange={(e) => setEditAlt(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#C9A84C]"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm block mb-1">Description</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#C9A84C] resize-none"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm block mb-2">Catégories</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 text-white/70 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editCategories.includes(cat.id)}
                        onChange={(e) => {
                          if (e.target.checked) setEditCategories([...editCategories, cat.id]);
                          else setEditCategories(editCategories.filter((id) => id !== cat.id));
                        }}
                        className="accent-[#C9A84C]"
                      />
                      {cat.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditingImage(null)}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-white/5 text-white/60 rounded-xl text-sm hover:bg-white/10"
              >
                Annuler
              </button>
              <button
                onClick={saveEdit}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-[#C9A84C] text-black font-semibold rounded-xl text-sm hover:bg-[#D4AF37]"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
