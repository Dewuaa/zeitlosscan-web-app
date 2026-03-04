import { LuChevronRight } from "react-icons/lu";

const AnnouncementBar = () => {
  return (
    <div className="content-shell">
      <div className="mt-6 flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-zinc-400 md:gap-3 md:px-4 md:py-3">
        <span className="rounded-md bg-red-500/15 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-red-300">
          New Manga Series Added
        </span>
        <span className="text-zinc-400">
          · Check out our latest additions in the "Latest Series" section — your
          feedback means a lot
        </span>
        <a
          href="#"
          className="ml-auto inline-flex items-center gap-1 font-semibold text-zinc-300 transition-colors hover:text-white"
        >
          View all <LuChevronRight size={14} />
        </a>
      </div>
    </div>
  );
};

export default AnnouncementBar;
