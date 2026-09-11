import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import {
  categories,
  formatINR,
  heroImage,
  hotspots,
  journal,
  patterns,
  products,
  shopTheLookImage,
  socialTiles,
  storyImage,
  sustainabilityImage,
  testimonials,
} from "@/lib/shop-data";
import { useShop } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";
import { FadeUp, ImageReveal, SectionHeading } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  const { addToCart, setCartOpen } = useShop();
  const [activeHotspot, setActiveHotspot] = useState<string | null>("p2");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);

  const activeProduct = activeHotspot ? products.find((p) => p.id === activeHotspot) : null;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSent(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-end justify-start overflow-hidden bg-ink text-ivory">
        <img
          src={heroImage}
          alt="Maison Tara serene living room interior with natural linen and morning light"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-85 scale-[1.03] transition-transform duration-[2000ms] ease-out hover:scale-100"
          loading="eager"
        />
        {/* Editorial gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-ink/40 pointer-events-none" />

        <div className="container-editorial relative z-10 pb-16 pt-32 md:pb-24 max-w-4xl">
          <FadeUp delay={0.1}>
            <p className="text-eyebrow tracking-[0.28em] text-sand/90 flex items-center gap-2">
              <span className="inline-block size-1.5 rounded-full bg-clay" />
              Edition 2026 • The Living Room Series
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h1 className="text-hero font-display text-ivory mt-4 text-balance">
              Quiet luxury for deliberate spaces.
            </h1>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="mt-6 text-sand/80 text-base md:text-lg max-w-xl leading-relaxed font-light">
              Long-staple stonewashed linen, handloom cotton, and wheel-thrown stoneware —
              slow-crafted with generational weaver clusters across India.
            </p>
          </FadeUp>

          <FadeUp delay={0.4}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="bg-ivory text-ink hover:bg-sand px-8 py-4 text-eyebrow transition-colors tracking-[0.16em]"
              >
                Explore Collection
              </Link>
              <Link
                to="/about"
                className="border border-ivory/40 hover:border-ivory text-ivory px-8 py-4 text-eyebrow transition-colors tracking-[0.16em] backdrop-blur-sm"
              >
                Our Heritage
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 2. PHILOSOPHY MARQUEE TICKER */}
      <div className="border-y border-border/80 bg-secondary/60 py-4 overflow-hidden">
        <div className="marquee-track flex gap-12 whitespace-nowrap text-eyebrow tracking-[0.24em] text-muted-foreground">
          <span>100% Stonewashed French Linen</span>
          <span>•</span>
          <span>Long-Staple Combed Handloom Cotton</span>
          <span>•</span>
          <span>Pure Botanical & Azo-Free Dyes</span>
          <span>•</span>
          <span>Zero Single-Use Plastics</span>
          <span>•</span>
          <span>Generational Artisan Clusters in Bhuj & Jaipur</span>
          <span>•</span>
          <span>Carbon-Neutral Doorstep Delivery</span>
          <span>•</span>
          <span>100% Stonewashed French Linen</span>
          <span>•</span>
          <span>Long-Staple Combed Handloom Cotton</span>
          <span>•</span>
          <span>Pure Botanical & Azo-Free Dyes</span>
          <span>•</span>
          <span>Zero Single-Use Plastics</span>
          <span>•</span>
          <span>Generational Artisan Clusters in Bhuj & Jaipur</span>
          <span>•</span>
          <span>Carbon-Neutral Doorstep Delivery</span>
        </div>
      </div>

      {/* 3. CURATED DEPARTMENTS / CATEGORIES */}
      <section className="container-editorial py-24 md:py-32">
        <SectionHeading
          eyebrow="Departments"
          title="Curated for every corner"
          subtitle="Intentional fabrics and grounding textures designed to live harmoniously together."
          action={
            <Link to="/shop" className="link-underline text-eyebrow inline-flex items-center gap-2">
              Browse full catalog <ArrowRight className="size-3.5" />
            </Link>
          }
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, idx) => (
            <FadeUp key={cat.name} delay={idx * 0.08} className="group relative">
              <Link
                to="/shop"
                search={{ category: cat.name }}
                className="block overflow-hidden bg-secondary relative aspect-[4/5]"
                data-cursor="view"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent transition-opacity group-hover:opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
                  <p className="text-eyebrow text-sand/80">Department</p>
                  <h3 className="font-display text-2xl md:text-3xl mt-1">{cat.name}</h3>
                  <p className="mt-2 text-xs text-sand/75 line-clamp-2">{cat.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-eyebrow text-ivory mt-4 underline underline-offset-4 decoration-ivory/50 group-hover:decoration-ivory">
                    Discover <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* 4. SEASONAL EDIT (FEATURED PRODUCTS) */}
      <section className="bg-sand/35 border-y border-border/70 py-24 md:py-32">
        <div className="container-editorial">
          <SectionHeading
            eyebrow="The Seasonal Edit"
            title="Woven to soften with age"
            subtitle="Pieces woven in small batches, finished with soft stonewashing, built for daily living."
            action={
              <Link to="/shop" className="link-underline text-eyebrow inline-flex items-center gap-2">
                View all {products.length} pieces <ArrowRight className="size-3.5" />
              </Link>
            }
          />

          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE SHOP-THE-LOOK ROOM SCENE */}
      <section className="container-editorial py-24 md:py-32">
        <SectionHeading
          eyebrow="Shop The Look • Scene No. 04"
          title="Afternoon in the courtyard"
          subtitle="Explore the composition. Click any glowing pin to reveal the linen, textures, and ceramics composing the room."
        />

        <div className="mt-12 grid lg:grid-cols-12 gap-8 items-center">
          {/* Interactive room photograph */}
          <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/11] bg-secondary overflow-hidden rounded-xs shadow-sm">
            <img
              src={shopTheLookImage}
              alt="Maison Tara curated living space featuring handwoven curtains, cushions, jute rug and ceramic lamp"
              className="h-full w-full object-cover"
              loading="lazy"
            />

            {/* Hotspots */}
            {hotspots.map((hs) => {
              const p = products.find((item) => item.id === hs.id);
              if (!p) return null;
              const isActive = activeHotspot === hs.id;

              return (
                <div
                  key={hs.id}
                  style={{ top: `${hs.y}%`, left: `${hs.x}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    type="button"
                    onClick={() => setActiveHotspot(isActive ? null : hs.id)}
                    aria-label={`Inspect ${p.name}`}
                    className={`relative grid size-8 place-items-center rounded-full border transition-all ${
                      isActive
                        ? "bg-clay border-ivory text-ivory scale-125"
                        : "bg-ivory/90 hover:bg-ivory border-ink/30 text-ink scale-100 hotspot-pulse"
                    }`}
                  >
                    <span className="size-2 rounded-full bg-current" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Active Hotspot Detail Card */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            {activeProduct ? (
              <div className="border border-border bg-card p-7 shadow-sm transition-all duration-300">
                <p className="text-eyebrow text-accent flex items-center gap-1.5">
                  <Sparkles className="size-3" /> Selected from room
                </p>
                <div className="mt-4 flex gap-4 items-start">
                  <img
                    src={activeProduct.images[0]}
                    alt={activeProduct.name}
                    className="size-24 object-cover bg-secondary rounded-xs shrink-0"
                  />
                  <div>
                    <span className="text-xs text-muted-foreground">{activeProduct.category}</span>
                    <h3 className="font-display text-xl leading-snug mt-0.5">
                      <Link
                        to="/product/$slug"
                        params={{ slug: activeProduct.slug }}
                        className="link-underline"
                      >
                        {activeProduct.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm font-medium">{formatINR(activeProduct.price)}</p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {activeProduct.description}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(activeProduct.id, activeProduct.sizes[0]);
                      setCartOpen(true);
                    }}
                    className="flex-1 bg-ink text-ivory hover:bg-ink/90 py-3 text-eyebrow transition-colors"
                  >
                    Add to Bag
                  </button>
                  <Link
                    to="/product/$slug"
                    params={{ slug: activeProduct.slug }}
                    className="border border-border hover:bg-secondary px-4 py-3 text-eyebrow transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-border p-8 text-center text-muted-foreground">
                <p className="font-display text-xl text-foreground">Select any marker</p>
                <p className="mt-2 text-xs">
                  Tap any pin on the interior photograph to inspect details, fabric specifications, and pricing.
                </p>
              </div>
            )}

            {/* Quick picker row */}
            <div className="mt-6">
              <p className="text-eyebrow text-muted-foreground mb-3">All items in this setting</p>
              <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                {hotspots.map((hs) => {
                  const p = products.find((item) => item.id === hs.id);
                  if (!p) return null;
                  const isSel = activeHotspot === hs.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActiveHotspot(p.id)}
                      className={`flex items-center gap-2 border px-3 py-2 text-xs shrink-0 transition-colors ${
                        isSel ? "border-clay bg-card font-medium" : "border-border hover:bg-secondary"
                      }`}
                    >
                      <img src={p.images[0]} alt="" className="size-6 object-cover rounded-xs" />
                      <span>{p.name.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CRAFT & MATERIAL EDITORIAL STORY */}
      <section className="border-t border-border bg-card/40 py-24 md:py-32">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ImageReveal
              src={storyImage}
              alt="Generational weaver working on traditional wooden handloom in Gujarat"
              className="aspect-[4/5] bg-secondary"
            />

            <div className="flex flex-col justify-center">
              <FadeUp>
                <p className="text-eyebrow text-accent">Craft Heritage</p>
              </FadeUp>
              <FadeUp delay={0.08}>
                <h2 className="text-section font-display mt-3">
                  Made by human hands, softened by time.
                </h2>
              </FadeUp>
              <FadeUp delay={0.16}>
                <p className="mt-6 text-muted-foreground leading-relaxed text-base">
                  Every Maison Tara textile begins on traditional pit and shuttle looms in master
                  weaving clusters across Bhuj, Odisha, and Jaipur. We do not rush the process.
                  Long-staple fibers are hand-sorted, spun with deliberate tension, and pre-washed twice
                  with river stones so the texture you touch today only deepens after ten years of laundering.
                </p>
              </FadeUp>
              <FadeUp delay={0.24}>
                <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6">
                  <div>
                    <h4 className="font-display text-2xl">100%</h4>
                    <p className="text-xs text-muted-foreground mt-1">Natural, biodegradable fibers</p>
                  </div>
                  <div>
                    <h4 className="font-display text-2xl">40+ Years</h4>
                    <p className="text-xs text-muted-foreground mt-1">Generational master artisan partnerships</p>
                  </div>
                </div>
              </FadeUp>
              <FadeUp delay={0.32}>
                <div className="mt-8">
                  <Link to="/about" className="link-underline text-eyebrow inline-flex items-center gap-2">
                    Read our full story & sourcing manifesto <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </FadeUp>
            </div>
          </div>

          {/* Sustainability Sub-feature */}
          <div className="mt-24 grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 flex flex-col justify-center">
              <FadeUp>
                <p className="text-eyebrow text-accent">Mindful Materials</p>
              </FadeUp>
              <FadeUp delay={0.08}>
                <h2 className="text-section font-display mt-3">
                  Nothing synthetic. Nothing disposable.
                </h2>
              </FadeUp>
              <FadeUp delay={0.16}>
                <p className="mt-6 text-muted-foreground leading-relaxed text-base">
                  We use plant-derived dyes, low-impact minerals, and zero single-use plastic wrapping.
                  Your orders arrive encased in reusable cotton duster bags made from our workshop cutting remnants.
                </p>
              </FadeUp>
              <FadeUp delay={0.24}>
                <ul className="mt-6 space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                    <span className="size-1.5 rounded-full bg-clay" /> GOTS-certified organic cotton yarns
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="size-1.5 rounded-full bg-clay" /> Stonewashed Normandy flax linen
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="size-1.5 rounded-full bg-clay" /> Completely compostable craft mailers
                  </li>
                </ul>
              </FadeUp>
            </div>
            <ImageReveal
              src={sustainabilityImage}
              alt="Raw natural linen and cotton fibers drying in shade"
              className="order-1 lg:order-2 aspect-[4/5] bg-secondary"
            />
          </div>
        </div>
      </section>

      {/* 7. TEXTILE PATTERNS & WEAVES */}
      <section className="container-editorial py-24">
        <SectionHeading
          eyebrow="The Weaves"
          title="Patterns rooted in botanical geometry"
          subtitle="Subtle motifs drawn from regional flora, architectural jaalis, and quiet repeating rhythm."
        />

        <div className="mt-12 grid gap-6 grid-cols-2 md:grid-cols-4">
          {patterns.map((p, idx) => (
            <FadeUp key={p.name} delay={idx * 0.08} className="group flex flex-col">
              <div className="bg-secondary aspect-square overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.name} pattern close-up`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <h4 className="font-display text-lg">{p.name}</h4>
                <Link
                  to="/shop"
                  className="text-eyebrow text-muted-foreground hover:text-foreground"
                >
                  Shop
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="border-y border-border bg-sand/25 py-24">
        <div className="container-editorial">
          <SectionHeading
            align="center"
            eyebrow="Patron Words"
            title="Homes transformed with quiet warmth"
          />

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <FadeUp
                key={t.name}
                delay={idx * 0.1}
                className="border border-border/80 bg-background p-8 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex gap-1 text-clay">
                    {"★".repeat(5)}
                  </div>
                  <p className="font-display text-xl leading-relaxed text-foreground">
                    "{t.quote}"
                  </p>
                </div>
                <div className="mt-8 border-t border-border/60 pt-4">
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 9. JOURNAL HIGHLIGHTS */}
      <section className="container-editorial py-24 md:py-32">
        <SectionHeading
          eyebrow="The Journal"
          title="Notes on living slowly"
          subtitle="Seasonal styling guides, architectural lighting essays, and care recommendations."
          action={
            <Link to="/journal" className="link-underline text-eyebrow inline-flex items-center gap-2">
              Read all dispatches <ArrowRight className="size-3.5" />
            </Link>
          }
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {journal.map((entry, idx) => (
            <FadeUp key={entry.slug} delay={idx * 0.1} className="group flex flex-col">
              <Link
                to="/journal/$slug"
                params={{ slug: entry.slug }}
                className="bg-secondary aspect-[16/11] overflow-hidden"
              >
                <img
                  src={entry.image}
                  alt={entry.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </Link>
              <div className="mt-5 flex items-center justify-between text-eyebrow text-muted-foreground">
                <span>{entry.category}</span>
                <span>{entry.read}</span>
              </div>
              <h3 className="font-display text-2xl mt-2 leading-snug">
                <Link
                  to="/journal/$slug"
                  params={{ slug: entry.slug }}
                  className="link-underline"
                >
                  {entry.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {entry.excerpt}
              </p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* 10. COMMUNITY GALLERY */}
      <section className="border-t border-border py-20 bg-card/25">
        <div className="container-editorial">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-eyebrow text-muted-foreground">The Maison Community</p>
              <h3 className="font-display text-2xl md:text-3xl mt-1">@maisontarahome</h3>
            </div>
            <p className="text-xs text-muted-foreground">Tag #MaisonTaraLiving to be featured</p>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {socialTiles.map((tile, idx) => (
              <div key={idx} className="aspect-square bg-secondary overflow-hidden group">
                <img
                  src={tile}
                  alt="Patron living space featuring Maison Tara textiles"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. THE DISPATCH (NEWSLETTER) */}
      <section className="bg-ink text-ivory py-24">
        <div className="container-editorial max-w-2xl text-center">
          <p className="text-eyebrow text-sand/80 tracking-[0.24em]">The Dispatch</p>
          <h2 className="font-display text-3xl md:text-4xl mt-3 text-ivory">
            Receive seasonal notes from the workshop
          </h2>
          <p className="mt-4 text-sand/70 text-sm leading-relaxed">
            Quiet dispatches on slower living, new batch drops, and invitations to private studio gatherings.
          </p>

          {newsletterSent ? (
            <div className="mt-8 inline-flex items-center gap-2 border border-ivory/30 bg-ivory/10 px-6 py-3 text-sm text-ivory">
              <Check className="size-4 text-clay" /> Welcome to the Maison. Your first dispatch is on its way.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-ivory/10 border border-ivory/20 px-5 py-4 text-sm text-ivory placeholder:text-sand/50 outline-none focus:border-clay"
              />
              <button
                type="submit"
                className="bg-ivory text-ink hover:bg-sand px-8 py-4 text-eyebrow transition-colors tracking-[0.16em]"
              >
                Join the Maison
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
