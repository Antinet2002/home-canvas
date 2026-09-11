import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/shop-data";
import { useShop } from "@/lib/store";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const { count, setCartOpen, setSearchOpen, menuOpen, setMenuOpen, wishlist } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !overHero;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          solid
            ? "bg-background/85 border-border h-16 border-b backdrop-blur-xl md:h-[4.5rem]"
            : "h-20 bg-transparent md:h-24"
        } ${solid ? "text-foreground" : "text-background"}`}
      >
        <div className="container-editorial flex h-full items-center justify-between gap-6">
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="grid size-11 place-items-center lg:hidden"
          >
            <Menu className="size-5" />
          </button>

          <Link
            to="/"
            className="font-display text-[1.35rem] leading-none tracking-[0.28em] uppercase max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2"
          >
            Tara
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="link-underline text-[0.8rem] tracking-[0.06em] whitespace-nowrap"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-0.5">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="grid size-11 place-items-center"
            >
              <Search className="size-[1.05rem]" />
            </button>
            <Link
              to="/about"
              aria-label="Account"
              className="grid size-11 place-items-center max-md:hidden"
            >
              <User className="size-[1.05rem]" />
            </Link>
            <Link
              to="/wishlist"
              aria-label={`Wishlist, ${wishlist.length} items`}
              className="relative grid size-11 place-items-center max-md:hidden"
            >
              <Heart className="size-[1.05rem]" />
              {wishlist.length > 0 ? (
                <span className="bg-accent text-accent-foreground absolute top-1.5 right-1 grid size-4 place-items-center rounded-full text-[0.6rem]">
                  {wishlist.length}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              aria-label={`Shopping bag, ${count} items`}
              onClick={() => setCartOpen(true)}
              className="relative grid size-11 place-items-center"
            >
              <ShoppingBag className="size-[1.05rem]" />
              {count > 0 ? (
                <span className="bg-accent text-accent-foreground absolute top-1.5 right-1 grid size-4 place-items-center rounded-full text-[0.6rem]">
                  {count}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-[70] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-background absolute inset-0 flex flex-col"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <div className="container-editorial flex h-20 items-center justify-between">
                <span className="font-display text-[1.35rem] tracking-[0.28em] uppercase">
                  Tara
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="grid size-11 place-items-center"
                >
                  <X className="size-5" />
                </button>
              </div>
              <nav aria-label="Mobile" className="container-editorial mt-6 flex flex-col">
                {navLinks.map((l, i) => (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.06, duration: 0.5, ease: EASE }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setMenuOpen(false)}
                      className="border-border font-display block border-b py-5 text-3xl"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="container-editorial text-eyebrow mt-auto flex gap-6 pb-10">
                <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
                  Wishlist
                </Link>
                <Link to="/about" onClick={() => setMenuOpen(false)}>
                  Our story
                </Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
