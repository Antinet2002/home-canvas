import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Feather, Leaf, Shield } from "lucide-react";
import { storyImage, sustainabilityImage, shopTheLookImage } from "@/lib/shop-data";
import { FadeUp, ImageReveal, SectionHeading } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

const CLUSTERS = [
  {
    region: "Kutch, Gujarat",
    craft: "Extra-Weft Handloom Weaving",
    desc: "In desert villages around Bhuj, master weavers work on pit looms passed down through three generations, crafting heavy cotton weaves with raised tactile ribs.",
  },
  {
    region: "Sanganer, Rajasthan",
    craft: "Botanical Dyes & Stone Washing",
    desc: "Using alum, madder root, indigo, and river stones, our textiles are dyed and tumbled until the stiffness of raw yarn dissolves into supple drape.",
  },
  {
    region: "Mayurbhanj, Odisha",
    craft: "Wild Sabai Grass Braiding",
    desc: "Harvested sustainably from riverbanks, natural grass cords are tightly braided by women's cooperatives into durable table mats and vessels.",
  },
];

const MATERIALS = [
  {
    name: "Stonewashed French Linen",
    origin: "Normandy Flax, 180 GSM",
    desc: "Naturally antibacterial, thermo-regulating, and pre-softened twice with river stones.",
  },
  {
    name: "Combed Handloom Cotton",
    origin: "Long-staple organic cotton, 600 GSM",
    desc: "Spun with low-twist tension for cloud-like water absorption and endurance.",
  },
  {
    name: "Wheel-Thrown Stoneware",
    origin: "High-fire stoneware clay",
    desc: "Hand-thrown by studio potters in Jaipur, glazed in matte chalk and iron-flecked oat.",
  },
  {
    name: "Natural Jute & Sabai",
    origin: "Riverbed wild grasses",
    desc: "Grounding and textured underfoot, 100% biodegradable and zero microplastics.",
  },
];

function AboutPage() {
  return (
    <div className="pt-24 md:pt-32 pb-24">
      {/* Header */}
      <div className="container-editorial">
        <FadeUp>
          <p className="text-eyebrow text-muted-foreground flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-clay" /> Slower Living • Heritage Craft
          </p>
          <h1 className="text-section font-display mt-3">Living with Intention</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed font-light">
            Maison Tara began with a quiet conviction: that the objects and textiles we wake up next to
            shape our nervous system. In a world of synthetic haste, we make tactile pieces that soften,
            age with dignity, and respect the human hands that make them.
          </p>
        </FadeUp>

        {/* Hero Photo Banner */}
        <div className="mt-14 aspect-[21/9] bg-secondary overflow-hidden">
          <img
            src={storyImage}
            alt="Artisan loom workshop in India"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Philosophy */}
        <div className="mt-24 grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="text-eyebrow text-accent">The Foundation</p>
            <h2 className="font-display text-3xl md:text-4xl mt-2 leading-snug">
              Why slow interiors matter in a hurried world.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-muted-foreground leading-relaxed text-base font-light">
            <p>
              Most mass-produced home textiles are treated with chemical baths to fake an immediate softness
              that washes out after three laundry cycles. When the silicone coating dissolves, the fabric
              feels stiff and begins pilling.
            </p>
            <p>
              At Maison Tara, we work exclusively with long-staple plant fibers — linen harvested in Normandy
              and organic cotton grown in rain-fed fields in central India. Because the fibers themselves are
              long and unbroken, our textiles do not pill; they relax, breathing more air into every weave.
            </p>
            <p>
              A room dressed in quiet materials is fundamentally less stressful. It absorbs sound, softens
              harsh overhead light, and invites you to take off your shoes and stay awhile.
            </p>
          </div>
        </div>

        {/* Artisan Clusters */}
        <div className="mt-28 border-t border-border pt-16">
          <SectionHeading
            eyebrow="Generational Alliances"
            title="Our Craft Clusters"
            subtitle="We work directly with master craft cooperatives across India, bypassing middlemen and guaranteeing fair wages."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {CLUSTERS.map((c, idx) => (
              <FadeUp
                key={c.region}
                delay={idx * 0.1}
                className="border border-border/80 bg-card p-8 flex flex-col justify-between"
              >
                <div>
                  <p className="text-eyebrow text-accent">{c.region}</p>
                  <h3 className="font-display text-2xl mt-2">{c.craft}</h3>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {c.desc}
                  </p>
                </div>
                <div className="mt-8 border-t border-border pt-4 text-xs text-muted-foreground">
                  Generational direct alliance
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Sourcing & Sustainability Split */}
        <div className="mt-28 border-t border-border pt-16 grid lg:grid-cols-2 gap-16 items-center">
          <ImageReveal
            src={sustainabilityImage}
            alt="Hand-drying organic yarn skeins"
            className="aspect-[4/5] bg-secondary"
          />
          <div>
            <p className="text-eyebrow text-accent">Sustainability Manifesto</p>
            <h2 className="text-section font-display mt-3">
              Designed to return to the earth.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Every design choice is tested against a simple criterion: when this textile completes its
              lifespan decades from now, will it leave behind a toxic trace?
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex gap-4 items-start">
                <div className="size-9 rounded-full bg-secondary grid place-items-center shrink-0">
                  <Leaf className="size-4 text-clay" />
                </div>
                <div>
                  <h4 className="font-display text-lg">Botanical & Non-Toxic Dyes</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Free from azo dyes, formaldehyde, and heavy metals. Safe for children, pets, and sensitive skin.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="size-9 rounded-full bg-secondary grid place-items-center shrink-0">
                  <Feather className="size-4 text-clay" />
                </div>
                <div>
                  <h4 className="font-display text-lg">Zero Plastic Packaging</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Every order is shipped in reusable cotton duster bags made from workshop textile cutoffs, inside FSC-certified recycled boxes.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="size-9 rounded-full bg-secondary grid place-items-center shrink-0">
                  <Shield className="size-4 text-clay" />
                </div>
                <div>
                  <h4 className="font-display text-lg">Fair Living Wages</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    All weaving and dyeing wages exceed regional standards by at least 40%, directly funding healthcare and craft apprenticeships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Material Index */}
        <div className="mt-28 border-t border-border pt-16">
          <SectionHeading
            eyebrow="Material Index"
            title="The Elements of Tactility"
            subtitle="The fundamental natural fibers we return to with every seasonal collection."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MATERIALS.map((m, idx) => (
              <FadeUp
                key={m.name}
                delay={idx * 0.08}
                className="border border-border bg-card/60 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="text-eyebrow text-muted-foreground">{m.origin}</span>
                  <h4 className="font-display text-xl mt-2">{m.name}</h4>
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                    {m.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/60">
                  <Link to="/shop" className="text-eyebrow text-accent link-underline">
                    View collection →
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Studio Locations */}
        <div className="mt-28 border-t border-border pt-16 bg-sand/30 p-10 md:p-14">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="text-eyebrow text-muted-foreground">Studio Jaipur</p>
              <h3 className="font-display text-2xl mt-1">Textile Archive & Workshop</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Civil Lines, Jaipur, Rajasthan 302006<br />
                Visits by private appointment for interior designers, architects, and patrons.
              </p>
            </div>
            <div>
              <p className="text-eyebrow text-muted-foreground">Studio Mumbai</p>
              <h3 className="font-display text-2xl mt-1">Design Studio & Client Concierge</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Kala Ghoda, Fort, Mumbai 400001<br />
                Concierge open Monday through Saturday, 10:00 — 19:00 IST.
              </p>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-border/70 flex flex-wrap gap-4 items-center justify-between">
            <p className="text-xs text-muted-foreground">Looking to discuss a custom architectural project?</p>
            <Link to="/contact" className="bg-ink text-ivory px-6 py-3 text-eyebrow">
              Connect with Concierge
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
