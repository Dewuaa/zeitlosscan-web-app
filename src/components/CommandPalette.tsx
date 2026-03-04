import { useEffect, useState } from "react";
import { Command } from "cmdk";
import {
  LuSearch,
  LuFlame,
  LuHistory,
  LuBookOpen,
  LuSettings,
} from "react-icons/lu";

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);

  // Toggle with CMD+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);

    const openPalette = () => setOpen(true);
    window.addEventListener("open-command-palette", openPalette);

    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", openPalette);
    };
  }, []);

  return (
    <div data-open={open}>
      {open && (
        <Command.Dialog
          open={open}
          onOpenChange={setOpen}
          label="Global Search"
          className="fixed left-1/2 top-24 z-[120] w-[min(680px,calc(100vw-1rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0d]/95 text-zinc-100 shadow-[0_24px_64px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
        >
          <div className="relative border-b border-white/10 p-4">
            <LuSearch className="pointer-events-none absolute left-9 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
            <Command.Input
              placeholder="Search series, authors, or jump to..."
              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-3 text-sm outline-none placeholder:text-zinc-500 focus:border-red-500/60"
            />
          </div>

          <Command.List className="max-h-[420px] overflow-y-auto p-2">
            <Command.Empty className="p-4 text-sm text-zinc-500">
              No results found.
            </Command.Empty>

            <Command.Group heading="Trending Now" className="mb-2">
              <div className="px-2 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-500">
                Trending Now
              </div>
              <Command.Item className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-white/[0.06]">
                <LuFlame /> I'm a Worthless Stepmother{" "}
                <span className="kbd-shortcut">#1</span>
              </Command.Item>
              <Command.Item className="flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm hover:bg-white/[0.06]">
                <LuFlame /> I Can't Stop Dating the Evil Duke
              </Command.Item>
              <Command.Item className="flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm hover:bg-white/[0.06]">
                <LuFlame /> The Legendary Assassin
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Navigation" className="mb-2">
              <div className="px-2 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-500">
                Navigation
              </div>
              <Command.Item className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-white/[0.06]">
                <LuBookOpen /> Library <span className="kbd-shortcut">G L</span>
              </Command.Item>
              <Command.Item className="flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm hover:bg-white/[0.06]">
                <LuHistory /> History
              </Command.Item>
              <Command.Item className="flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm hover:bg-white/[0.06]">
                <LuSettings /> Settings
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Recent">
              <div className="px-2 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-500">
                Recent
              </div>
              <Command.Item className="cursor-pointer rounded-lg px-3 py-2 text-sm hover:bg-white/[0.06]">
                The Remarried Empress (Ch. 124)
              </Command.Item>
              <Command.Item className="cursor-pointer rounded-lg px-3 py-2 text-sm hover:bg-white/[0.06]">
                Solo Leveling (Ch. 1)
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command.Dialog>
      )}
    </div>
  );
};
