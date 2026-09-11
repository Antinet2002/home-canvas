import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronRight, Heart, Minus, Plus, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { formatINR, getProduct, products, type Product } from "@/lib/shop-data";
import { useShop } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";
import { FadeUp } from "@/components/site/Reveal";

export const Route = createFileRoute("/product/$slug")({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);

  const { addToCart, setCartOpen, wishlist, toggleWishlist } = useShop();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("material");

  if (!product) {
    return (
      <div className="container-editorial pt-32 pb-24 text-center">
        <h1 className="font-display text-4xl">Product Not Found</h1>
        <p className="mt-3 text-muted-foreground text-sm">
          The piece you're looking for might have been moved or is currently unavailable.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-block bg-ink text-ivory px-8 py-3.5 text-eyebrow"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const activeImg = selectedImage || product.images[0];
  const activeColor = selectedColor || product.colors[0];
  const activeSize = selectedSize || product.sizes[0];
  const isSaved = wishlist.includes(product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product.id, activeSize);
    }
    setAddedNotice(true);
    setCartOpen(true);
    window.setTimeout(() => setAddedNotice(false), 2000);
  };

  const colorMap: Record<string, string> = {
    Ivory: "#FBF9F5",
    Clay: "#A75D43",
    Terracotta: "#B85D3B",
    Sand: "#DECDBB",
    Oat: "#D8CCBC",
    Natural: "#C5B29B",
    Mist: "#E0E3DE",
    Stone: "#9D988F",
    Charcoal: "#333333",
    Slate: "#525A61",
    Olive: "#656B52",
    Earth: "#7E5835",
  };

  return (
    <div className="pt-20 md:pt-28 pb-24">
      <div className="container-editorial">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="py-4 text-xs text-muted-foreground flex items-center gap-1.5">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="size-3" />
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <ChevronRight className="size-3" />
          <Link
            to="/shop"
            search={{ category: product.category }}
            className="hover:text-foreground"
          >
            {product.category}
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="mt-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-[4/5] bg-secondary overflow-hidden">
              <img
                src={activeImg}
                alt={product.name}
                className="h-full w-full object-cover transition-all duration-500"
              />
              {product.badge && (
                <span className="text-eyebrow bg-background/90 text-foreground absolute top-4 left-4 px-3 py-1.5">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative size-20 sm:size-24 bg-secondary shrink-0 overflow-hidden border transition-all ${
                      activeImg === img ? "border-ink" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-5 flex flex-col">
            <p className="text-eyebrow text-muted-foreground">{product.category}</p>
            <h1 className="font-display text-3xl md:text-4xl mt-2 leading-tight">
              {product.name}
            </h1>

            {/* Ratings & Reviews */}
            <div className="mt-3 flex items-center gap-3 text-xs">
              <div className="flex text-clay">{"★".repeat(5)}</div>
              <span className="font-medium text-foreground">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Pricing */}
            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-3xl text-foreground">
                {formatINR(product.price)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {formatINR(product.mrp)}
              </span>
              <span className="text-xs text-accent font-medium">{discount}% savings</span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Inclusive of all taxes. Free shipping applied at checkout.
            </p>

            <hr className="my-6 border-border" />

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs mb-3">
                  <span className="text-eyebrow">Color</span>
                  <span className="text-muted-foreground">{activeColor}</span>
                </div>
                <div className="flex gap-2.5">
                  {product.colors.map((c) => {
                    const isSelected = activeColor === c;
                    const hex = colorMap[c] || "#999";
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSelectedColor(c)}
                        title={c}
                        className={`size-8 rounded-full border grid place-items-center transition-transform ${
                          isSelected ? "border-ink scale-110" : "border-border hover:scale-105"
                        }`}
                      >
                        <span
                          className="size-5 rounded-full border border-black/10"
                          style={{ backgroundColor: hex }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs mb-3">
                  <span className="text-eyebrow">Select Size</span>
                  <span className="text-muted-foreground">Standard fit</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((s) => {
                    const isSelected = activeSize === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`px-4 py-2.5 text-xs tracking-wider transition-all border ${
                          isSelected
                            ? "bg-ink text-ivory border-ink font-medium"
                            : "border-border bg-card text-foreground hover:border-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity and Add to Bag */}
            <div className="mt-4 flex gap-3">
              {/* Quantity */}
              <div className="border border-border flex items-center bg-card">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="grid size-12 place-items-center hover:bg-secondary"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="grid size-12 place-items-center hover:bg-secondary"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-ink text-ivory hover:bg-ink/90 text-eyebrow py-4 transition-colors tracking-[0.16em]"
              >
                {addedNotice ? "Added to Bag ✓" : `Add to Bag • ${formatINR(product.price * quantity)}`}
              </button>

              {/* Wishlist button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
                className="grid size-14 place-items-center border border-border bg-card hover:bg-secondary transition-colors"
              >
                <Heart
                  className={`size-5 ${isSaved ? "fill-accent text-accent" : "text-foreground"}`}
                />
              </button>
            </div>

            {/* Reassurance Badges */}
            <div className="mt-8 border-y border-border py-4 grid grid-cols-2 gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck className="size-4 text-clay shrink-0" />
                <span>Complimentary shipping over ₹1,999</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-clay shrink-0" />
                <span>7-day doorstep returns & exchanges</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="mt-6 divide-y divide-border border-b border-border">
              {/* Description */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === "desc" ? null : "desc")}
                  className="flex w-full items-center justify-between text-left text-sm font-medium"
                >
                  <span>Description & Feel</span>
                  <span className="text-muted-foreground">{openAccordion === "desc" ? "−" : "+"}</span>
                </button>
                {openAccordion === "desc" && (
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Material & Weave */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === "material" ? null : "material")}
                  className="flex w-full items-center justify-between text-left text-sm font-medium"
                >
                  <span>Material & Craft Heritage</span>
                  <span className="text-muted-foreground">{openAccordion === "material" ? "−" : "+"}</span>
                </button>
                {openAccordion === "material" && (
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                    {product.material}. Hand-finished by artisan workshops honoring centuries of weaving tradition.
                  </p>
                )}
              </div>

              {/* Care Instructions */}
              <div className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === "care" ? null : "care")}
                  className="flex w-full items-center justify-between text-left text-sm font-medium"
                >
                  <span>Care & Maintenance</span>
                  <span className="text-muted-foreground">{openAccordion === "care" ? "−" : "+"}</span>
                </button>
                {openAccordion === "care" && (
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                    {product.care}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-28 border-t border-border pt-16">
          <h3 className="font-display text-2xl md:text-3xl">Complete the Room</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Pieces curated to layer effortlessly with {product.name}.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
