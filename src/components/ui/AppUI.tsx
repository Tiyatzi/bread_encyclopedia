"use client";

import TopStats from "./TopStats";
import BreadDetailPanel from "./BreadDetailPanel";
import ControlPanel from "./ControlPanel";
import TextureSwitcher from "./TextureSwitcher";
import BackgroundSwitcher from "./BackgroundSwitcher";

export default function AppUI() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      <TopStats />
      <BreadDetailPanel />
      <ControlPanel />
      <TextureSwitcher />
      <BackgroundSwitcher />
    </div>
  );
}
