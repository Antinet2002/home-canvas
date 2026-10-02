import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2, ScanText, ShieldAlert, ShieldCheck } from "lucide-react";
import { analyzeText, type DetectorResult } from "@/lib/detector.functions";

export const Route = createFileRoute("/detector")({
  head: () => ({
    meta: [
      { title: "AI Lie & Manipulation Detector — EUS Interior" },
      { name: "description", content: "Paste any ad, message, post or review and let AI score it for manipulation tactics, fake urgency, emotional pressure and scam signals." },
      { property: "og:title", content: "AI Lie & Manipulation Detector" },
      { property: "og:description", content: "Instant AI analysis of manipulation and deception tactics in any text." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DetectorPage,
});

const SAMPLES: { label: string; text: string }[] = [
  {
    label: "Scam message",
    text: "URGENT: Your bank account has been compromised! You must verify your identity within 30 minutes or your account will be permanently frozen. Click here now and enter your OTP and card details. Do NOT contact the bank directly, they are too slow. Act fast — only 3 verification slots left today!",
  },
  {
    label: "Pushy ad",
    text: "90% of people are using the WRONG pillow and destroying their necks every night. Doctors hate this one weird trick! Our miracle pillow normally costs ₹9,999 but TODAY ONLY it's ₹999. Over 50,000 happy customers can't be wrong. Stock is almost gone — if you leave this page, this offer disappears forever.",
  },
  {
    label: "Honest review",
    text: "I bought this coffee maker three months ago. It brews well and is easy to clean, though the water tank is a bit small for a family of four. Delivery took five days, which was longer than promised. Overall I'm satisfied for the price, but I'd pay more for a larger tank next time.",
  },
];

function scoreColor(score: number) {
  if (score < 30) return "text-emerald-600";
  if (score < 60) return "text-amber-600";
  return "text-red-600";
}

function scoreRing(score: number) {
  if (score < 30) return "stroke-emerald-500";
  if (score < 60) return "stroke-amber-500";
  return "stroke-red-500";
}

const severityStyle: Record<string, string> = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-amber-100 text-amber-800 border-amber-200",
  low: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

function ScoreGauge({ score }: { score: number }) {
  const r = 54;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid size-40 place-items-center">
      <svg viewBox="0 0 128 128" className="size-40 -rotate-90">
        <circle cx="64" cy="64" r={r} fill="none" strokeWidth="10" className="stroke-foreground/10" />
        <circle
          cx="64" cy="64" r={r} fill="none" strokeWidth="10" strokeLinecap="round"
          className={scoreRing(score)}
          strokeDasharray={c}
          strokeDashoffset={c - (c * score) / 100}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute text-center">
        <p className={`font-display text-4xl ${scoreColor(score)}`}>{score}</p>
        <p className="text-muted-foreground text-[11px] tracking-[0.12em] uppercase">risk / 100</p>
      </div>
    </div>
  );
}

function DetectorPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DetectorResult | null>(null);

  async function run() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await analyzeText({ data: { text } });
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-editorial py-16 md:py-24">
      <p className="text-eyebrow text-muted-foreground">AI tool</p>
      <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[1.02] md:text-6xl">
        Digital lie &amp; <em className="text-accent">manipulation</em> detector
      </h1>
      <p className="text-muted-foreground mt-6 max-w-2xl leading-relaxed">
        Paste any ad, message, social post, news snippet or review. The AI reads it for fake urgency,
        emotional pressure, false claims and scam signals — then gives you a risk score with the exact
        lines it flagged.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        {/* Input */}
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            placeholder="Paste the text you want to check…"
            className="border-border bg-background focus:ring-accent w-full resize-y border p-5 text-sm leading-relaxed outline-none focus:ring-2"
          />
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={run}
              disabled={loading || text.trim().length < 20}
              className="bg-ink text-ivory hover:bg-accent inline-flex h-12 items-center gap-2 px-6 text-sm tracking-[0.08em] uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <ScanText className="size-4" />}
              {loading ? "Analyzing…" : "Analyze text"}
            </button>
            <span className="text-muted-foreground text-xs">{text.length} / 12000</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {SAMPLES.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setText(s.text)}
                className="border-border hover:bg-secondary border px-3 py-1.5 text-xs transition-colors"
              >
                Try: {s.label}
              </button>
            ))}
          </div>
          {error ? (
            <p className="mt-6 flex items-center gap-2 text-sm text-red-600">
              <AlertTriangle className="size-4" /> {error}
            </p>
          ) : null}
        </div>

        {/* Output */}
        <div className="border-border bg-secondary/40 min-h-[24rem] border p-6 md:p-8">
          {!result && !loading ? (
            <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-3 text-center">
              <ShieldCheck className="size-10 opacity-40" />
              <p className="max-w-xs text-sm">Your analysis will appear here — risk score, verdict, and every manipulative line explained.</p>
            </div>
          ) : null}

          {loading ? (
            <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-3">
              <Loader2 className="size-8 animate-spin" />
              <p className="text-sm">Reading between the lines…</p>
            </div>
          ) : null}

          {result ? (
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-6">
                <ScoreGauge score={result.score} />
                <div>
                  <p className={`flex items-center gap-2 text-lg font-medium ${scoreColor(result.score)}`}>
                    {result.score >= 60 ? <ShieldAlert className="size-5" /> : <CheckCircle2 className="size-5" />}
                    {result.verdict}
                  </p>
                  <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed">{result.summary}</p>
                </div>
              </div>

              {result.flags.length > 0 ? (
                <div>
                  <p className="text-eyebrow text-muted-foreground">Flagged tactics</p>
                  <ul className="mt-4 space-y-4">
                    {result.flags.map((f, i) => (
                      <li key={i} className="border-border bg-background border p-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-medium">{f.tactic}</span>
                          <span className={`border px-2 py-0.5 text-[11px] tracking-wide uppercase ${severityStyle[f.severity] ?? severityStyle.low}`}>
                            {f.severity}
                          </span>
                        </div>
                        {f.quote ? <blockquote className="border-accent text-muted-foreground mt-2 border-l-2 pl-3 text-sm italic">“{f.quote}”</blockquote> : null}
                        <p className="mt-2 text-sm leading-relaxed">{f.explanation}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="flex items-center gap-2 text-sm text-emerald-700">
                  <CheckCircle2 className="size-4" /> No manipulation tactics detected in this text.
                </p>
              )}

              <div className="border-border border-t pt-5">
                <p className="text-eyebrow text-muted-foreground">What to do</p>
                <p className="mt-2 text-sm leading-relaxed">{result.advice}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <p className="text-muted-foreground mt-10 max-w-2xl text-xs leading-relaxed">
        This tool gives an AI-based assessment, not a guarantee. Always verify sensitive requests
        (money, passwords, OTPs) through official channels before acting.
      </p>
    </div>
  );
}
