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

type FileStatus = {
  name: string;
  state: "pending" | "uploading" | "done" | "error";
  message?: string;
};

const CONCURRENCY = 4;

async function runConcurrent<T, R>(items: T[], limit: number, fn: (item: T, index: number) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await fn(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

export function ImageUpload({ categories, onUploaded }: { categories: Category[]; onUploaded: (images: UploadedImage[]) => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const [statuses, setStatuses] = useState<FileStatus[]>([]);
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [alt, setAlt] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleSelect = (selected: File[]) => {
    setFiles(selected);
    setStatuses(selected.map((file) => ({ name: file.name, state: "pending" })));
  };

  const startUpload = async () => {
    if (!files.length || uploading) return;
    setUploading(true);
    setStatuses((current) => current.map((status) => ({ ...status, state: "pending", message: undefined })));

    const results = await runConcurrent(files, CONCURRENCY, async (file, index) => {
      setStatuses((current) => current.map((status, i) => (i === index ? { ...status, state: "uploading" } : status)));
      const body = new FormData();
      body.append("files", file);
      body.set("categoryIds", categoryIds.join(","));
      body.set("alt", alt);
      body.set("description", description);
      try {
        const response = await fetch("/api/images/upload", { method: "POST", body });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Upload impossible");
        onUploaded(data.images);
        return { ok: true as const };
      } catch (error) {
        return { ok: false as const, message: error instanceof Error ? error.message : "Upload impossible" };
      }
    });

    setStatuses((current) =>
      current.map((status, i) => {
        const result = results[i];
        return {
          ...status,
          state: result.ok ? "done" : "error",
          message: result.ok ? undefined : result.message,
        };
      })
    );
    setUploading(false);
  };

  const doneCount = statuses.filter((status) => status.state === "done").length;

  return (
    <div className="mb-6 rounded-2xl border border-[#C9A84C]/30 bg-[#C9A84C]/5 p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <label className="flex-1 text-white/60 text-sm">
          Photos
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            onChange={(event) => handleSelect(Array.from(event.target.files || []))}
            className="mt-2 block w-full text-xs text-white/60 file:mr-3 file:rounded-lg file:border-0 file:bg-[#C9A84C] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-black"
          />
        </label>
        <input value={alt} onChange={(event) => setAlt(event.target.value)} placeholder="Texte alternatif" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white lg:w-48" />
        <input value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Description / design" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white lg:w-56" />
        <button
          type="button"
          onClick={startUpload}
          disabled={!files.length || uploading}
          className="rounded-xl bg-[#C9A84C] px-5 py-2.5 text-sm font-semibold text-black disabled:opacity-50"
        >
          {uploading ? `Upload ${doneCount}/${statuses.length}...` : "Uploader"}
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
      {statuses.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {statuses.map((status) => (
            <li key={status.name} className="flex items-center gap-2 text-xs">
              <span className={`h-2 w-2 shrink-0 rounded-full ${status.state === "done" ? "bg-green-400" : status.state === "error" ? "bg-red-400" : status.state === "uploading" ? "bg-[#C9A84C] animate-pulse" : "bg-white/20"}`} />
              <span className="truncate text-white/60">{status.name}</span>
              {status.state === "error" && <span className="text-red-400 truncate">{status.message}</span>}
            </li>
          ))}
        </ul>
      )}
      {files.length > 0 && !uploading && statuses.every((status) => status.state === "done") && (
        <p className="mt-3 text-xs text-[#C9A84C]">{statuses.length} image(s) ajoutée(s).</p>
      )}
    </div>
  );
}
