"use client";

import { useEffect, useState, useRef } from "react";

interface ProjectImage {
  id: string;
  order: number;
  label: string;
  image: { id: string; src: string; alt: string };
}

interface DbProject {
  id: string;
  name: string;
  description: string;
  limitImages: boolean;
  images: ProjectImage[];
}

interface Image {
  id: string;
  src: string;
  alt: string;
}

export default function ProjectsPage() {
  const [dbProjects, setDbProjects] = useState<DbProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editingProject, setEditingProject] = useState<DbProject | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImageIds, setEditImageIds] = useState<string[]>([]);
  const [imageSearch, setImageSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Image[]>([]);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const searchTimer = useRef<NodeJS.Timeout | null>(null);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setDbProjects(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const searchImages = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    const res = await fetch(`/api/images?search=${encodeURIComponent(query)}&limit=30`);
    const data = await res.json();
    setSearchResults(data.images);
  };

  const debouncedSearch = (query: string) => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => searchImages(query), 250);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, description: newDescription }),
    });
    if (res.ok) {
      const created = await res.json();
      setDbProjects((prev) => [...prev, { ...created, images: [] }]);
      setNewName("");
      setNewDescription("");
    }
  };

  const openEdit = (project: DbProject) => {
    setEditingProject(project);
    setEditName(project.name);
    setEditDescription(project.description);
    setEditImageIds(project.images.map((pi) => pi.image.id));
  };

  const handleUpdate = async () => {
    if (!editingProject) return;
    const res = await fetch(`/api/projects/${editingProject.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName, description: editDescription, imageIds: editImageIds }),
    });
    if (res.ok) {
      const updated = await res.json();
      setDbProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      setEditingProject(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Supprimer le projet "${name}" ?`)) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setDbProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const addImageToProject = (imageId: string) => {
    if (!editImageIds.includes(imageId)) {
      setEditImageIds([...editImageIds, imageId]);
    }
  };

  const removeImageFromProject = (imageId: string) => {
    setEditImageIds(editImageIds.filter((id) => id !== imageId));
  };

  const moveImage = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= editImageIds.length) return;
    const updated = [...editImageIds];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setEditImageIds(updated);
  };

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 font-[family-name:var(--font-display)]">
        Projets
      </h1>

      <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Nom du projet"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#C9A84C] flex-1 min-w-0"
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#C9A84C] flex-1 min-w-0"
        />
        <button
          type="submit"
          disabled={!newName}
          className="px-6 py-2.5 bg-[#C9A84C] text-black font-semibold rounded-xl text-sm hover:bg-[#D4AF37] disabled:opacity-50"
        >
          Créer
        </button>
      </form>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 sm:h-28 bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : dbProjects.length === 0 ? (
        <p className="text-white/30 text-sm">Aucun projet pour le moment.</p>
      ) : (
        <div className="space-y-3">
          {dbProjects.map((project) => (
            <div key={project.id} className="p-4 sm:p-5 bg-[#111] rounded-2xl border border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-3">
                <div className="min-w-0 flex-1">
                  <h3 className="text-white font-semibold text-sm sm:text-base">{project.name}</h3>
                  {project.description && (
                    <p className="text-white/40 text-xs sm:text-sm mt-0.5">{project.description}</p>
                  )}
                  <span className="text-white/30 text-xs">{project.images.length} image(s)</span>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEdit(project)}
                    className="flex-1 sm:flex-none px-3 py-1.5 bg-white/5 text-white/60 rounded-lg text-xs sm:text-sm hover:bg-white/10"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(project.id, project.name)}
                    className="flex-1 sm:flex-none px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs sm:text-sm hover:bg-red-500/20"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
              {project.images.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {project.images.map((pi) => (
                    <img
                      key={pi.id}
                      src={pi.image.src}
                      alt={pi.image.alt}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {editingProject && (
        <div className="fixed inset-0 bg-black/80 flex items-end sm:items-center justify-center z-50 sm:p-4">
          <div className="bg-[#111] rounded-t-2xl sm:rounded-2xl border border-white/10 w-full sm:max-w-3xl max-h-[90vh] overflow-auto p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Modifier le projet</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-white/60 text-sm block mb-1">Nom</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#C9A84C]"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm block mb-1">Description</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#C9A84C] resize-none"
                />
              </div>
              <div>
                <label className="text-white/60 text-sm block mb-2">Images ({editImageIds.length})</label>
                <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
                  {editImageIds.map((imageId, index) => {
                    const img = searchResults.find((r) => r.id === imageId) || dbProjects.flatMap((p) => p.images).find((pi) => pi.image.id === imageId)?.image;
                    return (
                      <div key={imageId} className="relative flex-shrink-0">
                        <img
                          src={img?.src || ""}
                          alt=""
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                        />
                        <div className="absolute -top-1 -right-1 flex gap-0.5">
                          {index > 0 && (
                            <button
                              onClick={() => moveImage(index, -1)}
                              className="w-5 h-5 bg-white/20 rounded-full text-[10px] text-white hover:bg-white/30"
                            >
                              ←
                            </button>
                          )}
                          {index < editImageIds.length - 1 && (
                            <button
                              onClick={() => moveImage(index, 1)}
                              className="w-5 h-5 bg-white/20 rounded-full text-[10px] text-white hover:bg-white/30"
                            >
                              →
                            </button>
                          )}
                          <button
                            onClick={() => removeImageFromProject(imageId)}
                            className="w-5 h-5 bg-red-500/50 rounded-full text-[10px] text-white hover:bg-red-500/70"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={() => setShowImagePicker(!showImagePicker)}
                  className="px-4 py-2 bg-white/5 text-white/60 rounded-lg text-sm hover:bg-white/10"
                >
                  + Ajouter des images
                </button>
                {showImagePicker && (
                  <div className="mt-3 p-4 bg-white/5 rounded-xl">
                    <input
                      type="text"
                      placeholder="Rechercher des images..."
                      value={imageSearch}
                      onChange={(e) => {
                        setImageSearch(e.target.value);
                        debouncedSearch(e.target.value);
                      }}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#C9A84C] mb-3"
                    />
                    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-1.5 max-h-64 overflow-auto">
                      {searchResults.map((img) => (
                        <button
                          key={img.id}
                          onClick={() => addImageToProject(img.id)}
                          disabled={editImageIds.includes(img.id)}
                          className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                            editImageIds.includes(img.id)
                              ? "border-[#C9A84C] opacity-50"
                              : "border-transparent hover:border-white/30"
                          }`}
                        >
                          <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setEditingProject(null)}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-white/5 text-white/60 rounded-xl text-sm hover:bg-white/10"
              >
                Annuler
              </button>
              <button
                onClick={handleUpdate}
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
