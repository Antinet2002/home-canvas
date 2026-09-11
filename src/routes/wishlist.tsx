import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { products } from "@/lib/shop-data";
import { useShop } from "@/lib/store";
import { ProductCard } from "@/components/site/ProductCard";
import { FadeUp } from "@/components/site/Reveal";

export const Route = createFileRoute("/wishlist")({
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart, setCartOpen } = useShop();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    savedProducts.forEach((p) => {
      addToCart(p.id, p.sizes[0]);
    });
    setCartOpen(true);
  };

  const handleClearWishlist = () => {
    // toggle each off
    wishlist.forEach((id) => toggleWishlist(id));
  };

  return (
    <div className="pt-24 md:pt-32 pb-24">
      <div className="container-editorial">
        {/* Header */}
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-border pb-8">
            <div>
              <p className="text-eyebrow text-muted-foreground flex items-center gap-2">
                <Heart className="size-3.5 text-accent fill-accent" /> Saved Objects & Textiles
              </p>
              <h1 className="text-section font-display mt-2">Your Wishlist</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {savedProducts.length} {savedProducts.length === 1 ? "piece" : "pieces"} saved for later.
              </p>
            </div>

            {savedProducts.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleMoveAllToCart}
                  className="bg-ink text-ivory hover:bg-ink/90 px-6 py-3 text-eyebrow tracking-[0.16em] flex items-center gap-2"
                >
                  <ShoppingBag className="size-3.5" /> Move All to Bag
                </button>
                <button
                  type="button"
                  onClick={handleClearWishlist}
                  className="border border-border hover:bg-secondary px-4 py-3 text-eyebrow text-muted-foreground hover:text-foreground flex items-center gap-2"
                >
                  <Trash2 className="size-3.5" /> Clear
                </button>
              </div>
            )}
          </div>
        </FadeUp>

        {/* Content */}
        {savedProducts.length === 0 ? (
          <div className="py-24 max-w-md mx-auto text-center space-y-5">
            <div className="size-16 rounded-full bg-sand/60 text-clay grid place-items-center mx-auto">
              <Heart className="size-7" />
            </div>
            <h2 className="font-display text-3xl">Your wishlist is currently quiet</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Fill it with washed linens, sheer drapes, textured cushions, and objects that bring warmth to your home.
            </p>
            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-block bg-ink text-ivory px-8 py-4 text-eyebrow tracking-[0.16em]"
              >
                Discover the Collection
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {savedProducts.map((p) => (
              <div key={p.id} className="relative group">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
