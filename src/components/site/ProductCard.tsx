import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useState } from "react";
import { formatINR, type Product } from "@/lib/shop-data";
import { useShop } from "@/lib/store";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { wishlist, toggleWishlist, addToCart, setCartOpen } = useShop();
  const [added, setAdded] = useState(false);
  const saved = wishlist.includes(product.id);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <article className={`group relative flex flex-col ${className ?? ""}`} data-cursor="shop">
      <div className="bg-secondary relative aspect-[4/5] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:opacity-0"
        />
        <img
          src={product.images[1] ?? product.images[0]}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:opacity-100"
        />

        {product.badge ? (
          <span className="text-eyebrow bg-background/90 text-foreground absolute top-3 left-3 px-2.5 py-1.5">
            {product.badge}
          </span>
        ) : null}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
          className="bg-background/85 absolute top-2 right-2 grid size-11 place-items-center transition-transform duration-300 hover:scale-110"
        >
          <Heart
            className={`size-4 transition-colors ${saved ? "fill-accent text-accent" : "text-foreground"}`}
          />
        </button>

        <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 max-md:hidden">
          <button
            type="button"
            onClick={() => {
              addToCart(product.id, product.sizes[0]);
              setAdded(true);
              setCartOpen(true);
              window.setTimeout(() => setAdded(false), 1800);
            }}
            className="text-eyebrow bg-background text-foreground hover:bg-foreground hover:text-background w-full py-3.5 transition-colors duration-300"
          >
            {added ? "Added ✓" : "Add to cart"}
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <p className="text-eyebrow text-muted-foreground">{product.category}</p>
        <h3 className="text-[0.975rem] leading-snug font-medium">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="link-underline before:absolute before:inset-0 before:content-['']"
          >
            {product.name}
          </Link>
        </h3>
        <p className="flex items-baseline gap-2 text-sm">
          <span className="font-medium">{formatINR(product.price)}</span>
          <span className="text-muted-foreground line-through">{formatINR(product.mrp)}</span>
          <span className="text-accent">{discount}% off</span>
        </p>
      </div>
    </article>
  );
}
