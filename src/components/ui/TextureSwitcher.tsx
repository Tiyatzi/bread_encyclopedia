"use client";

import { useAppContext } from "@/store/AppContext";
import earthTextures from "@/data/earthTextures";
import { motion } from "framer-motion";

export default function TextureSwitcher() {
  const { earthTextureId, setEarthTextureId } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      className="pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2"
    >
      <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur-2xl">
        {earthTextures.map((tex) => (
          <button
            key={tex.id}
            onClick={() => setEarthTextureId(tex.id)}
            title={tex.name}
            className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
              earthTextureId === tex.id
                ? "bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/40"
                : "text-white/50 hover:bg-white/5 hover:text-white/80"
            }`}
          >
            {tex.name}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
