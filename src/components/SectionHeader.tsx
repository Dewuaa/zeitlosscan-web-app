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
    <div className="mb-5 mt-10 flex items-center justify-between md:mb-6 md:mt-12">
      <h2 className="inline-flex items-center gap-2 text-[1.05rem] font-extrabold tracking-[-0.02em] text-zinc-100 md:text-[1.18rem]">
        {icon && <span>{icon}</span>}
        {title}
      </h2>
      {showViewAll && (
        <span className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-zinc-400 transition-all hover:translate-x-0.5 hover:border-white/20 hover:bg-white/[0.06] hover:text-zinc-100">
          View all <LuChevronRight size={14} />
        </span>
      )}
    </div>
  );
};

export default SectionHeader;
