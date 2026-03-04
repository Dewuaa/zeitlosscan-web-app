import {
  FaDiscord,
  FaReddit,
  FaCoffee,
  FaShareAlt,
  FaUsers,
} from "react-icons/fa";

const SocialBanner = () => {
  const cardClass =
    "rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.05]";
  const buttonClass =
    "mt-3 inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-all";

  return (
    <div className="content-shell">
      <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className={cardClass}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-zinc-100">
              <FaShareAlt />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="text-sm font-bold text-zinc-100">
                Share Zeitlos Scans
              </span>
              <span className="text-xs text-zinc-400">to your friends</span>
            </div>
          </div>
          <div className="mt-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] font-semibold text-zinc-300">
            <FaUsers size={11} />
            <span>321</span>
          </div>
        </div>

        <div className={cardClass}>
          <span className="text-sm font-bold text-zinc-100">
            Facing an issue?
          </span>
          <p className="mt-1 text-xs text-zinc-400">
            let us know, and we'll help ASAP
          </p>
          <a
            href="#"
            className={`${buttonClass} border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20`}
          >
            <FaReddit /> Report
          </a>
        </div>

        <div className={cardClass}>
          <span className="text-sm font-bold text-zinc-100">
            Join Our Socials
          </span>
          <p className="mt-1 text-xs text-zinc-400">to explore more</p>
          <a
            href="https://discord.gg/BnjpXqEKYd"
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonClass} border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20`}
          >
            <FaDiscord /> Discord
          </a>
        </div>

        <div className={cardClass}>
          <span className="text-sm font-bold text-zinc-100">Donate Us</span>
          <p className="mt-1 text-xs text-zinc-400">to support us</p>
          <a
            href="#"
            className={`${buttonClass} border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20`}
          >
            <FaCoffee /> Ko-Fi
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialBanner;
