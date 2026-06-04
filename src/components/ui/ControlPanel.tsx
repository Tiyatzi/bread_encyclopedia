"use client";

import { useAppContext, getFilterOptions } from "@/store/AppContext";
import type { ContinentFilter, TypeFilter, DifficultyFilter } from "@/store/AppContext";
import { motion } from "framer-motion";

const { continents, types, difficulties } = getFilterOptions();

const continentTabs: ContinentFilter[] = ["全部", ...continents];

export default function ControlPanel() {
  const {
    continentFilter,
    typeFilter,
    difficultyFilter,
    setContinentFilter,
    setTypeFilter,
    setDifficultyFilter,
  } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="pointer-events-auto absolute bottom-0 left-0 right-0 z-10 px-4 pb-4"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur-2xl">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {/* Continent tabs */}
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs font-medium tracking-wide text-white/50">
              大洲
            </span>
            <div className="flex gap-1">
              {continentTabs.map((c) => (
                <button
                  key={c}
                  onClick={() => setContinentFilter(c)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                    continentFilter === c
                      ? "bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/40"
                      : "text-white/50 hover:bg-white/5 hover:text-white/80"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Separator */}
          <div className="h-5 w-px bg-white/10" />

          {/* Type filter */}
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs font-medium tracking-wide text-white/50">
              类型
            </span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
              className="appearance-none rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 outline-none transition-colors hover:border-white/20 focus:border-amber-500/40"
            >
              <option value="全部" className="bg-zinc-900">
                全部类型
              </option>
              {types.map((t) => (
                <option key={t} value={t} className="bg-zinc-900">
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty filter */}
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs font-medium tracking-wide text-white/50">
              难度
            </span>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value as DifficultyFilter)}
              className="appearance-none rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 outline-none transition-colors hover:border-white/20 focus:border-amber-500/40"
            >
              <option value="全部" className="bg-zinc-900">
                全部难度
              </option>
              {difficulties.map((d) => (
                <option key={d} value={d} className="bg-zinc-900">
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
