import type { ReactNode } from "react";
import { FadeUp } from "./Reveal";

export function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text?: string }) {
  return (
    <section className="container-editorial pt-36 pb-16 md:pt-44 md:pb-20">
      <FadeUp><p className="text-eyebrow text-muted-foreground">{eyebrow}</p></FadeUp>
      <FadeUp delay={0.06}><h1 className="text-hero font-display mt-5 max-w-5xl">{title}</h1></FadeUp>
      {text ? <FadeUp delay={0.12}><p className="text-muted-foreground mt-8 max-w-xl text-lg leading-relaxed">{text}</p></FadeUp> : null}
    </section>
  );
}
