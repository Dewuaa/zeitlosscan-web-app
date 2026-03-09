import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaDiscord } from "react-icons/fa";
import { SiKofi } from "react-icons/si";
import {
  LuChevronLeft,
  LuSearch,
  LuPlay,
  LuPlus,
  LuBell,
  LuTriangleAlert,
  LuArrowDownUp,
} from "react-icons/lu";
import { useSeriesDetail } from "../hooks/useSeriesDetail";
import { Skeleton } from "../components/Skeleton";

const MangaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { series: manga, loading, error } = useSeriesDetail(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="relative min-h-screen pb-20 pt-6 md:pt-[100px]">
        <div className="content-shell mt-10 md:mt-0">
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start space-y-3">
              <Skeleton className="aspect-[2/3] w-full rounded-2xl" />
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-10 rounded-xl bg-white/5" />
                <Skeleton className="h-10 rounded-xl bg-white/5" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 flex-1 rounded-xl bg-white/5" />
                <Skeleton className="h-10 w-10 rounded-xl bg-white/5" />
              </div>
            </aside>
            <section className="space-y-6">
              <Skeleton className="h-10 w-3/4 md:w-1/2 rounded-lg bg-white/10" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-lg bg-white/10" />
                <Skeleton className="h-6 w-20 rounded-lg bg-white/10" />
                <Skeleton className="h-6 w-24 rounded-lg bg-white/10" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-4 w-32 rounded bg-white/5" />
                <Skeleton className="h-24 w-full rounded-xl bg-white/5" />
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-16 rounded-xl bg-white/5" />
                ))}
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 rounded bg-white/5" />
                <Skeleton className="h-24 w-full rounded bg-white/5" />
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  if (error || !manga) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center text-zinc-100">
        <h2 className="text-2xl font-black">Manga not found...</h2>
        <Link to="/" className="mt-4 font-bold text-red-400">
          Go Home
        </Link>
      </div>
    );
  }

  const chapters = manga.chapters ?? [];

  const pillButton =
    "group relative inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-zinc-300 transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-zinc-100";

  return (
    <div className="relative min-h-screen pb-20 pt-6 md:pt-[100px]">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center opacity-30 blur-3xl"
        style={{ backgroundImage: `url(${manga.coverUrl ?? ""})` }}
      />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[#030304]/60 via-[#030304]/90 to-[#030304]" />

      <div className="content-shell">
        <div className="mb-3 flex items-center justify-between md:hidden">
          <Link
            to="/"
            aria-label="Back to home"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition-colors hover:bg-white/[0.08]"
          >
            <LuChevronLeft size={20} />
          </Link>
          <h2 className="text-base font-bold text-zinc-100">Zeitlos Scan</h2>
          <button
            type="button"
            aria-label="Open search"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition-colors hover:bg-white/[0.08]"
            onClick={() =>
              window.dispatchEvent(new Event("open-command-palette"))
            }
          >
            <LuSearch size={18} />
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <img
                src={manga.coverUrl ?? ""}
                alt={manga.title}
                className="aspect-[2/3] w-full object-cover"
                loading="eager"
              />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {chapters.length > 0 ? (
                <>
                  <Link
                    to={`/read/${chapters[chapters.length - 1].id}`}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-3 py-2 text-xs font-bold text-white shadow-[0_12px_28px_rgba(229,9,20,0.35)] transition-colors hover:bg-red-500"
                  >
                    <LuPlay size={14} className="fill-white transition-transform group-hover:scale-110" />
                    <span>Start Reading</span>
                  </Link>
                  <Link to={`/read/${chapters[0].id}`} className={pillButton}>
                    <LuPlay size={14} className="fill-zinc-300 transition-transform group-hover:scale-110 group-hover:fill-zinc-100" />
                    <span>Latest Chapter</span>
                  </Link>
                </>
              ) : (
                <span className="col-span-2 text-xs text-zinc-500 text-center py-2">
                  No chapters yet
                </span>
              )}
            </div>

            <div className="mt-2 flex gap-2">
              <button type="button" className={`${pillButton} flex-1`}>
                <LuPlus size={16} className="transition-transform group-hover:scale-110" />
                <span>Add to Library</span>
              </button>
              <button
                type="button"
                aria-label="Enable chapter notifications"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                <LuBell size={18} className="transition-transform group-hover:scale-110 group-hover:fill-white/20" />
              </button>
            </div>
          </aside>

          <section>
            <h1 className="text-3xl font-black tracking-[-0.04em] text-zinc-100 md:text-4xl">
              {manga.title}
            </h1>
            <div className="mt-3 flex flex-wrap gap-2">
              {(manga.genres.length > 0
                ? manga.genres
                : ["Drama", "Fantasy", "Romance"]
              ).map((g, i) => (
                <span
                  key={i}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] font-semibold text-zinc-400"
                >
                  {g.trim()}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="mb-2 text-xs font-extrabold uppercase tracking-[0.1em] text-zinc-500">
                Alternative titles
              </h3>
              <p className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-relaxed text-zinc-500">
                无能继母备受家族宠爱！
                <br />
                Tuy Là Một Người Mẹ Kế Vô Dụng, Nhưng The Beloved Incompetent
                Stepmom
                <br />
                Munou na Keibo desu ga, Kazoku no Dekiai ga Tomari
                <br />
                {manga.title}
              </p>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Author", manga.author ?? "Unknown"],
                ["Artist", manga.artist ?? "Unknown"],
                ["Status", manga.status],
                [
                  "Updated",
                  manga.updatedAt
                    ? new Date(manga.updatedAt).toLocaleDateString()
                    : "—",
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-3"
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500">
                    {label}
                  </span>
                  <div className="mt-1 text-sm font-bold text-zinc-100">
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="mb-2 text-xs font-extrabold uppercase tracking-[0.1em] text-zinc-500">
                Synopsis
              </h3>
              <div className="relative max-h-32 overflow-hidden text-sm leading-relaxed text-zinc-300">
                <p>{manga.description ?? "No description available."}</p>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#030304] to-transparent" />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <div className="min-w-0 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                    <LuTriangleAlert size={18} />
                  </div>
                  <div>
                    <strong className="block text-sm text-zinc-100">
                      Facing an Issue?
                    </strong>
                    <span className="text-xs text-zinc-500">
                      Let us know, and we’ll help ASAP.
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-300 transition-colors hover:bg-red-500/20"
                >
                  Report
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <div className="min-w-0 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                    <FaDiscord size={20} />
                  </div>
                  <div>
                    <strong className="block text-sm text-zinc-100">
                      Join Our Socials
                    </strong>
                    <span className="text-xs text-zinc-500">to explore more</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-xs font-bold text-indigo-300 transition-colors hover:bg-indigo-500/20"
                >
                  Join Server
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <div className="min-w-0 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                    <SiKofi size={18} />
                  </div>
                  <div>
                    <strong className="block text-sm text-zinc-100">
                      Donate Us
                    </strong>
                    <span className="text-xs text-zinc-500">to support us</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-xs font-bold text-cyan-300 transition-colors hover:bg-cyan-500/20"
                >
                  Support
                </button>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <div className="group flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 focus-within:border-white/20 focus-within:bg-white/[0.05] transition-colors">
                <LuSearch size={18} className="text-zinc-500 transition-colors group-focus-within:text-zinc-300" />
                <input
                  className="h-10 w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
                  type="text"
                  placeholder="Search chapter by number."
                />
              </div>
              <button
                type="button"
                aria-label="Sort chapters"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                <LuArrowDownUp size={18} />
              </button>
            </div>

            <div className="mt-3 space-y-2">
              {chapters.length === 0 && (
                <p className="text-sm text-zinc-500 py-4 text-center">
                  No chapters uploaded yet.
                </p>
              )}
              {chapters.map((ch) => (
                <Link
                  to={`/read/${ch.id}`}
                  key={ch.id}
                  className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3 transition-all hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <div>
                    <strong className="text-sm text-zinc-100 transition-colors group-hover:text-red-400">
                      Chapter {ch.number}
                      {ch.title ? ` — ${ch.title}` : ""}
                    </strong>
                    <p className="text-xs text-zinc-500">
                      {new Date(ch.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.03] text-zinc-400 opacity-0 transition-all group-hover:opacity-100 group-hover:bg-red-500/20 group-hover:text-red-400">
                    <LuPlay size={14} className="fill-current ml-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MangaDetail;
