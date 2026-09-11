import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function FadeUp({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "p" | "h2";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/** Editorial clip reveal: image wipes up while easing out of a slight zoom. */
export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  width,
  height,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: reduce
      ? { clipPath: "inset(0 0 0 0)" }
      : { clipPath: "inset(0 0 100% 0)" },
    show: { clipPath: "inset(0 0 0 0)", transition: { duration: 1, ease: EASE } },
  };

  return (
    <motion.div
      className={`overflow-hidden ${className ?? ""}`}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName ?? ""}`}
        initial={reduce ? { scale: 1 } : { scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, ease: EASE }}
      />
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  return (
    <div
      className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${
        align === "center" ? "text-center md:flex-col md:items-center" : ""
      }`}
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow ? (
          <FadeUp>
            <p className="text-eyebrow text-muted-foreground">{eyebrow}</p>
          </FadeUp>
        ) : null}
        <FadeUp delay={0.06}>
          <h2 className="text-section font-display mt-4">{title}</h2>
        </FadeUp>
        {subtitle ? (
          <FadeUp delay={0.12}>
            <p className="text-muted-foreground mt-4 max-w-md text-base leading-relaxed">
              {subtitle}
            </p>
          </FadeUp>
        ) : null}
      </div>
      {action ? <FadeUp delay={0.16}>{action}</FadeUp> : null}
    </div>
  );
}
