import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/PageIntro";
import { FadeUp, ImageReveal } from "@/components/site/Reveal";
import { designers, img } from "@/lib/eus-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Studio — EUS Interior" },
      { name: "description", content: "EUS Interior is a design studio of architects, makers and stylists creating homes across India since 2014." },
      { property: "og:title", content: "Our Studio — EUS Interior" },
      { property: "og:description", content: "Architects, makers and stylists designing homes across India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="The studio" title={<>We design homes, <em>not showrooms.</em></>} text="Since 2014, EUS has brought together architects, craftspeople and stylists to make homes that feel calm, personal and built to last." />
      <section className="container-editorial grid gap-12 pb-24 md:grid-cols-2 md:items-center">
        <ImageReveal src={img.craft} alt="Craftsperson at the EUS workshop" className="aspect-[4/5]" />
        <FadeUp>
          <h2 className="text-section font-display">Made in our own <em>workshop.</em></h2>
          <p className="text-muted-foreground mt-6 max-w-md text-lg leading-relaxed">Every cabinet, wardrobe and panel is built in our factory outside Bengaluru, with finishes checked by hand before they reach your home.</p>
        </FadeUp>
      </section>
      <section className="bg-secondary py-24">
        <div className="container-editorial">
          <h2 className="text-section font-display">The <em>people.</em></h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {designers.map((d) => (
              <div key={d.name}>
                <div className="aspect-[4/5] overflow-hidden"><img src={d.image} alt="" loading="lazy" className="h-full w-full object-cover" /></div>
                <p className="font-display mt-4 text-2xl">{d.name}</p>
                <p className="text-muted-foreground text-sm">{d.role}</p>
              </div>
            ))}
          </div>
          <Link to="/consultation" className="bg-primary text-primary-foreground hover:bg-accent mt-14 inline-flex h-14 items-center px-8 text-sm tracking-[0.1em] uppercase transition-colors">Meet a designer</Link>
        </div>
      </section>
    </>
  );
}
