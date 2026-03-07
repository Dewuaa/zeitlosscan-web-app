import SectionHeader from "./SectionHeader";
import { LuFlame } from "react-icons/lu";
import { Link } from "react-router-dom";
import type { ApiSeries } from "../types/api";

const PopularMangas = ({ series }: { series: ApiSeries[] }) => {
  if (series.length === 0) return null;

  return (
    <div className="content-shell">
      <SectionHeader
        title="Trending"
        icon={<LuFlame color="var(--accent-hot)" />}
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {series.map((manga, index) => (
          <Link
            to={`/manga/${manga.slug}`}
            key={manga.id}
            className="group overflow-hidden rounded-xl border border-white/10 bg-[#111114] transition-all hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
          >
            <div className="relative">
              <img
                src={manga.coverUrl || "/placeholder-cover.jpg"}
                alt={manga.title}
                className="aspect-[2/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-2 top-2 inline-flex h-7 min-w-7 items-center justify-center rounded-md bg-red-600/90 px-2 text-xs font-extrabold text-white">
                {index + 1}
              </span>
            </div>
            <div className="space-y-1 p-3">
              <h4 className="line-clamp-2 text-sm font-bold text-zinc-100 transition-colors group-hover:text-red-300">
                {manga.title}
              </h4>
              <span className="line-clamp-1 text-xs text-zinc-500">
                {manga.genres?.join(", ")}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularMangas;
