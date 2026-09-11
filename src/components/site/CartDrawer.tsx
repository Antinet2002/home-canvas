import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, X } from "lucide-react";
import { formatINR } from "@/lib/shop-data";
import { useShop } from "@/lib/store";

const EASE = [0.22, 1, 0.36, 1] as const;

export function CartDrawer() {
  const { cartOpen, setCartOpen, lines, setQty, removeLine, subtotal } = useShop();

  return (
    <AnimatePresence>
      {cartOpen ? (
        <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Shopping bag">
          <motion.button
            type="button"
            aria-label="Close bag"
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
          <motion.aside
            className="bg-background absolute inset-y-0 right-0 flex w-full max-w-[27rem] flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="border-border flex items-center justify-between border-b px-6 py-5">
              <h2 className="text-eyebrow">Your bag ({lines.length})</h2>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close bag"
                className="grid size-10 place-items-center"
              >
                <X className="size-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-10 text-center">
                <p className="font-display text-3xl">Your space is waiting for something beautiful.</p>
                <Link
                  to="/shop"
                  onClick={() => setCartOpen(false)}
                  className="text-eyebrow bg-foreground text-background px-7 py-4"
                >
                  Start shopping
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y overflow-y-auto px-6">
                  {lines.map(({ product, qty, size }) => (
                    <li key={product.id} className="flex gap-4 py-5">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        loading="lazy"
                        className="bg-secondary size-24 shrink-0 object-cover"
                      />
                      <div className="flex flex-1 flex-col gap-2">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm leading-snug font-medium">{product.name}</p>
                            <p className="text-muted-foreground text-xs">{size ?? product.sizes[0]}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeLine(product.id)}
                            aria-label={`Remove ${product.name}`}
                            className="text-muted-foreground hover:text-foreground text-xs"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="border-border flex items-center border">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => setQty(product.id, qty - 1)}
                              className="grid size-9 place-items-center"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm">{qty}</span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => setQty(product.id, qty + 1)}
                              className="grid size-9 place-items-center"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <span className="text-sm">{formatINR(product.price * qty)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-border border-t px-6 py-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-eyebrow">Subtotal</span>
                    <span className="font-display text-2xl">{formatINR(subtotal)}</span>
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <button
                    type="button"
                    className="text-eyebrow bg-foreground text-background mt-5 w-full py-4 transition-opacity hover:opacity-90"
                  >
                    Checkout
                  </button>
                  <button
                    type="button"
                    onClick={() => setCartOpen(false)}
                    className="link-underline mx-auto mt-4 block text-xs"
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
