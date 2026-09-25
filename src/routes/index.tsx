import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FadeUp, ImageReveal, SectionHeading } from "@/components/site/Reveal";
import { Estimator } from "@/components/site/Estimator";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { ProjectCard } from "@/components/site/ProjectCard";
import { heroSlides, rooms, styles, projects, services, process, testimonials, designers, journal, img } from "@/lib/eus-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EUS Interior — Design a home that feels unmistakably yours" },
      { name: "description", content: "Premium interior design for apartments, villas, kitchens and bedrooms across India. Fixed quotes, 45-day delivery, free consultation." },
      { property: "og:title", content: "EUS Interior — Premium home interiors" },
      { property: "og:description", content: "Design a home that feels unmistakably yours. Explore projects, estimate costs and book a free consultation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const EASE = [0.22, 1, 0.36, 1] as const;

function Hero() {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % heroSlides.length), 6500);
    return () => clearInterval(t);
  }, []);
  const s = heroSlides[i]!;
  return (
    <section ref={ref} className="bg-ink text-ivory relative h-[100svh] min-h-[600px] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={s.image}
            src={s.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: EASE }}
          />
        </AnimatePresence>
      </motion.div>
      <div className="from-ink/80 via-ink/25 to-ink/30 absolute inset-0 bg-gradient-to-t" />
      <div className="container-editorial relative flex h-full flex-col justify-end pb-14 md:pb-20">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-eyebrow opacity-80">
          Interior design studio · Est. 2014
        </motion.p>
        <h1 className="mt-5 max-w-5xl text-[clamp(3rem,7vw,6.9rem)] leading-[0.95] font-light tracking-[-0.035em] uppercase">
          Design your
          <br />
          <AnimatePresence mode="wait">
            <motion.span
              key={s.line}
              className="font-display inline-block normal-case italic"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {s.line}
            </motion.span>
          </AnimatePresence>
        </h1>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-wrap gap-3">
            <Link to="/consultation" className="bg-ivory text-ink hover:bg-accent hover:text-ivory inline-flex h-14 items-center gap-3 px-7 text-sm tracking-[0.1em] uppercase transition-colors">
              Book free consultation <ArrowRight className="size-4" />
            </Link>
            <Link to="/projects" className="border-ivory/50 hover:bg-ivory hover:text-ink inline-flex h-14 items-center px-7 text-sm tracking-[0.1em] uppercase transition-colors border">
              See our work
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-sm opacity-80">{s.kicker}</span>
            <div className="flex gap-2">
              {heroSlides.map((sl, n) => (
                <button key={sl.image} type="button" aria-label={`Show slide ${n + 1}`} onClick={() => setI(n)} className="bg-ivory/30 relative h-[2px] w-10 overflow-hidden">
                  {n === i ? (
                    <motion.span key={i} className="bg-ivory absolute inset-y-0 left-0" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 6.5, ease: "linear" }} />
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const [style, setStyle] = useState(0);
  return (
    <>
      <Hero />

      {/* Trust strip */}
      <section className="border-border border-b">
        <div className="container-editorial grid grid-cols-2 gap-y-6 py-10 md:grid-cols-4">
          {[["1,200+", "Homes delivered"], ["45 days", "Guaranteed delivery"], ["10 yrs", "Joinery warranty"], ["4.9 / 5", "Client rating"]].map(([a, b]) => (
            <FadeUp key={b}>
              <p className="font-display text-4xl">{a}</p>
              <p className="text-muted-foreground mt-1 text-sm">{b}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Find your style */}
      <section className="container-editorial py-24 md:py-36">
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:items-center">
          <div>
            <SectionHeading eyebrow="Find your style" title={<>Every home begins with <em className="text-accent">a feeling.</em></>} />
            <ul className="mt-10">
              {styles.map((s, n) => (
                <li key={s.name}>
                  <button type="button" onClick={() => setStyle(n)} className={`border-border flex w-full items-baseline justify-between border-b py-5 text-left transition-opacity ${style === n ? "" : "opacity-45 hover:opacity-80"}`}>
                    <span className="font-display text-3xl">{s.name}</span>
                    <span className="text-muted-foreground hidden text-sm sm:block">{s.note}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            <AnimatePresence mode="sync">
              <motion.img key={style} src={[img.living, img.look, img.bedroom, img.kitchen][style]} alt={styles[style]!.name} className="absolute inset-0 h-full w-full object-cover" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: EASE }} />
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="container-editorial">
          <SectionHeading eyebrow="Explore by room" title={<>Rooms, <em>considered.</em></>} action={<Link to="/projects" className="link-underline text-sm">View all projects</Link>} />
        </div>
        <div className="hide-scrollbar container-editorial mt-12 flex snap-x gap-5 overflow-x-auto pb-4">
          {rooms.map((r) => (
            <Link key={r.name} to="/projects" className="group relative aspect-[3/4] w-[72vw] shrink-0 snap-start overflow-hidden sm:w-[40vw] lg:w-[24vw]">
              <img src={r.image} alt={r.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              <div className="from-ink/70 absolute inset-0 bg-gradient-to-t to-transparent" />
              <div className="text-ivory absolute inset-x-5 bottom-5 flex items-end justify-between">
                <div>
                  <p className="font-display text-3xl">{r.name}</p>
                  <p className="text-sm opacity-75">{r.count} projects</p>
                </div>
                <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="container-editorial py-24 md:py-36">
        <SectionHeading eyebrow="Selected work" title={<>Homes we've <em>lived into.</em></>} action={<Link to="/projects" className="link-underline text-sm">All projects</Link>} />
        <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-12">
          <FadeUp className="md:col-span-7"><ProjectCard p={projects[0]!} /></FadeUp>
          <FadeUp className="md:col-span-5 md:mt-32" delay={0.1}><ProjectCard p={projects[1]!} tall /></FadeUp>
          <FadeUp className="md:col-span-5"><ProjectCard p={projects[3]!} tall /></FadeUp>
          <FadeUp className="md:col-span-7 md:mt-24" delay={0.1}><ProjectCard p={projects[2]!} /></FadeUp>
        </div>
      </section>

      {/* Before / after */}
      <section className="bg-ink text-ivory py-24 md:py-32">
        <div className="container-editorial grid gap-12 md:grid-cols-[1fr_2fr] md:items-center">
          <div>
            <p className="text-eyebrow opacity-60">Transformation</p>
            <h2 className="text-section font-display mt-4">From bare shell to <em>home.</em></h2>
            <p className="mt-6 max-w-sm leading-relaxed opacity-75">Drag across the image. Same room in Baner, Pune — handed over 43 days after we began.</p>
          </div>
          <BeforeAfter />
        </div>
      </section>

      {/* Services */}
      <section className="container-editorial py-24 md:py-36">
        <SectionHeading eyebrow="What we do" title={<>One studio. <em>Every detail.</em></>} />
        <div className="mt-14">
          {services.map((s) => (
            <FadeUp key={s.n}>
              <Link to="/services" className="group border-border grid grid-cols-[3rem_1fr] items-baseline gap-4 border-t py-8 md:grid-cols-[5rem_1.2fr_1fr_2rem]">
                <span className="text-muted-foreground text-sm">{s.n}</span>
                <span className="font-display text-3xl transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">{s.title}</span>
                <span className="text-muted-foreground col-start-2 text-sm md:col-start-auto">{s.text}</span>
                <ArrowUpRight className="hidden size-5 md:block" />
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="container-editorial">
          <SectionHeading eyebrow="How it works" title={<>Five steps to <em>moving in.</em></>} />
          <ol className="mt-14 grid gap-10 md:grid-cols-5">
            {process.map((p, n) => (
              <FadeUp as="li" key={p.n} delay={n * 0.08} className="border-foreground/20 border-t pt-6">
                <p className="font-display text-accent text-5xl">{p.n}</p>
                <p className="mt-4 font-medium">{p.title}</p>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{p.text}</p>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>

      {/* Estimator */}
      <section className="container-editorial py-24 md:py-36">
        <SectionHeading eyebrow="Cost estimator" title={<>Know your budget <em>in a minute.</em></>} subtitle="Three quick choices. An honest range. No sign-up required." />
        <div className="mt-12"><Estimator /></div>
      </section>

      {/* Designers */}
      <section className="container-editorial pb-24 md:pb-36">
        <SectionHeading eyebrow="The people" title={<>Meet your <em>designers.</em></>} />
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {designers.map((d) => (
            <FadeUp key={d.name}>
              <ImageReveal src={d.image} alt={`Work by ${d.name}`} className="aspect-[4/5]" />
              <p className="font-display mt-5 text-2xl">{d.name}</p>
              <p className="text-muted-foreground text-sm">{d.role} · {d.years} years</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="container-editorial grid gap-12 md:grid-cols-3">
          {testimonials.map((t) => (
            <FadeUp key={t.name}>
              <p className="font-display text-2xl leading-snug italic">“{t.quote}”</p>
              <p className="mt-6 text-sm font-medium">{t.name}</p>
              <p className="text-muted-foreground text-sm">{t.place}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Journal */}
      <section className="container-editorial py-24 md:py-36">
        <SectionHeading eyebrow="Journal" title={<>Notes on <em>living well.</em></>} action={<Link to="/journal" className="link-underline text-sm">Read the journal</Link>} />
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {journal.map((j) => (
            <Link key={j.slug} to="/journal" className="group">
              <div className="aspect-[4/3] overflow-hidden"><img src={j.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" /></div>
              <p className="text-eyebrow text-muted-foreground mt-5">{j.tag} · {j.read}</p>
              <p className="font-display mt-2 text-2xl">{j.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <img src={img.story} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="bg-ink/60 absolute inset-0" />
        <div className="container-editorial text-ivory relative py-32 text-center md:py-48">
          <h2 className="text-hero font-display mx-auto max-w-4xl">Let's begin with <em>a conversation.</em></h2>
          <Link to="/consultation" className="bg-ivory text-ink hover:bg-accent hover:text-ivory mt-12 inline-flex h-14 items-center gap-3 px-8 text-sm tracking-[0.1em] uppercase transition-colors">
            Book free consultation <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
