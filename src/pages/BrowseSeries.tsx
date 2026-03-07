import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { LuSearch, LuChevronDown, LuSearchX } from "react-icons/lu";
import { useSeriesList } from "../hooks/useSeriesList";

const STATUS_FILTERS = [
  "All",
  "ONGOING",
  "COMPLETED",
  "HIATUS",
  "CANCELLED",
] as const;
type SortOption = "a-z" | "z-a" | "newest";

const BrowseSeries = () => {
  const { series, total, loading, error } = useSeriesList(1, 100);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sort, setSort] = useState<SortOption>("a-z");

  const filtered = useMemo(() => {
    let results = [...series];

    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.genres.some((g) => g.toLowerCase().includes(q)) ||
          s.author?.toLowerCase().includes(q),
      );
    }

    if (statusFilter !== "All") {
      results = results.filter((s) => s.status === statusFilter);
    }

    switch (sort) {
      case "a-z":
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        results.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "newest":
        results.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
    }

    return results;
  }, [series, search, statusFilter, sort]);

  return (
    <main className="min-h-screen pt-[76px] md:pt-[90px] pb-20">
      <div className="content-shell">
        <div className="mb-6">
          <h1 className="text-3xl font-black tracking-[-0.03em] text-zinc-100 md:text-4xl">
            Browse Series
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            {loading ? "Loading…" : `${total} series available`}
          </p>
        </div>

        <div className="relative mb-5">
          <LuSearch
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />
          <input
            type="text"
            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-red-500/50"
            placeholder="Search by title, genre or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-2">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${statusFilter === s ? "bg-red-600 text-white" : "text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-200"}`}
              onClick={() => setStatusFilter(s)}
            >
              {s === "All" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}

          <div className="relative ml-auto w-full md:w-auto">
            <select
              className="h-9 w-full appearance-none rounded-lg border border-white/10 bg-white/[0.03] px-3 pr-8 text-xs font-semibold text-zinc-300 outline-none"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
            >
              <option value="a-z">A → Z</option>
              <option value="z-a">Z → A</option>
              <option value="newest">Newest</option>
            </select>
            <LuChevronDown
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500"
              size={14}
            />
          </div>
        </div>

        <div className="mb-4 text-xs font-semibold text-zinc-500">
          {filtered.length} series found
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-zinc-400">{error}</div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
            {filtered.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] py-20 text-center">
                <LuSearchX size={48} className="text-zinc-600" />
                <h3 className="mt-3 text-lg font-bold text-zinc-100">
                  No series found
                </h3>
                <p className="mt-1 text-sm text-zinc-500">
                  Try adjusting your filters or search query
                </p>
              </div>
            ) : (
              filtered.map((s) => (
                <Link
                  to={`/manga/${s.slug}`}
                  key={s.id}
                  className="group overflow-hidden rounded-xl border border-white/10 bg-[#111114] transition-all hover:-translate-y-1 hover:border-white/20"
                >
                  <div className="relative">
                    {s.coverUrl ? (
                      <img
                        src={s.coverUrl}
                        alt={s.title}
                        className="aspect-[2/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="aspect-[2/3] w-full bg-zinc-800 flex items-center justify-center text-zinc-600 text-xs">
                        No Cover
                      </div>
                    )}
                    <div className="absolute left-2 right-2 top-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.08em]">
                      <span
                        className={`rounded-md px-1.5 py-1 ${
                          s.status === "COMPLETED"
                            ? "bg-amber-500/20 text-amber-300"
                            : s.status === "HIATUS"
                              ? "bg-zinc-500/20 text-zinc-300"
                              : "bg-emerald-500/20 text-emerald-300"
                        }`}
                      >
                        {s.status === "ONGOING"
                          ? "ON"
                          : s.status === "COMPLETED"
                            ? "END"
                            : s.status.slice(0, 3)}
                      </span>
                      {s._count && (
                        <span className="rounded-md bg-black/60 px-1.5 py-1 text-zinc-300">
                          {s._count.chapters} ch
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1 p-3">
                    <h3 className="line-clamp-2 text-sm font-bold text-zinc-100 transition-colors group-hover:text-red-300">
                      {s.title}
                    </h3>
                    {s.genres.length > 0 && (
                      <span className="line-clamp-1 text-xs text-zinc-500">
                        {s.genres.slice(0, 3).join(", ")}
                      </span>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default BrowseSeries;
