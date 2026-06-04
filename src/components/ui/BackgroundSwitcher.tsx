"use client";

import { useAppContext } from "@/store/AppContext";
import backgrounds from "@/data/backgrounds";
import { motion } from "framer-motion";

export default function BackgroundSwitcher() {
  const { backgroundId, setBackgroundId } = useAppContext();

  if (backgrounds.length <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      className="pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2"
    >
      <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur-2xl">
        {backgrounds.map((bg) => (
          <button
            key={bg.id}
            onClick={() => setBackgroundId(bg.id)}
            title={bg.name}
            className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
              backgroundId === bg.id
                ? "bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/40"
                : "text-white/50 hover:bg-white/5 hover:text-white/80"
            }`}
          >
            {bg.name}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
