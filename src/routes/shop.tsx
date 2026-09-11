import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { SlidersHorizontal, Sparkles } from "lucide-react";
import { products, type Product } from "@/lib/shop-data";
import { ProductCard } from "@/components/site/ProductCard";
import { FadeUp } from "@/components/site/Reveal";

type ShopSearch = {
  category?: string;
  sort?: "featured" | "price-asc" | "price-desc" | "rating";
};

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    category: typeof search.category === "string" ? search.category : undefined,
    sort: (search.sort as ShopSearch["sort"]) ?? undefined,
  }),
  component: ShopPage,
});

const ALL_CATEGORIES = [
  "All",
  "Bed Linen",
  "Curtains",
  "Cushion Covers",
  "Rugs",
  "Bath",
  "Living",
  "Decor",
  "Home Accessories",
] as const;

function ShopPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const selectedCategory = search.category || "All";
  const selectedSort = search.sort || "featured";

  const [activeFilterModal, setActiveFilterModal] = useState(false);

  const setCategory = (cat: string) => {
    navigate({
      to: "/shop",
      search: (prev) => ({
        ...prev,
        category: cat === "All" ? undefined : cat,
      }),
    });
  };

  const setSort = (sortVal: ShopSearch["sort"]) => {
    navigate({
      to: "/shop",
      search: (prev) => ({
        ...prev,
        sort: sortVal === "featured" ? undefined : sortVal,
      }),
    });
  };

  const filteredProducts = useMemo(() => {
    let list: Product[] = [...products];

    if (selectedCategory && selectedCategory !== "All") {
      list = list.filter((p) =>
        p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory === "Living" && (p.category === "Living" || p.category === "Cushion Covers")),
      );
    }

    if (selectedSort === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, selectedSort]);

  return (
    <div className="pt-24 md:pt-32 pb-24">
      {/* Editorial Page Header */}
      <div className="container-editorial">
        <FadeUp>
          <p className="text-eyebrow text-muted-foreground flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-clay" /> Sourced & Handwoven in India
          </p>
          <h1 className="text-section font-display mt-3">The Collection</h1>
          <p className="mt-4 text-muted-foreground max-w-xl text-base leading-relaxed">
            Slow-spun bedding, sheer and linen drapery, textured cushion covers, and braided rugs.
            Created to bring tactile peace to the home.
          </p>
        </FadeUp>

        {/* Filter and Sort Toolbar */}
        <div className="mt-12 flex flex-col gap-6 border-b border-border pb-6">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {ALL_CATEGORIES.map((cat) => {
              const active =
                (cat === "All" && (!selectedCategory || selectedCategory === "All")) ||
                selectedCategory === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`text-eyebrow px-4 py-2.5 whitespace-nowrap transition-all duration-200 border ${
                    active
                      ? "bg-ink text-ivory border-ink font-medium"
                      : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Counts & Sort Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>
                Showing <strong className="text-foreground">{filteredProducts.length}</strong> of{" "}
                <strong className="text-foreground">{products.length}</strong> pieces
              </span>
              {selectedCategory !== "All" && (
                <button
                  type="button"
                  onClick={() => setCategory("All")}
                  className="link-underline ml-2 text-accent"
                >
                  Reset filter
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="sort-select" className="text-eyebrow">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={selectedSort}
                onChange={(e) => setSort(e.target.value as ShopSearch["sort"])}
                className="bg-transparent border border-border px-3 py-1.5 text-xs text-foreground outline-none focus:border-clay"
              >
                <option value="featured">Curated (Featured)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="font-display text-3xl">No pieces found in this category</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Try switching your filter or explore our full catalog.
            </p>
            <button
              type="button"
              onClick={() => setCategory("All")}
              className="mt-6 bg-ink text-ivory px-7 py-3 text-eyebrow"
            >
              View all products
            </button>
          </div>
        ) : (
          <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {/* Assurance Ribbon */}
        <div className="mt-28 border-t border-border/80 pt-16 grid gap-8 sm:grid-cols-3 text-center">
          <div className="p-4">
            <h4 className="font-display text-xl">Complimentary Shipping</h4>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Safe doorstep delivery across all Indian pin codes on orders above ₹1,999.
            </p>
          </div>
          <div className="p-4 border-t sm:border-t-0 sm:border-x border-border/60">
            <h4 className="font-display text-xl">7-Day Doorstep Exchange</h4>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Not the right drape or color temperature? We arrange easy returns or exchanges.
            </p>
          </div>
          <div className="p-4">
            <h4 className="font-display text-xl">Generational Craft</h4>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              100% authentic handloom and stoneware, supporting traditional artisan families.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
