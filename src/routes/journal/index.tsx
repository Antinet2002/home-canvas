import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { journal } from "@/lib/shop-data";
import { FadeUp } from "@/components/site/Reveal";

export const Route = createFileRoute("/journal/")({
  component: JournalIndexPage,
});

const CATEGORIES = ["All", "Guides", "Styling", "Craft Heritage"];

function JournalIndexPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? journal
    : journal.filter((item) => item.category === activeCategory);

  const featured = journal[0];

  return (
    <div className="pt-24 md:pt-32 pb-24">
      <div className="container-editorial">
        {/* Header */}
        <FadeUp>
          <p className="text-eyebrow text-muted-foreground flex items-center gap-2">
            <BookOpen className="size-3.5 text-clay" /> Slower Living & Interior Essays
          </p>
          <h1 className="text-section font-display mt-3">The Journal</h1>
          <p className="mt-4 text-muted-foreground max-w-xl text-base leading-relaxed">
            Explorations into natural light, fabric drape, generational loom techniques, and the quiet
            rituals that make a house feel anchored.
          </p>
        </FadeUp>

        {/* Featured Hero Story */}
        {featured && (
          <div className="mt-14 border border-border bg-card/60 overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 aspect-[16/10] bg-secondary overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-eyebrow text-muted-foreground">
                  <span className="text-accent">{featured.category}</span>
                  <span>•</span>
                  <span>{featured.read}</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl mt-3 leading-snug">
                  <Link to="/journal/$slug" params={{ slug: featured.slug }} className="link-underline">
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="mt-8">
                  <Link
                    to="/journal/$slug"
                    params={{ slug: featured.slug }}
                    className="inline-flex items-center gap-2 bg-ink text-ivory px-6 py-3.5 text-eyebrow"
                  >
                    Read Essay <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="mt-20 flex items-center gap-2 border-b border-border pb-4 overflow-x-auto hide-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`text-eyebrow px-4 py-2 border transition-all ${
                activeCategory === cat
                  ? "bg-ink text-ivory border-ink"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Journal Grid */}
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {filtered.map((entry, idx) => (
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
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
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
              <div className="mt-4">
                <Link
                  to="/journal/$slug"
                  params={{ slug: entry.slug }}
                  className="text-eyebrow text-accent inline-flex items-center gap-1.5 link-underline"
                >
                  Read story <ArrowRight className="size-3" />
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  );
}
