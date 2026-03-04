import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaDiscord } from "react-icons/fa";
import { SiKofi } from "react-icons/si";
import { useSeriesDetail } from "../hooks/useSeriesDetail";

const MangaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { series: manga, loading, error } = useSeriesDetail(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
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
    "inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-zinc-300 transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-zinc-100";

  return (
    <div className="relative min-h-screen pb-20 pt-[84px] md:pt-[100px]">
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h2 className="text-base font-bold text-zinc-100">Necro Scans</h2>
          <button
            type="button"
            aria-label="Open search"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]"
            onClick={() =>
              window.dispatchEvent(new Event("open-command-palette"))
            }
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
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
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-3 py-2 text-xs font-bold text-white shadow-[0_12px_28px_rgba(229,9,20,0.35)] hover:bg-red-500"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <polygon points="6 3 20 12 6 21 6 3"></polygon>
                    </svg>
                    <span>Start Reading</span>
                  </Link>
                  <Link to={`/read/${chapters[0].id}`} className={pillButton}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <polygon points="6 3 20 12 6 21 6 3"></polygon>
                    </svg>
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
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Add to Library</span>
              </button>
              <button
                type="button"
                aria-label="Enable chapter notifications"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.08]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 16v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-5 4c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z" />
                </svg>
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
                <div className="min-w-0">
                  <strong className="block text-sm text-zinc-100">
                    Facing an Issue?
                  </strong>
                  <span className="text-xs text-zinc-500">
                    Let us know, and we’ll help ASAP.
                  </span>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-300"
                >
                  Report
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <div>
                  <strong className="block text-sm text-zinc-100">
                    Join Our Socials
                  </strong>
                  <span className="text-xs text-zinc-500">to explore more</span>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-xs font-bold text-indigo-300"
                >
                  <FaDiscord size={16} /> Discord
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <div>
                  <strong className="block text-sm text-zinc-100">
                    Donate Us
                  </strong>
                  <span className="text-xs text-zinc-500">to support us</span>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-xs font-bold text-cyan-300"
                >
                  <SiKofi size={16} /> Ko-Fi
                </button>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-500"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  className="h-10 w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
                  type="text"
                  placeholder="Search chapter by number."
                />
              </div>
              <button
                type="button"
                aria-label="Sort chapters"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
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
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 transition-all hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <div>
                    <strong className="text-sm text-zinc-100">
                      Chapter {ch.number}
                      {ch.title ? ` — ${ch.title}` : ""}
                    </strong>
                    <p className="text-xs text-zinc-500">
                      {new Date(ch.publishedAt).toLocaleDateString()}
                    </p>
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
