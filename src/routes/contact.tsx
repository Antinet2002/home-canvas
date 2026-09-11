import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Mail, MessageSquare, Phone, Send } from "lucide-react";
import { FadeUp } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

const FAQS = [
  {
    q: "How long does shipping take across India?",
    a: "Orders in major metros (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata) arrive in 3 to 4 business days. Other pin codes typically arrive in 5 to 7 business days. All orders above ₹1,999 enjoy complimentary carbon-neutral shipping.",
  },
  {
    q: "How do returns and doorstep exchanges work?",
    a: "We offer a 7-day doorstep return and exchange window. If a color doesn't harmonize with your room or the curtain length needs adjustment, simply message our concierge or initiate a return through our tracking portal. Our courier will pick up the package from your doorstep.",
  },
  {
    q: "Can I order fabric swatches before committing?",
    a: "Yes. Our Fabric Swatch Folio includes generous 6x6-inch cuts of all French linens, sheer weaves, and textured handloom cottons. It is available for ₹490, which is fully credited back as a gift card toward your next order.",
  },
  {
    q: "How should I wash and care for my stonewashed linen?",
    a: "Linen loves water. Machine wash on a gentle cycle with mild detergent in cool or lukewarm water. Tumble dry on low heat or hang dry in the shade. Linen is meant to have a relaxed, undulating drape, so ironing is completely optional.",
  },
  {
    q: "Do you provide custom curtain drops or trade discounts?",
    a: "Yes. For interior designers, architects, and custom room drops beyond our standard 5ft, 7ft, and 9ft lengths, please select 'Trade & Interior Designers' in the form or email trade@maisontara.com.",
  },
];

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "General Inquiries",
    orderId: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="pt-24 md:pt-32 pb-24">
      <div className="container-editorial">
        {/* Header */}
        <FadeUp>
          <p className="text-eyebrow text-muted-foreground flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-clay" /> Client Care & Concierge
          </p>
          <h1 className="text-section font-display mt-3">We are here to assist</h1>
          <p className="mt-4 text-muted-foreground max-w-xl text-base leading-relaxed">
            Whether you need sizing advice for a bay window, recommendations on color temperature,
            or tracking on an existing shipment, our concierge is at your service.
          </p>
        </FadeUp>

        {/* Contact Form & Info Grid */}
        <div className="mt-14 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Form */}
          <div className="lg:col-span-7 border border-border bg-card p-8 md:p-10 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="size-12 rounded-full bg-clay/15 text-clay grid place-items-center mx-auto">
                  <Check className="size-6" />
                </div>
                <h3 className="font-display text-3xl">Your message has been received</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  Thank you, {formData.name}. A member of our client concierge team will review your inquiry
                  and respond within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      topic: "General Inquiries",
                      orderId: "",
                      message: "",
                    });
                  }}
                  className="mt-6 bg-ink text-ivory px-6 py-3 text-eyebrow"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-display text-2xl">Send a dispatch to our studio</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Directly connected to our studio concierge in Mumbai & Jaipur.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="text-eyebrow block mb-2">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ananya Rao"
                      className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-clay"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-eyebrow block mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ananya@example.com"
                      className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-clay"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="topic" className="text-eyebrow block mb-2">
                      Inquiry Topic
                    </label>
                    <select
                      id="topic"
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-clay"
                    >
                      <option>General Inquiries</option>
                      <option>Custom Sizes & Curtain Drops</option>
                      <option>Fabric Swatches & Styling Advice</option>
                      <option>Order Tracking & Exchanges</option>
                      <option>Trade & Hospitality Projects</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="orderId" className="text-eyebrow block mb-2">
                      Order Reference (Optional)
                    </label>
                    <input
                      id="orderId"
                      value={formData.orderId}
                      onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                      placeholder="e.g. MT-8492"
                      className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-clay"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="text-eyebrow block mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your space, dimensions, or how we can help..."
                    className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground outline-none focus:border-clay"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-ink text-ivory hover:bg-ink/90 px-8 py-4 text-eyebrow tracking-[0.18em] transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <Send className="size-3.5" /> Dispatch Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="border border-border bg-card p-8">
              <p className="text-eyebrow text-accent">Direct Contact</p>
              <h3 className="font-display text-2xl mt-1">Concierge Desks</h3>

              <div className="mt-6 space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <Phone className="size-4 text-clay shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Phone & WhatsApp Concierge</p>
                    <p className="text-muted-foreground text-xs">+91 98200 12345</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Monday — Saturday, 10:00 — 19:00 IST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="size-4 text-clay shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Client Concierge Email</p>
                    <p className="text-muted-foreground text-xs">concierge@maisontara.com</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Average response under 4 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="size-4 text-clay shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Trade & Architectural Consultations</p>
                    <p className="text-muted-foreground text-xs">trade@maisontara.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fabric Swatch Ring Promo */}
            <div className="border border-clay/30 bg-clay/5 p-8">
              <p className="text-eyebrow text-clay">Tactile Swatch Folio</p>
              <h4 className="font-display text-xl mt-1">Test the drape in your own light</h4>
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                Order our 12-fabric swatch ring containing washed linen, sheer weaves, and combed cotton.
                The ₹490 fee is credited back immediately on your next order.
              </p>
              <a
                href="#name"
                onClick={() => setFormData((prev) => ({ ...prev, topic: "Fabric Swatches & Styling Advice" }))}
                className="mt-5 inline-block text-eyebrow text-clay underline underline-offset-4"
              >
                Request Swatch Folio →
              </a>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="mt-28 border-t border-border pt-16">
          <div className="max-w-2xl mb-12">
            <p className="text-eyebrow text-muted-foreground">Common Inquiries</p>
            <h2 className="text-section font-display mt-2">Frequently Asked Questions</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Everything you need to know about deliveries, returns, fabric care, and custom dimensions.
            </p>
          </div>

          <div className="divide-y divide-border border-y border-border max-w-4xl">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="py-5">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between text-left text-base font-medium"
                >
                  <span className="font-display text-xl">{faq.q}</span>
                  <span className="text-muted-foreground text-lg ml-4">
                    {openFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {openFaq === idx && (
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
