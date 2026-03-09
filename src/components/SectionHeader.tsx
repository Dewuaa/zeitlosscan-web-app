import { LuChevronRight } from "react-icons/lu";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  icon?: ReactNode;
  showViewAll?: boolean;
  onViewAll?: () => void;
}

const SectionHeader = ({
  title,
  icon,
  showViewAll = false,
}: SectionHeaderProps) => {
  return (
    <div className="mb-5 mt-10 w-full flex items-center justify-between md:mb-6 md:mt-12">
      <h2 className="inline-flex items-center gap-2.5 text-[1.05rem] font-extrabold tracking-[-0.02em] text-zinc-100 md:text-[1.18rem]">
        {icon && <span className="text-zinc-500">{icon}</span>}
        {title}
      </h2>
      {showViewAll && (
        <span className="group inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.05em] text-zinc-400 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-zinc-100">
          View all <LuChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      )}
    </div>
  );
};

export default SectionHeader;
