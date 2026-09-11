import bedLinen from "@/assets/cat-bed-linen.jpg";
import curtains from "@/assets/cat-curtains.jpg";
import cushions from "@/assets/cat-cushions.jpg";
import rugs from "@/assets/cat-rugs.jpg";
import bath from "@/assets/cat-bath.jpg";
import shopTheLook from "@/assets/shop-the-look.jpg";
import story from "@/assets/story.jpg";
import sustainability from "@/assets/sustainability.jpg";
import patternFloral from "@/assets/pattern-floral.jpg";
import patternGeometric from "@/assets/pattern-geometric.jpg";
import patternBotanical from "@/assets/pattern-botanical.jpg";
import patternStripes from "@/assets/pattern-stripes.jpg";
import journal1 from "@/assets/journal-1.jpg";
import journal2 from "@/assets/journal-2.jpg";
import journal3 from "@/assets/journal-3.jpg";
import pBedsheet from "@/assets/p-bedsheet.jpg";
import pCushion from "@/assets/p-cushion.jpg";
import pCurtain from "@/assets/p-curtain.jpg";
import pRug from "@/assets/p-rug.jpg";
import pTowel from "@/assets/p-towel.jpg";
import pLamp from "@/assets/p-lamp.jpg";
import pThrow from "@/assets/p-throw.jpg";
import pDecor from "@/assets/p-decor.jpg";

import hero from "@/assets/hero.jpg";

export const images = {
  hero,
  bedLinen,
  curtains,
  cushions,
  rugs,
  bath,
  shopTheLook,
  story,
  sustainability,
  patternFloral,
  patternGeometric,
  patternBotanical,
  patternStripes,
  journal1,
  journal2,
  journal3,
};

export const heroImage = hero;

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  mrp: number;
  images: string[];
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  badge?: string;
  material: string;
  care: string;
  description: string;
};

const make = (p: Omit<Product, "slug">): Product => ({
  ...p,
  slug: p.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
});

export const products: Product[] = [
  make({
    id: "p1",
    name: "Sahar Washed Linen Bedsheet Set",
    category: "Bed Linen",
    price: 4290,
    mrp: 5990,
    images: [pBedsheet, bedLinen],
    colors: ["Ivory", "Clay", "Sand"],
    sizes: ["Single", "Queen", "King"],
    rating: 4.8,
    reviews: 214,
    badge: "New",
    material: "100% stonewashed French linen, 180 GSM",
    care: "Machine wash cold, tumble dry low, warm iron if needed.",
    description:
      "Woven from long-staple flax and stonewashed twice, this set softens with every wash. A quiet, breathable base layer for a bedroom that feels unhurried.",
  }),
  make({
    id: "p2",
    name: "Rann Textured Cushion Cover",
    category: "Cushion Covers",
    price: 1190,
    mrp: 1590,
    images: [pCushion, cushions],
    colors: ["Terracotta", "Ivory", "Olive"],
    sizes: ['16" x 16"', '18" x 18"', '24" x 24"'],
    rating: 4.7,
    reviews: 168,
    badge: "New",
    material: "Handloom cotton with raised dobby texture",
    care: "Gentle machine wash, dry in shade.",
    description:
      "A deep clay tone with a subtle raised weave that catches afternoon light. Made on handlooms in Bhuj by a family workshop we've worked with for years.",
  }),
  make({
    id: "p3",
    name: "Noor Sheer Linen Curtain",
    category: "Curtains",
    price: 2890,
    mrp: 3990,
    images: [pCurtain, curtains],
    colors: ["Oat", "Ivory", "Mist"],
    sizes: ["5 ft", "7 ft", "9 ft"],
    rating: 4.9,
    reviews: 302,
    badge: "Bestseller",
    material: "Pure linen sheer, 120 GSM",
    care: "Dry clean recommended for best drape.",
    description:
      "Light passes through and turns golden. A softly weighted hem keeps the fall clean from rod to floor.",
  }),
  make({
    id: "p4",
    name: "Kutch Handwoven Jute Rug",
    category: "Rugs",
    price: 7490,
    mrp: 10990,
    images: [pRug, rugs],
    colors: ["Natural", "Charcoal"],
    sizes: ["3x5 ft", "5x8 ft", "6x9 ft"],
    rating: 4.6,
    reviews: 96,
    material: "Handwoven jute and recycled cotton",
    care: "Vacuum regularly, spot clean with a damp cloth.",
    description:
      "Braided by hand in tight, even rows. Grounding underfoot and built to take years of everyday living.",
  }),
  make({
    id: "p5",
    name: "Aara Combed Cotton Bath Towel",
    category: "Bath",
    price: 1490,
    mrp: 1990,
    images: [pTowel, bath],
    colors: ["Ivory", "Clay", "Slate"],
    sizes: ["Hand", "Bath", "Bath Sheet"],
    rating: 4.8,
    reviews: 421,
    badge: "Bestseller",
    material: "600 GSM long-staple combed cotton",
    care: "Wash before first use. No fabric softener.",
    description:
      "Dense, quick-drying pile with a low-twist finish that stays soft past the hundredth wash.",
  }),
  make({
    id: "p6",
    name: "Mira Ceramic Table Lamp",
    category: "Home Accessories",
    price: 5290,
    mrp: 6990,
    images: [pLamp, shopTheLook],
    colors: ["Sand", "Stone"],
    sizes: ["One size"],
    rating: 4.7,
    reviews: 74,
    badge: "New",
    material: "Wheel-thrown stoneware with linen shade",
    care: "Wipe with a dry cloth.",
    description:
      "Thrown on a wheel, glazed in a matte oatmeal, and topped with an unbleached linen shade for a warm, diffused glow.",
  }),
  make({
    id: "p7",
    name: "Dune Quilted Cotton Throw",
    category: "Living",
    price: 3490,
    mrp: 4790,
    images: [pThrow, journal1],
    colors: ["Clay", "Ivory"],
    sizes: ["Single", "Double"],
    rating: 4.9,
    reviews: 133,
    material: "Cotton velvet face with cotton fill",
    care: "Gentle machine wash cold, dry flat.",
    description:
      "Channel-quilted and lightly weighted — the layer you reach for on the sofa and end up sleeping under.",
  }),
  make({
    id: "p8",
    name: "Saanjh Woven Table Set",
    category: "Decor",
    price: 2190,
    mrp: 2990,
    images: [pDecor, journal3],
    colors: ["Earth", "Natural"],
    sizes: ["Set of 4", "Set of 6"],
    rating: 4.5,
    reviews: 58,
    material: "Hand-braided sabai grass and stoneware",
    care: "Wipe clean, keep dry.",
    description:
      "Braided in Odisha from sabai grass, paired with a speckled stoneware bowl for everyday table settings.",
  }),
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const categories = [
  {
    name: "Bed Linen",
    description: "Washed linen and cotton for slower mornings.",
    image: bedLinen,
    span: "lg" as const,
  },
  {
    name: "Curtains",
    description: "Light, filtered and softened.",
    image: curtains,
    span: "md" as const,
  },
  {
    name: "Cushion Covers",
    description: "Texture in small, changeable doses.",
    image: cushions,
    span: "md" as const,
  },
  {
    name: "Rugs",
    description: "Handwoven ground for every room.",
    image: rugs,
    span: "lg" as const,
  },
  {
    name: "Bath",
    description: "Dense cotton, quiet colour.",
    image: bath,
    span: "md" as const,
  },
  {
    name: "Living",
    description: "Throws, cushions and quiet comfort.",
    image: shopTheLook,
    span: "md" as const,
  },
];

export const patterns = [
  { name: "Floral", image: patternFloral },
  { name: "Geometric", image: patternGeometric },
  { name: "Botanical", image: patternBotanical },
  { name: "Stripes", image: patternStripes },
];

export const hotspots = [
  { id: "p2", x: 46, y: 55 },
  { id: "p3", x: 17, y: 34 },
  { id: "p4", x: 62, y: 84 },
  { id: "p6", x: 37, y: 36 },
  { id: "p7", x: 84, y: 63 },
];

export const journal = [
  {
    slug: "choosing-curtains",
    title: "How to choose curtains for every room",
    category: "Guides",
    read: "6 min read",
    image: journal2,
    excerpt:
      "Drop, fullness, header and fabric weight — the four decisions that change how a room reads.",
  },
  {
    slug: "refresh-your-bedroom",
    title: "Seven quiet ways to refresh a bedroom",
    category: "Styling",
    read: "5 min read",
    image: journal1,
    excerpt: "Small changes with outsized effect, none of which require new furniture.",
  },
  {
    slug: "mixing-patterns",
    title: "The art of mixing patterns at home",
    category: "Styling",
    read: "7 min read",
    image: journal3,
    excerpt: "Scale, repetition and one shared colour — a simple rule that rarely fails.",
  },
];

export const testimonials = [
  {
    quote:
      "Beautiful fabric, beautiful finish, and it completely changed how the room feels in the evening.",
    name: "Ananya Rao",
    location: "Bengaluru",
  },
  {
    quote:
      "The linen softened within two washes. It's the first bedding I've owned that actually improves with age.",
    name: "Kabir Menon",
    location: "Mumbai",
  },
  {
    quote:
      "Everything arrived beautifully packed. The colours are exactly as photographed, which is rare.",
    name: "Ishita Sharma",
    location: "New Delhi",
  },
];

export const socialTiles = [
  journal1,
  cushions,
  patternFloral,
  shopTheLook,
  rugs,
  patternGeometric,
  bath,
  journal2,
];

export const storyImage = story;
export const sustainabilityImage = sustainability;
export const shopTheLookImage = shopTheLook;

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const navLinks = [
  { label: "New Arrivals", to: "/shop" },
  { label: "Bed & Bath", to: "/shop" },
  { label: "Curtains", to: "/shop" },
  { label: "Living", to: "/shop" },
  { label: "Decor", to: "/shop" },
  { label: "Journal", to: "/journal" },
] as const;
