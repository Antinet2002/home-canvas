import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/eus-data";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const solid = scrolled || !overHero;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,height] duration-500 ${
          solid
            ? "bg-background/90 border-border text-foreground h-16 border-b backdrop-blur-xl md:h-[4.5rem]"
            : "text-ivory h-20 bg-transparent md:h-24"
        }`}
      >
        <div className="container-editorial flex h-full items-center justify-between gap-6">
          <Link to="/" className="flex items-baseline gap-2 leading-none">
            <span className="font-display text-2xl tracking-[0.18em]">EUS</span>
            <span className="text-eyebrow opacity-70">Interior</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} className="link-underline text-[0.82rem] tracking-[0.04em]">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/consultation"
              className={`hidden h-11 items-center px-5 text-[0.78rem] tracking-[0.08em] uppercase transition-colors sm:inline-flex ${
                solid ? "bg-primary text-primary-foreground hover:bg-accent" : "bg-ivory text-ink hover:bg-accent hover:text-ivory"
              }`}
            >
              Book consultation
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="grid size-11 place-items-center lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="bg-background fixed inset-0 z-[70] flex flex-col lg:hidden"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="container-editorial flex h-20 items-center justify-between">
              <span className="font-display text-2xl tracking-[0.18em]">EUS</span>
              <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} className="grid size-11 place-items-center">
                <X className="size-5" />
              </button>
            </div>
            <nav aria-label="Mobile" className="container-editorial mt-6 flex flex-col">
              {[{ label: "Home", to: "/" as const }, ...navLinks].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.5, ease: EASE }}
                >
                  <Link to={l.to} className="border-border font-display block border-b py-4 text-3xl">
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="container-editorial mt-auto pb-10">
              <Link to="/consultation" className="bg-primary text-primary-foreground flex h-14 items-center justify-center text-sm tracking-[0.1em] uppercase">
                Book a free consultation
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
