import { useEffect, useState } from "react";

/** Subtle desktop-only cursor. Disabled on touch and reduced-motion. */
export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor], a, button");
      if (!el) {
        setLabel(null);
        setActive(false);
        return;
      }
      const kind = el.dataset["cursor"];
      setLabel(kind === "shop" ? "Shop" : kind === "view" ? "View" : null);
      setActive(true);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference max-lg:hidden"
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
    >
      <div
        className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/80 text-[0.55rem] tracking-[0.18em] text-white uppercase transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          width: label ? 72 : active ? 34 : 14,
          height: label ? 72 : active ? 34 : 14,
          backgroundColor: label ? "transparent" : "rgba(255,255,255,0.9)",
        }}
      >
        {label}
      </div>
    </div>
  );
}
