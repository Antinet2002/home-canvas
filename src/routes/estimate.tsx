import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/PageIntro";
import { Estimator } from "@/components/site/Estimator";

export const Route = createFileRoute("/estimate")({
  head: () => ({
    meta: [
      { title: "Interior Cost Estimator — EUS Interior" },
      { name: "description", content: "Estimate the cost of your home interiors in under a minute. Choose home type, rooms and finish level." },
      { property: "og:title", content: "Interior Cost Estimator — EUS Interior" },
      { property: "og:description", content: "An honest budget range for your home interiors in three quick choices." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <PageIntro eyebrow="Cost estimator" title={<>Know your budget <em>in a minute.</em></>} text="Choose your home, the rooms you want designed and a finish level. Your designer will confirm a fixed quote." />
      <section className="container-editorial pb-32"><Estimator /></section>
    </>
  ),
});
