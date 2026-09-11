import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { journal, products } from "@/lib/shop-data";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/journal/$slug")({
  component: JournalArticlePage,
});

function JournalArticlePage() {
  const { slug } = Route.useParams();
  const entry = journal.find((j) => j.slug === slug);

  if (!entry) {
    return (
      <div className="container-editorial pt-32 pb-24 text-center">
        <h1 className="font-display text-4xl">Article Not Found</h1>
        <p className="mt-3 text-muted-foreground text-sm">
          The journal essay you requested does not exist or has been archived.
        </p>
        <Link
          to="/journal"
          className="mt-8 inline-block bg-ink text-ivory px-8 py-3.5 text-eyebrow"
        >
          Return to Journal
        </Link>
      </div>
    );
  }

  const relatedArticles = journal.filter((j) => j.slug !== entry.slug);
  const featuredProducts = products.slice(0, 3);

  return (
    <article className="pt-24 md:pt-32 pb-24">
      <div className="container-editorial max-w-4xl">
        {/* Back navigation */}
        <Link
          to="/journal"
          className="text-eyebrow text-muted-foreground hover:text-foreground inline-flex items-center gap-2 mb-8"
        >
          <ArrowLeft className="size-3.5" /> Back to Journal
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 text-eyebrow text-muted-foreground">
          <span className="text-accent">{entry.category}</span>
          <span>•</span>
          <span>{entry.read}</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mt-4 leading-[1.08]">
          {entry.title}
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
          {entry.excerpt}
        </p>

        {/* Hero image */}
        <div className="mt-12 aspect-[16/10] bg-secondary overflow-hidden">
          <img
            src={entry.image}
            alt={entry.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="mt-14 space-y-8 text-foreground/90 text-base md:text-lg leading-relaxed font-light">
          <p>
            When we begin arranging a room, we tend to think first of silhouettes: the edge of a chair,
            the footprint of a credenza, the height of a dining table. But rooms are not experienced as
            geometric outlines; they are experienced as temperatures of light and surfaces under palm.
          </p>

          <p>
            Natural stonewashed French linen possesses a drape unlike synthetic substitutes. Woven from
            long flax fibers harvested in Normandy and stone-washed twice in small wash drums, the fabric
            develops a soft, undulating surface that bends morning light rather than reflecting it bluntly.
          </p>

          {/* Pullquote */}
          <blockquote className="border-l-2 border-clay pl-6 py-2 my-10 font-display text-2xl md:text-3xl text-foreground italic leading-snug">
            "A house only begins to feel calm when you eliminate fabrics that rustle, glare, or demand to be treated with anxiety."
          </blockquote>

          <h2 className="font-display text-2xl md:text-3xl text-foreground pt-4">
            The Philosophy of Single-Color Harmony
          </h2>

          <p>
            When pairing curtains with floor textiles, resist the urge to match tones identically. An
            oat-colored linen curtain paired with a raw jute rug creates depth precisely because their
            natural undertones diverge slightly under varying light angles. In the morning, the window turns
            golden; at twilight, the woven floor catches cool shadows.
          </p>

          <p>
            To test a textile in your own space, hang a generous swatch near your primary light source for
            forty-eight hours. Notice how the texture reads when the sun is at its zenith versus when the
            first ceramic lamps are switched on after dusk.
          </p>
        </div>

        {/* Shop The Story */}
        <div className="mt-20 border-t border-border pt-14">
          <p className="text-eyebrow text-muted-foreground">Featured In This Story</p>
          <h3 className="font-display text-2xl md:text-3xl mt-1">Shop the Story</h3>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* More Stories */}
        <div className="mt-24 border-t border-border pt-14">
          <h3 className="font-display text-2xl">Related Dispatches</h3>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                to="/journal/$slug"
                params={{ slug: rel.slug }}
                className="group block"
              >
                <div className="aspect-[16/10] bg-secondary overflow-hidden">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-center gap-2 text-eyebrow text-muted-foreground">
                  <span>{rel.category}</span>
                  <span>•</span>
                  <span>{rel.read}</span>
                </div>
                <h4 className="font-display text-xl mt-1 group-hover:underline">
                  {rel.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
