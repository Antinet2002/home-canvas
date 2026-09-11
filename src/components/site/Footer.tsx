import { Link } from "@tanstack/react-router";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Bed Linen", to: "/shop" as const },
      { label: "Curtains", to: "/shop" as const },
      { label: "Cushions", to: "/shop" as const },
      { label: "Rugs", to: "/shop" as const },
      { label: "Bath", to: "/shop" as const },
      { label: "Decor", to: "/shop" as const },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", to: "/about" as const },
      { label: "Sustainability", to: "/about" as const },
      { label: "Journal", to: "/journal" as const },
      { label: "Contact", to: "/contact" as const },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping", to: "/contact" as const },
      { label: "Returns", to: "/contact" as const },
      { label: "FAQs", to: "/contact" as const },
      { label: "Track Order", to: "/contact" as const },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-border mt-24 border-t">
      <div className="container-editorial grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-eyebrow text-muted-foreground">{col.title}</h2>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="link-underline text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h2 className="text-eyebrow text-muted-foreground">Follow</h2>
          <ul className="mt-5 space-y-3">
            {["Instagram", "Facebook", "Pinterest"].map((s) => (
              <li key={s}>
                <a href="#" className="link-underline text-sm">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-editorial pb-6">
        <p
          aria-hidden="true"
          className="font-display text-foreground/90 w-full text-[clamp(3.5rem,17vw,14rem)] leading-[0.85] tracking-[-0.03em]"
        >
          Maison Tara
        </p>
      </div>

      <div className="border-border container-editorial text-muted-foreground flex flex-col gap-3 border-t py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Maison Tara. Made in India.</p>
        <div className="flex flex-wrap gap-6">
          <a href="#" className="link-underline">
            Privacy
          </a>
          <a href="#" className="link-underline">
            Terms
          </a>
          <a href="#" className="link-underline">
            Shipping policy
          </a>
        </div>
      </div>
    </footer>
  );
}
