"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from "react";
import breads, { BreadData } from "@/data/breads";
import earthTextures from "@/data/earthTextures";
import backgrounds, { Background } from "@/data/backgrounds";
import { assetPath } from "@/lib/basePath";

export type ContinentFilter = "全部" | string;
export type TypeFilter = "全部" | string;
export type DifficultyFilter = "全部" | string;

interface AppContextValue {
  selectedBreadId: string | null;
  selectedBread: BreadData | null;
  continentFilter: ContinentFilter;
  typeFilter: TypeFilter;
  difficultyFilter: DifficultyFilter;
  setSelectedBread: (id: string | null) => void;
  setContinentFilter: (filter: ContinentFilter) => void;
  setTypeFilter: (filter: TypeFilter) => void;
  setDifficultyFilter: (filter: DifficultyFilter) => void;
  filteredBreads: BreadData[];
  visibleCount: number;
  totalCount: number;
  earthTextureId: string;
  earthTexturePath: string;
  setEarthTextureId: (id: string) => void;
  backgroundId: string;
  background: Background;
  setBackgroundId: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedBreadId, setSelectedBreadId] = useState<string | null>(null);
  const [continentFilter, setContinentFilter] = useState<ContinentFilter>("全部");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("全部");
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("全部");
  const [earthTextureId, setEarthTextureId] = useState(earthTextures[0].id);
  const [backgroundId, setBackgroundId] = useState(backgrounds[0].id);

  const filteredBreads = useMemo(() => {
    return breads.filter((bread) => {
      if (continentFilter !== "全部" && bread.continent !== continentFilter)
        return false;
      if (typeFilter !== "全部" && bread.breadType !== typeFilter)
        return false;
      if (difficultyFilter !== "全部" && bread.difficulty !== difficultyFilter)
        return false;
      return true;
    });
  }, [continentFilter, typeFilter, difficultyFilter]);

  const selectedBread = useMemo(
    () => (selectedBreadId ? breads.find((b) => b.id === selectedBreadId) ?? null : null),
    [selectedBreadId]
  );

  const earthTexturePath = useMemo(
    () => assetPath(earthTextures.find((t) => t.id === earthTextureId)?.path ?? earthTextures[0].path),
    [earthTextureId]
  );

  const background = useMemo(
    () => backgrounds.find((s) => s.id === backgroundId) ?? backgrounds[0],
    [backgroundId]
  );

  const value = useMemo<AppContextValue>(
    () => ({
      selectedBreadId,
      selectedBread,
      continentFilter,
      typeFilter,
      difficultyFilter,
      setSelectedBread: setSelectedBreadId,
      setContinentFilter,
      setTypeFilter,
      setDifficultyFilter,
      filteredBreads,
      visibleCount: filteredBreads.length,
      totalCount: breads.length,
      earthTextureId,
      earthTexturePath,
      setEarthTextureId,
      backgroundId,
      background,
      setBackgroundId,
    }),
    [
      selectedBreadId,
      selectedBread,
      continentFilter,
      typeFilter,
      difficultyFilter,
      filteredBreads,
      earthTextureId,
      earthTexturePath,
      backgroundId,
      background,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}

export function getFilterOptions() {
  const continents = [...new Set(breads.map((b) => b.continent))];
  const types = [...new Set(breads.map((b) => b.breadType))];
  const difficulties = [...new Set(breads.map((b) => b.difficulty))];
  return { continents, types, difficulties };
}
