import { NextResponse } from "next/server";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { AIAgentEngine } from "@/lib/aiAgentEngine";

function buildSystemPrompt(): string {
  const { profile, experience, education, skillCategories, projects, developmentPractices } = PORTFOLIO_DATA;

  const projectSummaries = projects
    .map(
      (p) =>
        `- ${p.title} (${p.categoryLabel}): ${p.summary} Tech Stack: ${p.tech.join(", ")}. Highlights: ${p.highlights.join("; ")}`
    )
    .join("\n");

  const skillSummaries = skillCategories
    .map((c) => `- ${c.title}: ${c.skills.map((s) => s.name).join(", ")}`)
    .join("\n");

const experienceSummaries = experience
    .map(
      (exp) =>
        `- Company: ${exp.company}\n  Role: ${exp.role} (${exp.period}, ${exp.type})\n  Key Contributions:\n${exp.points.map((pt) => `    * ${pt}`).join("\n")}`
    )
    .join("\n\n");

  return `You are "Stranger", the official AI representative and digital twin of Sheeladitya Vinay Kumar.
You are embedded inside his personal software engineering portfolio website.

YOUR IDENTITY & PERSONA:
- Name: Stranger.
- Origin of Name: Named after Sheeladitya's long-time gamer tag in BGMI and competitive games. You wear this moniker proudly to reflect strategic focus, precision under pressure, and rapid adaptability.
- Character: Sharp, articulate, enthusiastic, humble yet confident, and deeply technical.
- Role: Guide recruiters, hiring managers, and developers through Sheeladitya's background, code contributions, and technical expertise.

SHEELADITYA'S PROFILE:
- Full Name: ${profile.name} (Sheeladitya)
- Title: ${profile.title}
- Core Headline: ${profile.headline}
- Location: ${profile.location}
- Direct Email: ${profile.email}
- GitHub: ${profile.githubUrl}
- Education: ${education.degree} in ${education.major} at ${education.institution} (${education.period})
- Availability: ${profile.statusText} (open to Full-Time, Remote, Hybrid, and Relocation)

PROFESSIONAL EXPERIENCE:
${experienceSummaries}

FEATURED PROJECTS:
${projectSummaries}

TECHNICAL SKILLSET:
${skillSummaries}

ENGINEERING WORKFLOWS & PRACTICES:
${developmentPractices.map((d) => `- ${d.title}: ${d.desc}`).join("\n")}

CONVERSATION INSTRUCTIONS:
1. Always maintain character as Stranger. Speak warmly and informatively about Sheeladitya's real accomplishments.
2. Structure your answers cleanly with Markdown (bold headings, crisp bullet points, short paragraphs).
3. Be conversational and concise (avoid walls of unformatted text).
4. If asked about hiring or reaching out, provide his direct email (${profile.email}) and mention the contact form on this site.
5. If the user asks programming questions (e.g. React, Next.js, Django, Python, algorithms), answer with deep technical authority and briefly connect it to how Sheeladitya solves engineering challenges.
6. Never fabricate fictitious roles or degrees not stated in the profile.`;
}

interface IncomingMessage {
  sender: "user" | "assistant";
  text: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history } = body as {
      message?: string;
      history?: IncomingMessage[];
    };

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const trimmedMsg = message.trim();
    const grokApiKey = (process.env.GROK_API_KEY || process.env.XAI_API_KEY || "").trim();
    const grokBaseUrl = (process.env.GROK_BASE_URL || "https://api.x.ai/v1").replace(/\/+$/, "");
    const grokModel = process.env.GROK_MODEL || "grok-2-latest";

    // If Grok API key is configured, call Grok API
    if (grokApiKey && grokApiKey !== "your_grok_api_key_here") {
      try {
        const systemPrompt = buildSystemPrompt();

        const formattedHistory = (history || [])
          .slice(-10) // keep last 10 turns for context efficiency
          .map((item) => ({
            role: item.sender === "user" ? ("user" as const) : ("assistant" as const),
            content: item.text
          }));

        const response = await fetch(`${grokBaseUrl}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${grokApiKey}`
          },
          body: JSON.stringify({
            model: grokModel,
            messages: [
              { role: "system", content: systemPrompt },
              ...formattedHistory,
              { role: "user", content: trimmedMsg }
            ],
            temperature: 0.6,
            max_tokens: 800
          })
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({
              reply,
              model: grokModel,
              isRealAI: true
            });
          }
        }

        const errorText = await response.text();
        console.warn(`[Grok API Response Error]: ${response.status} - ${errorText}`);
      } catch (err) {
        console.error("[Grok API Network Error]:", err);
      }
    }

    // Graceful fallback when API key is not yet provided or if network issue occurs
    const localEngine = new AIAgentEngine();
    const fallbackReply = localEngine.respond(trimmedMsg);

    return NextResponse.json({
      reply: fallbackReply,
      model: "preview-engine",
      isRealAI: false,
      needsApiKey: !grokApiKey || grokApiKey === "your_grok_api_key_here"
    });
  } catch (error) {
    console.error("[Chat Route Error]:", error);
    return NextResponse.json(
      { error: "Internal server error processing chat message." },
      { status: 500 }
    );
  }
}
