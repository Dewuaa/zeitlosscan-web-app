import cx from "classnames";
import type { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cx(
        "relative overflow-hidden bg-white/[0.04]",
        className
      )}
      {...props}
    >
      <div 
        className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" 
      />
    </div>
  );
};
