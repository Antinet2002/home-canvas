import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/PageIntro";
import { FadeUp, ImageReveal } from "@/components/site/Reveal";
import { services, process, img } from "@/lib/eus-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — EUS Interior" },
      { name: "description", content: "Full home interiors, modular kitchens, wardrobes, renovation and styling from one accountable studio." },
      { property: "og:title", content: "Services — EUS Interior" },
      { property: "og:description", content: "Everything your home needs, designed and built by one team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

const pics = [img.hero, img.kitchen, img.bedroom, img.before, img.look];

function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="Services" title={<>One studio. <em>Every detail.</em></>} text="Design, manufacturing and installation under one roof — so you have one team to trust and one fixed price." />
      <section className="container-editorial space-y-24 pb-24 md:space-y-36">
        {services.map((s, n) => (
          <div key={s.n} className={`grid gap-10 md:grid-cols-2 md:items-center ${n % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <ImageReveal src={pics[n]!} alt={s.title} className="aspect-[4/3]" />
            <FadeUp>
              <p className="font-display text-accent text-5xl">{s.n}</p>
              <h2 className="text-section font-display mt-4">{s.title}</h2>
              <p className="text-muted-foreground mt-6 max-w-md text-lg leading-relaxed">{s.text}</p>
            </FadeUp>
          </div>
        ))}
      </section>
      <section className="bg-secondary py-24">
        <div className="container-editorial">
          <h2 className="text-section font-display">How we <em>work.</em></h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-5">
            {process.map((p) => (
              <li key={p.n} className="border-foreground/20 border-t pt-6">
                <p className="text-muted-foreground text-sm">{p.n}</p>
                <p className="font-display mt-2 text-2xl">{p.title}</p>
                <p className="text-muted-foreground mt-2 text-sm">{p.text}</p>
              </li>
            ))}
          </ol>
          <Link to="/consultation" className="bg-primary text-primary-foreground hover:bg-accent mt-14 inline-flex h-14 items-center px-8 text-sm tracking-[0.1em] uppercase transition-colors">Start with a free consultation</Link>
        </div>
      </section>
    </>
  );
}
