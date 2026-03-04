import { useState, type ReactNode } from "react";
import { LuClock, LuBookOpen } from "react-icons/lu";
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import type { ApiSeries } from "../types/api";

interface LatestUpdatesProps {
  title?: string;
  icon?: ReactNode;
  series: ApiSeries[];
  loading?: boolean;
  showTabs?: boolean;
}

const TABS = ["All Series", "Ongoing", "Completed"];

const LatestUpdates = ({
  title = "Latest Updates",
  icon = <LuBookOpen />,
  series,
  loading = false,
  showTabs = false,
}: LatestUpdatesProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const filtered = series.filter((s) => {
    if (activeTab === 1) return s.status === "ONGOING";
    if (activeTab === 2) return s.status === "COMPLETED";
    return true;
  });

  return (
    <div className="content-shell mb-4">
      <SectionHeader title={title} icon={icon} showViewAll />
      {showTabs && (
        <div className="mb-4 flex gap-2 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.03] p-1.5">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                i === activeTab
                  ? "bg-red-600 text-white"
                  : "text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-200"
              }`}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-zinc-500">
          No series found.
        </p>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((manga) => (
            <Link
              to={`/manga/${manga.slug}`}
              key={manga.id}
              className="flex gap-3 rounded-2xl border border-white/10 bg-[#111114] p-3 transition-all hover:border-white/20"
            >
              <img
                src={manga.coverUrl ?? "/placeholder-cover.jpg"}
                alt={manga.title}
                className="h-[150px] w-[100px] rounded-lg object-cover md:h-[170px] md:w-[114px]"
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="mb-2">
                  <span className="inline-flex rounded-md bg-white/10 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-300">
                    {manga.status}
                  </span>
                </div>
                <h3 className="line-clamp-2 text-sm font-bold text-zinc-100">
                  {manga.title}
                </h3>
                <div className="mt-2 space-y-2">
                  {(manga.chapters ?? []).slice(0, 3).map((chapter) => (
                    <div
                      key={chapter.id}
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-2 py-1.5 text-xs"
                    >
                      <span className="font-semibold text-zinc-200">
                        Chapter {chapter.number}
                        {chapter.title ? ` — ${chapter.title}` : ""}
                      </span>
                      <span className="inline-flex items-center gap-1 text-zinc-500">
                        <LuClock size={11} />{" "}
                        {new Date(chapter.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                  {(manga.chapters ?? []).length === 0 && (
                    <p className="text-[11px] text-zinc-600">No chapters yet</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestUpdates;
