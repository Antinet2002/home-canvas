import hero from "@/assets/hero.jpg";
import kitchen from "@/assets/room-kitchen.jpg";
import bedroom from "@/assets/room-bedroom.jpg";
import bath from "@/assets/cat-bath.jpg";
import living from "@/assets/after.jpg";
import before from "@/assets/before.jpg";
import story from "@/assets/story.jpg";
import look from "@/assets/shop-the-look.jpg";
import craft from "@/assets/sustainability.jpg";
import j1 from "@/assets/journal-1.jpg";
import j2 from "@/assets/journal-2.jpg";
import j3 from "@/assets/journal-3.jpg";

export const img = { hero, kitchen, bedroom, bath, living, before, story, look, craft, j1, j2, j3 };

export const navLinks = [
  { label: "Projects", to: "/projects" as const },
  { label: "Services", to: "/services" as const },
  { label: "Cost estimate", to: "/estimate" as const },
  { label: "Journal", to: "/journal" as const },
  { label: "Studio", to: "/about" as const },
];

export const heroSlides = [
  { image: hero, kicker: "Residence · Bengaluru", line: "way of living." },
  { image: living, kicker: "Apartment · Pune", line: "quiet mornings." },
  { image: kitchen, kicker: "Kitchen · Mumbai", line: "gathering places." },
];

export const rooms = [
  { name: "Living rooms", count: 48, image: living },
  { name: "Kitchens", count: 36, image: kitchen },
  { name: "Bedrooms", count: 41, image: bedroom },
  { name: "Bathrooms", count: 22, image: bath },
  { name: "Complete homes", count: 64, image: hero },
  { name: "Wardrobes & study", count: 19, image: story },
];

export const styles = [
  { name: "Warm minimal", note: "Limewash, oak, linen, restraint." },
  { name: "Modern Indian", note: "Cane, brass, handloom, heritage." },
  { name: "Japandi", note: "Low lines, pale wood, stillness." },
  { name: "Contemporary luxe", note: "Stone, walnut, sculptural light." },
];

export type Project = {
  slug: string;
  title: string;
  city: string;
  type: string;
  area: string;
  budget: string;
  image: string;
};

export const projects: Project[] = [
  { slug: "koramangala", title: "The Courtyard House", city: "Bengaluru", type: "Villa", area: "4,200 sq ft", budget: "₹82L", image: hero },
  { slug: "baner", title: "Light on Baner", city: "Pune", type: "3 BHK", area: "1,650 sq ft", budget: "₹28L", image: living },
  { slug: "bandra", title: "Travertine Kitchen", city: "Mumbai", type: "Kitchen", area: "240 sq ft", budget: "₹11L", image: kitchen },
  { slug: "jubilee", title: "Walnut Suite", city: "Hyderabad", type: "Bedroom", area: "320 sq ft", budget: "₹7L", image: bedroom },
  { slug: "gurgaon", title: "Stone & Steam", city: "Gurugram", type: "Bathroom", area: "110 sq ft", budget: "₹4.5L", image: bath },
  { slug: "alibaug", title: "The Slow Weekend", city: "Alibaug", type: "Villa", area: "3,100 sq ft", budget: "₹64L", image: look },
];

export const services = [
  { n: "01", title: "Full home interiors", text: "Concept to keys: layout, joinery, lighting, styling, handover." },
  { n: "02", title: "Modular kitchens", text: "Ergonomic kitchens built in our own factory with 10-year warranty." },
  { n: "03", title: "Wardrobes & storage", text: "Made-to-measure storage that disappears into the architecture." },
  { n: "04", title: "Renovation", text: "Civil, electrical and plumbing work handled by one accountable team." },
  { n: "05", title: "Furniture & styling", text: "Curated and custom pieces, art and textiles to finish the story." },
];

export const process = [
  { n: "01", title: "Meet your designer", text: "A free 45-minute conversation about how you live." },
  { n: "02", title: "Concept & 3D", text: "Mood, layouts and photoreal renders you can walk through." },
  { n: "03", title: "Book & finalise", text: "Materials sampled in person, fixed quote, no surprises." },
  { n: "04", title: "Build", text: "Factory-made joinery, site work tracked in your app." },
  { n: "05", title: "Move in", text: "Styled, cleaned, photographed, and handed over in 45 days." },
];

export const designers = [
  { name: "Aditi Rao", role: "Principal designer", years: 14, image: story },
  { name: "Kabir Menon", role: "Kitchen specialist", years: 9, image: kitchen },
  { name: "Meher Shah", role: "Styling lead", years: 11, image: look },
];

export const testimonials = [
  { quote: "They listened more than they spoke. Our home finally feels like us — calm, warm, unhurried.", name: "Ritika & Arjun", place: "3 BHK, Pune" },
  { quote: "Delivered in 44 days with a fixed quote. I have never experienced a renovation this honest.", name: "Sanjay Iyer", place: "Villa, Bengaluru" },
  { quote: "The kitchen is the room everyone gathers in now. Every drawer is exactly where it should be.", name: "Nisha Kapoor", place: "Kitchen, Mumbai" },
];

export const journal = [
  { slug: "limewash-guide", title: "Why limewash is the quietest luxury", tag: "Materials", read: "5 min", image: j1, excerpt: "A mineral finish that softens light and ages beautifully in Indian climates." },
  { slug: "small-kitchen", title: "Designing a small kitchen that cooks big", tag: "Kitchens", read: "7 min", image: j2, excerpt: "Work triangles, tall units and the one drawer every Indian kitchen needs." },
  { slug: "monsoon-ready", title: "Making your home monsoon-ready", tag: "Living", read: "4 min", image: j3, excerpt: "Finishes, fabrics and ventilation choices that survive four humid months." },
];

export const formatINR = (n: number) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${Math.round(n).toLocaleString("en-IN")}`;
