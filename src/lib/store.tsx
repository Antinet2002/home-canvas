import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "./shop-data";

export type CartLine = { id: string; qty: number; size?: string | undefined };

type ShopState = {
  cart: CartLine[];
  wishlist: string[];
  cartOpen: boolean;
  searchOpen: boolean;
  menuOpen: boolean;
  addToCart: (id: string, size?: string) => void;
  setQty: (id: string, qty: number) => void;
  removeLine: (id: string) => void;
  toggleWishlist: (id: string) => void;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setMenuOpen: (v: boolean) => void;
  count: number;
  subtotal: number;
  lines: { product: Product; qty: number; size?: string | undefined }[];
};

const ShopContext = createContext<ShopState | null>(null);

const KEY = "maison-tara-shop";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { cart?: CartLine[]; wishlist?: string[] };
        if (parsed.cart) setCart(parsed.cart);
        if (parsed.wishlist) setWishlist(parsed.wishlist);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ cart, wishlist }));
    } catch {
      /* ignore */
    }
  }, [cart, wishlist]);

  useEffect(() => {
    const lock = cartOpen || searchOpen || menuOpen;
    document.body.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, searchOpen, menuOpen]);

  const addToCart = useCallback((id: string, size?: string) => {
    setCart((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { id, qty: 1, size }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const removeLine = useCallback((id: string) => {
    setCart((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]));
  }, []);

  const lines = useMemo(
    () =>
      cart
        .map((l) => {
          const product = products.find((p) => p.id === l.id);
          return product ? { product, qty: l.qty, size: l.size } : null;
        })
        .filter(Boolean) as { product: Product; qty: number; size?: string | undefined }[],
    [cart],
  );

  const value: ShopState = {
    cart,
    wishlist,
    cartOpen,
    searchOpen,
    menuOpen,
    addToCart,
    setQty,
    removeLine,
    toggleWishlist,
    setCartOpen,
    setSearchOpen,
    setMenuOpen,
    count: cart.reduce((s, l) => s + l.qty, 0),
    subtotal: lines.reduce((s, l) => s + l.product.price * l.qty, 0),
    lines,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
