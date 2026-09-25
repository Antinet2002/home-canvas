import type { Project } from "@/lib/eus-data";

export function ProjectCard({ p, tall = false }: { p: Project; tall?: boolean }) {
  return (
    <article className="group">
      <div className={`overflow-hidden ${tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
        <img
          src={p.image}
          alt={`${p.title}, ${p.type} in ${p.city}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl">{p.title}</h3>
          <p className="text-muted-foreground mt-1 text-sm">{p.type} · {p.city}</p>
        </div>
        <p className="text-muted-foreground text-right text-xs leading-5">{p.area}<br />{p.budget}</p>
      </div>
    </article>
  );
}
