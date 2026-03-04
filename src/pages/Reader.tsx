import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  LuArrowLeft,
  LuChevronLeft,
  LuChevronRight,
  LuAlignJustify,
  LuSettings,
  LuMessageSquare,
} from "react-icons/lu";
import { useReader } from "../hooks/useReader";

const BASE_URL =
  import.meta.env.VITE_API_URL?.replace("/api", "") ?? "http://localhost:3001";

const READER_WIDTH_MODES = [
  { label: "Focus", maxWidth: 760 },
  { label: "Balanced", maxWidth: 820 },
  { label: "Wide", maxWidth: 940 },
];

const Reader = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useReader(chapterId);
  const [showUI, setShowUI] = useState(true);
  const [showChapterJump, setShowChapterJump] = useState(false);
  const [chapterInput, setChapterInput] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [widthMode, setWidthMode] = useState(1);
  const lastScrollY = useRef(0);

  const goNext = useCallback(() => {
    if (data?.next) navigate(`/read/${data.next.id}`);
  }, [data, navigate]);

  const goPrev = useCallback(() => {
    if (data?.prev) navigate(`/read/${data.prev.id}`);
  }, [data, navigate]);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const maxScrollable = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    setScrollProgress(
      Math.min(100, Math.max(0, (currentScrollY / maxScrollable) * 100)),
    );

    if (Math.abs(currentScrollY - lastScrollY.current) > 50) {
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowUI(false);
      } else if (currentScrollY < lastScrollY.current) {
        setShowUI(true);
      }
      lastScrollY.current = currentScrollY;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" || target?.tagName === "TEXTAREA";

      if (isTyping) {
        return;
      }

      if (event.key === "ArrowRight") {
        goNext();
      } else if (event.key === "ArrowLeft") {
        goPrev();
      } else if (event.key.toLowerCase() === "h") {
        setShowUI((prev) => !prev);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setShowUI(true);
    setShowChapterJump(false);
    setChapterInput("");
    setScrollProgress(0);
  }, [chapterId]);

  const toggleUI = () => setShowUI((prev) => !prev);

  const cycleWidthMode = () => {
    setWidthMode((prev) => (prev + 1) % READER_WIDTH_MODES.length);
  };

  const goToChapter = () => {
    // Chapter jump by number is not supported in chapterId-based routing
    // (would require fetching chapter list); just close the panel
    setShowChapterJump(false);
    setChapterInput("");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-zinc-200">
        <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center text-zinc-200">
        Chapter not found.
      </div>
    );
  }

  const { chapter: ch, prev, next } = data;

  return (
    <div className="min-h-screen bg-black pb-14">
      <header
        className={`fixed left-0 right-0 top-0 z-[100] flex h-14 items-center justify-between border-b border-white/10 bg-black/85 px-3 backdrop-blur-2xl transition-all md:h-[60px] md:px-5 ${showUI ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}
      >
        <div className="flex min-w-0 items-center gap-2 md:gap-3">
          <Link
            to={`/manga/${ch.series?.slug ?? ""}`}
            aria-label="Back to manga details"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-100"
          >
            <LuArrowLeft size={20} />
          </Link>
          <div className="min-w-0">
            <span className="block truncate text-xs font-bold text-zinc-100 md:text-sm">
              {ch.series?.title ?? ""}
            </span>
            <span className="text-[11px] font-semibold text-zinc-500">
              Chapter {ch.number}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Toggle chapter jump panel"
            className={`inline-flex h-9 items-center justify-center gap-1 rounded-xl border px-2 text-xs font-semibold transition-all md:px-3 ${showChapterJump ? "border-white/25 bg-white/[0.1] text-zinc-100" : "border-white/10 bg-white/[0.03] text-zinc-300"}`}
            onClick={() => setShowChapterJump((prev) => !prev)}
          >
            <LuAlignJustify size={14} />
            <span className="hidden md:inline">Chapters</span>
          </button>

          <button
            type="button"
            aria-label="Cycle reader width mode"
            className="inline-flex h-9 items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] px-2 text-xs font-semibold text-zinc-300 md:px-3"
            onClick={cycleWidthMode}
          >
            <LuSettings size={14} />
            <span className="hidden md:inline">
              {READER_WIDTH_MODES[widthMode].label}
            </span>
          </button>
        </div>
      </header>

      <div
        className={`fixed left-0 right-0 top-14 z-[101] h-0.5 bg-white/10 transition-all md:top-[60px] ${showUI ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <span
          className="block h-full bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_12px_rgba(229,9,20,0.55)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div
        className={`fixed left-1/2 z-[102] flex w-[calc(100%-1rem)] max-w-md -translate-x-1/2 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0a0a0c]/90 p-2 backdrop-blur-xl transition-all md:w-auto ${showChapterJump && showUI ? "top-16 opacity-100 md:top-[70px]" : "pointer-events-none top-12 opacity-0"}`}
      >
        <span className="hidden text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500 md:inline">
          Jump to chapter
        </span>
        <input
          className="h-9 w-20 rounded-lg border border-white/10 bg-white/[0.03] px-2 text-center text-sm text-zinc-100 outline-none focus:border-red-500/60"
          type="number"
          value={chapterInput}
          onChange={(event) => setChapterInput(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && goToChapter()}
          placeholder="#"
        />
        <button
          type="button"
          aria-label="Go to chapter"
          className="h-9 rounded-lg border border-red-500/30 bg-red-500/10 px-3 text-xs font-bold text-red-300 hover:bg-red-500/20"
          onClick={goToChapter}
        >
          Go
        </button>
      </div>

      <div
        className="mx-auto pt-[62px] md:pt-[68px]"
        style={{ maxWidth: `${READER_WIDTH_MODES[widthMode].maxWidth}px` }}
      >
        <div className="w-full cursor-pointer" onClick={toggleUI}>
          {ch.pages.map((page) => (
            <img
              key={page.pageNumber}
              src={
                page.imageUrl.startsWith("http")
                  ? page.imageUrl
                  : `${BASE_URL}${page.imageUrl}`
              }
              alt={`Page ${page.pageNumber}`}
              className="w-full select-none"
              loading="lazy"
            />
          ))}
        </div>

        <div className="flex w-full flex-col items-center bg-gradient-to-b from-transparent to-[#030304]/80 px-4 py-10 text-center">
          <p className="mb-4 text-sm text-zinc-500">
            You've reached the end of Chapter {ch.number}
          </p>
          <button
            type="button"
            aria-label="Next chapter"
            className="mb-8 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(229,9,20,0.4)] transition-all hover:-translate-y-0.5 hover:bg-red-500 disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={goNext}
            disabled={!next}
          >
            Next Chapter <LuChevronRight size={20} />
          </button>

          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-left">
            <div className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
              <LuMessageSquare size={16} />
              <span>342 Comments</span>
            </div>
            <p className="text-sm italic text-zinc-200">
              "This cliffhanger is illegal! When is the next one coming out??"
            </p>
          </div>
        </div>
      </div>

      <footer
        className={`fixed bottom-0 left-0 right-0 z-[100] flex h-12 items-center justify-center border-t border-white/10 bg-black/85 px-4 backdrop-blur-2xl transition-all md:h-[56px] ${showUI ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}
      >
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Previous chapter"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white disabled:cursor-not-allowed disabled:opacity-25"
            onClick={goPrev}
            disabled={!prev}
          >
            <LuChevronLeft size={22} />
          </button>

          <span className="text-sm font-bold text-zinc-400">
            Ch. {ch.number}
          </span>

          <button
            type="button"
            aria-label="Next chapter"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white disabled:cursor-not-allowed disabled:opacity-25"
            onClick={goNext}
            disabled={!next}
          >
            <LuChevronRight size={22} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Reader;
