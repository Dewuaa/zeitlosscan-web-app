import SectionHeader from "./SectionHeader";
import type { ReactNode } from "react";
import type { Manga } from "../data";

interface MangaRowProps {
  title: string;
  icon?: ReactNode;
  mangas: Manga[];
  showCompleted?: boolean;
}

const MangaRow = ({
  title,
  icon,
  mangas,
  showCompleted = false,
}: MangaRowProps) => {
  return (
    <div className="content-shell">
      <SectionHeader title={title} icon={icon} showViewAll />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {mangas.map((manga) => (
          <div
            key={manga.id}
            className="group overflow-hidden rounded-xl border border-white/10 bg-[#111114] transition-all hover:-translate-y-1 hover:border-white/20"
          >
            <div className="relative">
              <img
                src={manga.cover}
                alt={manga.title}
                className="aspect-[2/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {showCompleted && (
                <span className="absolute left-2 top-2 rounded-md bg-emerald-500/90 px-2 py-1 text-[11px] font-bold text-white">
                  Completed
                </span>
              )}
            </div>
            <h4 className="line-clamp-2 px-3 pt-3 text-sm font-bold text-zinc-100">
              {manga.title}
            </h4>
            {manga.genres && (
              <span className="line-clamp-1 px-3 pb-3 text-xs text-zinc-500">
                {manga.genres}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MangaRow;
