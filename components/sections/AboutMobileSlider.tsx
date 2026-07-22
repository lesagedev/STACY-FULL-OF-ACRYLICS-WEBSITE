"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SHOOTING_PHOTOS } from "@/lib/data";

const PHOTOS = [SHOOTING_PHOTOS[0], SHOOTING_PHOTOS[1], SHOOTING_PHOTOS[4]];

const slide = {
  enter: (dir: number) => ({ x: dir > 0 ? 120 : -120, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -120 : 120, opacity: 0 }),
};

export function AboutMobileSlider() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const iv = setInterval(() => {
      setIdx(p => {
        const next = (p + 1) % PHOTOS.length;
        setDir(next > p ? 1 : -1);
        return next;
      });
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="md:hidden w-full rounded-2xl overflow-hidden border border-[var(--border-card)] aspect-[4/5] max-h-[45vh] relative">
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={idx}
          custom={dir}
          variants={slide}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          className="absolute inset-0"
        >
          <Image src={PHOTOS[idx].src} alt="" fill className="object-cover object-top" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}