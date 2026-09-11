import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { formatINR, products } from "@/lib/shop-data";
import { useShop } from "@/lib/store";

const EASE = [0.22, 1, 0.36, 1] as const;
const TRENDING = ["Curtains", "Floral", "Bedsheets", "Cushions", "Rugs"];

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useShop();
  const [term, setTerm] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(term.trim().toLowerCase()), 220);
    return () => window.clearTimeout(t);
  }, [term]);

  useEffect(() => {
    if (!searchOpen) setTerm("");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, setSearchOpen]);

  const results = debounced
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(debounced) || p.category.toLowerCase().includes(debounced),
      )
    : [];

  return (
    <AnimatePresence>
      {searchOpen ? (
        <motion.div
          className="bg-background fixed inset-0 z-[85] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <div className="container-editorial py-8">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="grid size-11 place-items-center"
              >
                <X className="size-5" />
              </button>
            </div>

            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <input
              id="site-search"
              autoFocus
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="What are you looking for?"
              className="font-display border-border placeholder:text-muted-foreground w-full border-b bg-transparent pb-6 text-[clamp(1.75rem,5vw,3.5rem)] outline-none"
            />

            {results.length === 0 ? (
              <div className="mt-10">
                {debounced ? (
                  <p className="font-display text-2xl">We couldn't find that.</p>
                ) : (
                  <p className="text-eyebrow text-muted-foreground">Trending searches</p>
                )}
                <div className="mt-5 flex flex-wrap gap-3">
                  {TRENDING.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTerm(t)}
                      className="border-border hover:bg-secondary border px-5 py-2.5 text-sm transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      to="/product/$slug"
                      params={{ slug: p.slug }}
                      onClick={() => setSearchOpen(false)}
                      className="group block"
                    >
                      <div className="bg-secondary aspect-[4/5] overflow-hidden">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <p className="mt-3 text-sm font-medium">{p.name}</p>
                      <p className="text-muted-foreground text-sm">{formatINR(p.price)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
