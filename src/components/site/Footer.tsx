import { Link } from "@tanstack/react-router";

const cols = [
  { title: "Explore", links: [
    { label: "Projects", to: "/projects" as const },
    { label: "Services", to: "/services" as const },
    { label: "Cost estimate", to: "/estimate" as const },
  ] },
  { title: "Studio", links: [
    { label: "About EUS", to: "/about" as const },
    { label: "Journal", to: "/journal" as const },
    { label: "Consultation", to: "/consultation" as const },
  ] },
];

export function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="container-editorial grid gap-14 py-20 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
        <div>
          <p className="font-display text-4xl tracking-[0.18em]">EUS</p>
          <p className="font-display mt-6 max-w-xs text-2xl italic opacity-80">
            Homes that feel unmistakably yours.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-eyebrow opacity-60">{c.title}</p>
            <ul className="mt-5 space-y-3 text-sm">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="link-underline">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="text-eyebrow opacity-60">Experience centres</p>
          <p className="mt-5 text-sm leading-relaxed opacity-80">
            Bengaluru · Mumbai · Pune · Hyderabad · Gurugram
          </p>
          <p className="mt-4 text-sm opacity-80">hello@eusinterior.com</p>
        </div>
      </div>
      <div className="container-editorial border-ivory/15 flex flex-col justify-between gap-2 border-t py-6 text-xs opacity-60 md:flex-row">
        <span>© {new Date().getFullYear()} EUS Interior. All rights reserved.</span>
        <span>45-day delivery · 10-year warranty · Fixed quotes</span>
      </div>
    </footer>
  );
}
