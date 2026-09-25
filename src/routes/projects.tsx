import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageIntro } from "@/components/site/PageIntro";
import { ProjectCard } from "@/components/site/ProjectCard";
import { FadeUp } from "@/components/site/Reveal";
import { projects } from "@/lib/eus-data";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — EUS Interior" },
      { name: "description", content: "Completed villas, apartments, kitchens and bedrooms designed by EUS Interior across India." },
      { property: "og:title", content: "Projects — EUS Interior" },
      { property: "og:description", content: "Browse completed homes designed and built by EUS Interior." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

const filters = ["All", "Villa", "3 BHK", "Kitchen", "Bedroom", "Bathroom"];

function ProjectsPage() {
  const [f, setF] = useState("All");
  const list = f === "All" ? projects : projects.filter((p) => p.type === f);
  return (
    <>
      <PageIntro eyebrow="Projects" title={<>Homes we've <em>lived into.</em></>} text="Each project is shaped around the people who live there. A selection from over 1,200 homes." />
      <section className="container-editorial pb-32">
        <div className="border-border flex flex-wrap gap-2 border-b pb-6">
          {filters.map((x) => (
            <button key={x} type="button" aria-pressed={f === x} onClick={() => setF(x)} className={`px-4 py-2 text-sm transition-colors ${f === x ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>{x}</button>
          ))}
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, n) => (
            <FadeUp key={p.slug} delay={(n % 3) * 0.08}><ProjectCard p={p} tall={n % 2 === 1} /></FadeUp>
          ))}
        </div>
      </section>
    </>
  );
}
