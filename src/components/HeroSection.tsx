import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { heroMangas } from "../data";

const HeroSection = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(1);
  const total = heroMangas.length;

  const goTo = useCallback(
    (dir: "left" | "right") => {
      setActiveIndex((prev) => {
        if (dir === "left") return prev <= 0 ? total - 1 : prev - 1;
        return prev >= total - 1 ? 0 : prev + 1;
      });
    },
    [total],
  );

  useEffect(() => {
    const interval = setInterval(() => goTo("right"), 5000);
    return () => clearInterval(interval);
  }, [goTo]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 400, damping: 90 });
  const mouseY = useSpring(y, { stiffness: 400, damping: 90 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const xPos = (e.clientX - left) / width - 0.5;
    const yPos = (e.clientY - top) / height - 0.5;
    x.set(xPos * 12);
    y.set(yPos * 12);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getCardState = (index: number) => {
    const diff = index - activeIndex;
    if (diff === 0) return "active";
    if (diff === -1 || (activeIndex === 0 && index === total - 1))
      return "prev";
    if (diff === 1 || (activeIndex === total - 1 && index === 0)) return "next";
    return "hidden";
  };

  const getCardClass = (state: string) => {
    if (state === "active") {
      return "z-30 scale-100 opacity-100";
    }
    if (state === "prev") {
      return "z-20 -translate-x-[38%] scale-[0.86] opacity-55 max-md:-translate-x-[32%]";
    }
    if (state === "next") {
      return "z-20 translate-x-[38%] scale-[0.86] opacity-55 max-md:translate-x-[32%]";
    }
    return "pointer-events-none z-0 scale-75 opacity-0";
  };

  return (
    <div className="content-shell pt-[88px] md:pt-[102px]">
      <div
        className="relative h-[430px] overflow-hidden rounded-[28px] border border-white/10 bg-black/40 md:h-[520px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-40 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-zinc-100 backdrop-blur hover:bg-black/75"
          onClick={() => goTo("left")}
        >
          <LuChevronLeft size={24} />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-40 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-zinc-100 backdrop-blur hover:bg-black/75"
          onClick={() => goTo("right")}
        >
          <LuChevronRight size={24} />
        </button>

        <div className="relative h-full">
          {heroMangas.map((manga, index) => {
            const state = getCardState(index);

            return (
              <div
                key={manga.id + "-" + index}
                className={`absolute left-1/2 top-1/2 h-[88%] w-[72%] -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-3xl border border-white/15 transition-all duration-500 max-md:w-[88%] ${getCardClass(state)}`}
                onClick={() => {
                  if (index === activeIndex) {
                    navigate(`/manga/${manga.id}`);
                  } else {
                    setActiveIndex(index);
                  }
                }}
              >
                {index === activeIndex ? (
                  <motion.img
                    src={manga.cover}
                    alt={manga.title}
                    className="h-full w-full object-cover [image-rendering:auto]"
                    style={{ x: mouseX, y: mouseY, scale: 1.015 }}
                  />
                ) : (
                  <img
                    src={manga.cover}
                    alt={manga.title}
                    className="h-full w-full object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

                <div className="absolute left-4 right-4 top-4 flex items-center gap-2">
                  <span className="rounded-md bg-red-600/90 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
                    New
                  </span>
                  <span className="rounded-md bg-black/45 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-zinc-100">
                    {manga.type}
                  </span>
                  <span className="rounded-md bg-black/45 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-zinc-100">
                    English
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                  <h3 className="text-2xl font-black tracking-[-0.03em] text-white md:text-3xl">
                    {manga.title}
                  </h3>
                  {manga.status && (
                    <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                      <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.9)]"></span>
                      {manga.status}
                    </div>
                  )}
                  {manga.description && (
                    <p className="mt-2 line-clamp-2 max-w-2xl text-sm text-zinc-200/90 md:text-[0.95rem]">
                      {manga.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
