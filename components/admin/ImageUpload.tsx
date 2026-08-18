"use client";

import { useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface UploadedImage {
  id: string;
  src: string;
  alt: string;
}

export function ImageUpload({ categories, onUploaded }: { categories: Category[]; onUploaded: (images: UploadedImage[]) => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [alt, setAlt] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const upload = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!files.length) return;
    setLoading(true);
    setMessage("");

    const body = new FormData();
    files.forEach((file) => body.append("files", file));
    body.set("categoryIds", categoryIds.join(","));
    body.set("alt", alt);
    body.set("description", description);

    try {
      const response = await fetch("/api/images/upload", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload impossible");
      onUploaded(data.images);
      setFiles([]);
      setAlt("");
      setDescription("");
      setMessage(`${data.images.length} image(s) ajoutée(s)`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload impossible");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={upload} className="mb-6 rounded-2xl border border-[#C9A84C]/30 bg-[#C9A84C]/5 p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <label className="flex-1 text-white/60 text-sm">
          Photos
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            onChange={(event) => setFiles(Array.from(event.target.files || []))}
            className="mt-2 block w-full text-xs text-white/60 file:mr-3 file:rounded-lg file:border-0 file:bg-[#C9A84C] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-black"
          />
        </label>
        <input value={alt} onChange={(event) => setAlt(event.target.value)} placeholder="Texte alternatif" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white lg:w-48" />
        <input value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Description / design" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white lg:w-56" />
        <button type="submit" disabled={!files.length || loading} className="rounded-xl bg-[#C9A84C] px-5 py-2.5 text-sm font-semibold text-black disabled:opacity-50">
          {loading ? "Upload..." : "Uploader"}
        </button>
      </div>
      {categories.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {categories.filter((category) => category.name !== "Archive").map((category) => (
            <label key={category.id} className="flex items-center gap-2 text-xs text-white/60">
              <input
                type="checkbox"
                checked={categoryIds.includes(category.id)}
                onChange={(event) => setCategoryIds((current) => event.target.checked ? [...current, category.id] : current.filter((id) => id !== category.id))}
                className="accent-[#C9A84C]"
              />
              {category.name}
            </label>
          ))}
        </div>
      )}
      {files.length > 0 && <p className="mt-3 text-xs text-white/40">{files.length} fichier(s) sélectionné(s), 10 Mo maximum par fichier.</p>}
      {message && <p className="mt-3 text-xs text-[#C9A84C]">{message}</p>}
    </form>
  );
}
