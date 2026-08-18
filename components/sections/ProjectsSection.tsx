"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

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
  images: ProjectImage[];
}

export function ProjectsSection() {
  const [lbProject, setLbProject] = useState<number | null>(null);
  const [lbPhoto, setLbPhoto] = useState(0);
  const [projects, setProjects] = useState<DbProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-16 md:py-24 bg-[var(--bg-secondary)] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-48 bg-[var(--bg-card)] rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="py-16 md:py-24 bg-[var(--bg-secondary)] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={{ hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            className="font-accent inline-flex items-center gap-2 rounded-full border border-[var(--border-card)] bg-[var(--bg-glass)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            Projets
          </motion.span>

          <motion.h2
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { delay: 0.1 } } }}
            className="mt-6 font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)]"
          >
            Mes <span className="gradient-text">projets</span>
          </motion.h2>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { delay: 0.15 } } }}
            className="mt-2 text-[var(--text-secondary)]"
          >
            Du début à la fin, chaque projet raconte une histoire.
          </motion.p>

          <div className="mt-10 space-y-12">
            {projects.map((project, pIdx) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
                }}
                className="rounded-2xl glass-card border border-[var(--border-card)] p-5 md:p-8"
              >
                <h3 className="font-hero text-2xl md:text-3xl text-[var(--text-primary)]">{project.name}</h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">{project.description}</p>

                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {project.images.map((pi, i) => (
                    <div
                      key={pi.id}
                      className="group relative cursor-pointer"
                      onClick={() => { setLbProject(pIdx); setLbPhoto(i); }}
                    >
                      <div className="relative overflow-hidden rounded-xl border border-[var(--border-card)] aspect-[3/4]">
                        <Image
                          src={pi.image.src}
                          alt={pi.image.alt}
                          fill
                          sizes="(max-width: 768px) 50vw, 16vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="rounded-full bg-white/20 backdrop-blur-sm p-2">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <span className={`h-2 w-2 rounded-full ${i === 0 ? "bg-red-400" : i === project.images.length - 1 ? "bg-green-400" : "bg-[var(--accent)]/50"}`} />
                        <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{pi.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {lbProject !== null && (
        <Lightbox
          open
          close={() => setLbProject(null)}
          index={lbPhoto}
          slides={projects[lbProject].images.map((pi) => ({ src: pi.image.src, alt: pi.image.alt }))}
        />
      )}
    </section>
  );
}
