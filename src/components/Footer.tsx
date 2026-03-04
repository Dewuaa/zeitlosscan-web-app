import { FaDiscord, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const socialClass =
    "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08] hover:text-white";
  return (
    <footer className="mt-20 border-t border-white/10 bg-gradient-to-b from-[#0a0a0d] to-[#050507]">
      <div className="content-shell py-14 text-center">
        <div className="mx-auto max-w-3xl space-y-5">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xl">
            💀
          </div>
          <h3 className="text-2xl font-extrabold tracking-[-0.02em] text-zinc-100">
            Zeitlos Scans
          </h3>
          <p className="text-sm leading-relaxed text-zinc-400 md:text-base">
            Dive into the captivating worlds of manhua and manhwa with Zeitlos
            Scans, your premier destination for high-quality scans, delivered
            with precision and care.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://discord.gg/BnjpXqEKYd"
              target="_blank"
              rel="noopener noreferrer"
              className={socialClass}
            >
              <FaDiscord />
            </a>
            <a href="#" className={socialClass}>
              <FaTwitter />
            </a>
            <a href="#" className={socialClass}>
              <FaInstagram />
            </a>
          </div>
          <div className="flex items-center justify-center gap-5 text-sm font-semibold text-zinc-400">
            <a href="#" className="transition-colors hover:text-zinc-200">
              DMCA
            </a>
            <a href="#" className="transition-colors hover:text-zinc-200">
              Contact
            </a>
            <a href="#" className="transition-colors hover:text-zinc-200">
              Privacy
            </a>
          </div>
          <div className="text-xs leading-relaxed text-zinc-500">
            &copy; {new Date().getFullYear()} ZeitlosScans. All rights reserved.
            <br />
            <span>
              Disclaimer: This site does not store any files on its server. All
              contents are provided by non-affiliated third parties.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
