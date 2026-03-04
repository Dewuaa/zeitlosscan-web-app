import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LuClock } from "react-icons/lu";
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import type { ApiSeries } from "../types/api";

interface PinnedSeriesProps {
  series: ApiSeries[];
  loading?: boolean;
}

const PinnedSeries = ({ series, loading = false }: PinnedSeriesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="content-shell">
      <SectionHeader title="Pinned Series" icon="📌" showViewAll />

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : series.length === 0 ? (
        <p className="py-8 text-center text-sm text-zinc-500">
          No series pinned yet.
        </p>
      ) : (
        <div className="relative max-w-full overflow-x-hidden">
          <button
            type="button"
            aria-label="Scroll left"
            className="absolute left-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/70 text-zinc-200 backdrop-blur md:inline-flex"
            onClick={() => scroll("left")}
          >
            <FaChevronLeft size={12} />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            className="absolute right-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/70 text-zinc-200 backdrop-blur md:inline-flex"
            onClick={() => scroll("right")}
          >
            <FaChevronRight size={12} />
          </button>

          <div
            className="flex snap-x gap-3 overflow-x-auto pb-2"
            ref={scrollRef}
          >
            {series.map((manga) => (
              <Link
                to={`/manga/${manga.slug}`}
                key={manga.id}
                className="w-[82vw] max-w-[310px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-[#111114] transition-all hover:border-white/20"
              >
                <img
                  src={manga.coverUrl ?? "/placeholder-cover.jpg"}
                  alt={manga.title}
                  className="h-[180px] w-full object-cover"
                />
                <div className="space-y-2 p-3">
                  <h4 className="line-clamp-1 text-sm font-bold text-zinc-100">
                    {manga.title}
                  </h4>
                  {(manga.chapters ?? []).map((ch) => (
                    <div
                      key={ch.id}
                      className="rounded-lg border border-white/10 bg-white/[0.02] px-2 py-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-zinc-200">
                          Chapter {ch.number}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500">
                          <LuClock size={9} />{" "}
                          {new Date(ch.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  {(manga.chapters ?? []).length === 0 && (
                    <p className="text-[11px] text-zinc-600">No chapters yet</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PinnedSeries;
