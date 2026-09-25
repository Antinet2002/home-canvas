import { Link } from "@tanstack/react-router";
import { animate, useMotionValue, useTransform, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { formatINR } from "@/lib/eus-data";

const homeTypes = [
  { id: "1bhk", label: "1 BHK", area: 600 },
  { id: "2bhk", label: "2 BHK", area: 950 },
  { id: "3bhk", label: "3 BHK", area: 1450 },
  { id: "villa", label: "Villa", area: 2800 },
];
const tiers = [
  { id: "essential", label: "Essential", rate: 1400 },
  { id: "premium", label: "Premium", rate: 2100 },
  { id: "luxe", label: "Luxe", rate: 3200 },
];
const scopes = [
  { id: "kitchen", label: "Kitchen", add: 0.22 },
  { id: "wardrobes", label: "Wardrobes", add: 0.16 },
  { id: "living", label: "Living & dining", add: 0.2 },
  { id: "bedrooms", label: "Bedrooms", add: 0.18 },
  { id: "false-ceiling", label: "Ceiling & lighting", add: 0.1 },
  { id: "bath", label: "Bathroom renovation", add: 0.14 },
];

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`border px-4 py-2.5 text-sm transition-colors ${
        active ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-foreground"
      }`}
    >
      {children}
    </button>
  );
}

export function Estimator() {
  const [home, setHome] = useState("2bhk");
  const [tier, setTier] = useState("premium");
  const [scope, setScope] = useState<string[]>(["kitchen", "wardrobes", "living"]);

  const total = useMemo(() => {
    const area = homeTypes.find((h) => h.id === home)!.area;
    const rate = tiers.find((t) => t.id === tier)!.rate;
    const mult = scope.reduce((s, id) => s + (scopes.find((x) => x.id === id)?.add ?? 0), 0);
    return area * rate * Math.max(mult, 0.15);
  }, [home, tier, scope]);

  const mv = useMotionValue(total);
  const low = useTransform(mv, (v) => formatINR(v * 0.9));
  const high = useTransform(mv, (v) => formatINR(v * 1.1));
  useEffect(() => {
    const c = animate(mv, total, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [total, mv]);

  return (
    <div className="border-border grid border md:grid-cols-[1.4fr_1fr]">
      <div className="space-y-9 p-6 md:p-10">
        <fieldset>
          <legend className="text-eyebrow text-muted-foreground">1 · Home type</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {homeTypes.map((h) => (
              <Pill key={h.id} active={home === h.id} onClick={() => setHome(h.id)}>{h.label}</Pill>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-eyebrow text-muted-foreground">2 · What should we design?</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {scopes.map((s) => (
              <Pill
                key={s.id}
                active={scope.includes(s.id)}
                onClick={() => setScope((p) => (p.includes(s.id) ? p.filter((x) => x !== s.id) : [...p, s.id]))}
              >
                {s.label}
              </Pill>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-eyebrow text-muted-foreground">3 · Finish level</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {tiers.map((t) => (
              <Pill key={t.id} active={tier === t.id} onClick={() => setTier(t.id)}>{t.label}</Pill>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="bg-ink text-ivory flex flex-col justify-between gap-10 p-6 md:p-10">
        <div>
          <p className="text-eyebrow opacity-60">Estimated investment</p>
          <p className="font-display mt-5 text-5xl md:text-6xl">
            <motion.span>{low}</motion.span>
            <span className="mx-2 opacity-50">–</span>
            <motion.span>{high}</motion.span>
          </p>
          <p className="mt-5 text-sm leading-relaxed opacity-70">
            Indicative range including design, materials, factory-made joinery and installation. Your designer will give you a fixed quote.
          </p>
        </div>
        <Link to="/consultation" className="bg-ivory text-ink hover:bg-accent hover:text-ivory inline-flex h-13 items-center justify-center px-6 py-4 text-sm tracking-[0.1em] uppercase transition-colors">
          Get my exact quote
        </Link>
      </div>
    </div>
  );
}
