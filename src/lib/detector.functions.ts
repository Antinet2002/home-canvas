import { createServerFn } from "@tanstack/react-start";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";

const inputSchema = z.object({
  text: z.string().min(20, "Please paste at least 20 characters.").max(12000),
});

export type ManipulationFlag = {
  tactic: string;
  quote: string;
  explanation: string;
  severity: "low" | "medium" | "high";
};

export type DetectorResult = {
  score: number;
  verdict: string;
  summary: string;
  flags: ManipulationFlag[];
  advice: string;
};

const SYSTEM_PROMPT = `You are an expert detector of digital lies and manipulation. Analyze the user-provided text (it may be an ad, social media post, message, news snippet, review, or sales pitch).

Identify manipulation and deception tactics such as: fake urgency or scarcity, emotional manipulation (fear, guilt, FOMO), false authority or fake testimonials, misleading statistics, clickbait, hidden costs or conditions, gaslighting, love-bombing, phishing/social-engineering cues, exaggerated or unverifiable claims, and loaded language.

Respond with ONLY a JSON object (no markdown, no code fences) in this exact shape:
{
  "score": <integer 0-100, where 0 = completely honest/neutral and 100 = extremely manipulative or deceptive>,
  "verdict": <one of: "Likely genuine", "Mildly persuasive", "Manipulative", "Highly manipulative / likely scam">,
  "summary": <2-3 sentence plain-language assessment>,
  "flags": [ { "tactic": <short tactic name>, "quote": <exact short quote from the text>, "explanation": <why it is manipulative, 1-2 sentences>, "severity": <"low"|"medium"|"high"> } ],
  "advice": <1-2 sentences of practical advice for the reader>
}
Include at most 6 flags, ordered by severity. If the text is honest, return an empty flags array and a low score.`;

export const analyzeText = createServerFn({ method: "POST" })
  .inputValidator((data) => inputSchema.parse(data))
  .handler(async ({ data, signal }): Promise<DetectorResult> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured on the server.");

    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });

    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      abortSignal: signal,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: data.text }],
      providerOptions: {
        openai: {
          store: false,
          forceReasoning: true,
          reasoningEffort: "medium",
          reasoningSummary: "auto",
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    const raw = (await result.text).trim();
    const jsonText = raw.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
    let parsed: DetectorResult;
    try {
      parsed = JSON.parse(jsonText) as DetectorResult;
    } catch {
      throw new Error("The AI returned an unreadable result. Please try again.");
    }
    parsed.score = Math.max(0, Math.min(100, Math.round(Number(parsed.score) || 0)));
    parsed.flags = Array.isArray(parsed.flags) ? parsed.flags.slice(0, 6) : [];
    return parsed;
  });
