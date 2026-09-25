import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/PageIntro";
import { FadeUp } from "@/components/site/Reveal";
import { journal } from "@/lib/eus-data";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — EUS Interior" },
      { name: "description", content: "Ideas on materials, kitchens and living well from the EUS Interior design studio." },
      { property: "og:title", content: "Journal — EUS Interior" },
      { property: "og:description", content: "Notes on living well from our designers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <PageIntro eyebrow="Journal" title={<>Notes on <em>living well.</em></>} />
      <section className="container-editorial grid gap-12 pb-32 md:grid-cols-3">
        {journal.map((j, n) => (
          <FadeUp key={j.slug} delay={n * 0.08}>
            <article>
              <div className="aspect-[4/5] overflow-hidden"><img src={j.image} alt="" loading="lazy" className="h-full w-full object-cover" /></div>
              <p className="text-eyebrow text-muted-foreground mt-5">{j.tag} · {j.read}</p>
              <h2 className="font-display mt-2 text-3xl">{j.title}</h2>
              <p className="text-muted-foreground mt-3 leading-relaxed">{j.excerpt}</p>
            </article>
          </FadeUp>
        ))}
      </section>
    </>
  ),
});
