import { useRef } from "react";
import {
  LuChevronLeft,
  LuChevronRight,
  LuPlay,
  LuSparkles,
} from "react-icons/lu";
import SectionHeader from "./SectionHeader";
import { editorsChoice, editorsChoiceThumbs } from "../data";

const EditorsChoice = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="content-shell">
      <SectionHeader
        title="Editor's Choice"
        icon={<LuSparkles color="var(--accent-gold)" />}
      />
      <div className="grid gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-4 lg:grid-cols-[1fr_300px] lg:items-center">
        <div>
          <h2 className="text-2xl font-black tracking-[-0.03em] text-zinc-100 md:text-3xl">
            {editorsChoice.title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
            {editorsChoice.description}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-200"
              onClick={() => scroll("left")}
            >
              <LuChevronLeft size={16} />
            </button>
            <div
              className="flex max-w-full gap-2 overflow-x-auto"
              ref={scrollRef}
            >
              {editorsChoiceThumbs.map((manga) => (
                <img
                  key={manga.id}
                  src={manga.cover}
                  alt={manga.title}
                  className="h-20 w-14 shrink-0 rounded-lg border border-white/10 object-cover"
                />
              ))}
            </div>
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-200"
              onClick={() => scroll("right")}
            >
              <LuChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10">
          <img
            src={editorsChoice.cover}
            alt={editorsChoice.title}
            className="h-[320px] w-full object-cover"
          />
          <button className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-xl bg-red-600 px-3 py-2 text-xs font-bold text-white shadow-[0_12px_28px_rgba(229,9,20,0.4)]">
            <LuPlay size={14} style={{ fill: "currentColor" }} /> Start Reading
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorsChoice;
