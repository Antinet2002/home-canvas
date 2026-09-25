import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { img } from "@/lib/eus-data";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Book a Free Design Consultation — EUS Interior" },
      { name: "description", content: "Meet an EUS designer for a free 45-minute consultation, at home, online or at an experience centre." },
      { property: "og:title", content: "Book a Free Design Consultation — EUS Interior" },
      { property: "og:description", content: "Tell us about your home and meet your designer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConsultationPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().regex(/^[0-9+\s-]{10,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(120),
  city: z.string().min(1, "Choose a city"),
  home: z.string().min(1, "Choose a home type"),
});

const field = "border-border focus:border-foreground w-full border-b bg-transparent py-3 text-lg outline-none transition-colors";

function ConsultationPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      for (const i of r.error.issues) errs[String(i.path[0])] = i.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setDone(true);
  };

  return (
    <section className="grid min-h-screen md:grid-cols-2">
      <div className="relative hidden md:block">
        <img src={img.living} alt="A calm living room designed by EUS" className="absolute inset-0 h-full w-full object-cover" />
        <div className="from-ink/70 absolute inset-0 bg-gradient-to-t to-transparent" />
        <p className="font-display text-ivory absolute inset-x-12 bottom-12 text-4xl italic">“The best homes start with listening.”</p>
      </div>
      <div className="flex items-center px-6 pt-32 pb-20 md:px-16">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <span className="bg-accent text-accent-foreground grid size-14 place-items-center rounded-full"><Check /></span>
                <h1 className="text-section font-display mt-8">Thank you. <em>We'll call soon.</em></h1>
                <p className="text-muted-foreground mt-5 text-lg">A designer will reach out within one working day to schedule your consultation.</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0 }} className="space-y-8">
                <div>
                  <p className="text-eyebrow text-muted-foreground">Free consultation</p>
                  <h1 className="text-section font-display mt-4">Tell us about <em>your home.</em></h1>
                </div>
                {([["name", "Full name", "text"], ["phone", "Phone number", "tel"], ["email", "Email", "email"]] as const).map(([n, l, t]) => (
                  <label key={n} className="block">
                    <span className="text-muted-foreground text-sm">{l}</span>
                    <input name={n} type={t} className={field} aria-invalid={!!errors[n]} />
                    {errors[n] ? <span className="text-destructive mt-1 block text-sm">{errors[n]}</span> : null}
                  </label>
                ))}
                <div className="grid gap-8 sm:grid-cols-2">
                  {([["city", "City", ["Bengaluru", "Mumbai", "Pune", "Hyderabad", "Gurugram", "Other"]], ["home", "Home type", ["1 BHK", "2 BHK", "3 BHK", "4 BHK+", "Villa"]]] as const).map(([n, l, opts]) => (
                    <label key={n} className="block">
                      <span className="text-muted-foreground text-sm">{l}</span>
                      <select name={n} defaultValue="" className={field}>
                        <option value="" disabled>Select</option>
                        {opts.map((o) => <option key={o}>{o}</option>)}
                      </select>
                      {errors[n] ? <span className="text-destructive mt-1 block text-sm">{errors[n]}</span> : null}
                    </label>
                  ))}
                </div>
                <button type="submit" className="bg-primary text-primary-foreground hover:bg-accent h-14 w-full text-sm tracking-[0.1em] uppercase transition-colors">Request my consultation</button>
                <p className="text-muted-foreground text-xs">No spam, no obligation. Your details stay with EUS.</p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
