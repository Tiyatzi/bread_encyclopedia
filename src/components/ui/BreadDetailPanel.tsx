"use client";

import { useAppContext } from "@/store/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import RecipeSteps from "./RecipeSteps";

export default function BreadDetailPanel() {
  const { selectedBread, setSelectedBread } = useAppContext();

  return (
    <AnimatePresence>
      {selectedBread && (
        <motion.div
          key={selectedBread.id}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="pointer-events-auto absolute right-0 top-0 bottom-0 z-20 w-[400px] max-w-[90vw] overflow-y-auto border-l border-white/10 bg-black/70 backdrop-blur-2xl"
        >
          <div className="p-6">
            {/* Close button */}
            <button
              onClick={() => setSelectedBread(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg
                width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Bread name + location */}
            <h2 className="text-2xl font-bold text-white pr-10">
              {selectedBread.name}
            </h2>
            <p className="mt-1 text-sm text-white/50">
              {selectedBread.city}，{selectedBread.country}
            </p>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-400">
                {selectedBread.breadType}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/60">
                {selectedBread.difficulty}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/60">
                {selectedBread.continent}
              </span>
            </div>

            {/* Divider */}
            <div className="my-5 h-px bg-gradient-to-r from-white/15 via-white/10 to-transparent" />

            {/* Description */}
            <p className="text-sm leading-relaxed text-white/70">
              {selectedBread.description}
            </p>

            {/* History */}
            <section className="mt-6">
              <h3 className="flex items-center gap-2 text-base font-semibold text-white">
                <span className="text-amber-400">📖</span> 历史
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {selectedBread.history}
              </p>
            </section>

            {/* Culture */}
            <section className="mt-6">
              <h3 className="flex items-center gap-2 text-base font-semibold text-white">
                <span className="text-amber-400">🌍</span> 文化
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {selectedBread.culture}
              </p>
            </section>

            {/* Divider */}
            <div className="my-5 h-px bg-gradient-to-r from-white/15 via-white/10 to-transparent" />

            {/* Recipe header */}
            <section className="mt-2">
              <h3 className="flex items-center gap-2 text-base font-semibold text-white">
                <span className="text-amber-400">👨‍🍳</span> 制作教程
              </h3>

              {/* Meta info */}
              <div className="mt-3 flex gap-4 text-xs text-white/50">
                <span>⏱ {selectedBread.recipe.time}</span>
                <span>🍽 {selectedBread.recipe.servings}</span>
              </div>

              {/* Ingredients */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-white/80 mb-2">食材清单</h4>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <ul className="space-y-1.5">
                    {selectedBread.recipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center justify-between text-sm">
                        <span className="text-white/70">{ing.name}</span>
                        <span className="text-amber-400/80 font-medium">{ing.amount}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Steps */}
              <div className="mt-5">
                <h4 className="text-sm font-medium text-white/80 mb-3">制作步骤</h4>
                <RecipeSteps steps={selectedBread.recipe.steps} />
              </div>
            </section>

            {/* Bottom spacing for scroll */}
            <div className="h-8" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
