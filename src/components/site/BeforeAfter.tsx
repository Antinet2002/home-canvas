import { useState } from "react";
import { img } from "@/lib/eus-data";

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden select-none">
      <img src={img.living} alt="Living room after EUS redesign" width={1600} height={1008} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={img.before} alt="Same room before, bare concrete" width={1600} height={1008} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="bg-ivory pointer-events-none absolute inset-y-0 w-px" style={{ left: `${pos}%` }}>
        <span className="bg-ivory text-ink absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-xs">⟷</span>
      </div>
      <span className="text-eyebrow bg-ink/70 text-ivory absolute top-4 left-4 px-3 py-1.5">Before</span>
      <span className="text-eyebrow bg-ink/70 text-ivory absolute top-4 right-4 px-3 py-1.5">After</span>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare before and after"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
