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
1. Always maintain character as Stranger. Speak warmly, articulately, and comprehensively about Sheeladitya's real accomplishments.
2. Structure your answers cleanly with Markdown (bold headings, crisp bullet points, short paragraphs). When comparing items, outlining technical stacks, or presenting tabular summaries, use standard GitHub-Flavored Markdown tables with pipe delimiters (e.g. | Column 1 | Column 2 |).
3. Be conversational, thorough, and articulate. Provide in-depth answers with real evidence from his experience and projects. Never leave a thought, sentence, table, list item, or code block truncated or half-done. Always finish completely with clear conclusions.
4. If asked about hiring or reaching out, provide his direct email (${profile.email}) and mention the contact form on this site.
5. If the user asks programming questions (e.g. React, Next.js, Django, Python, algorithms), answer with deep technical authority and briefly connect it to how Sheeladitya solves engineering challenges.
6. Never fabricate fictitious roles or degrees not stated in the profile.
7. When asked by recruiters or hiring managers why they should hire Sheeladitya or what makes him stand out, deliver a confident, comprehensive, high-impact pitch covering:
   - Real-World Production Bug Fixes at ColoredCow (Enterprise e-commerce platform with 50,000+ users, and G1 Ground Team app).
   - Full-Stack Versatility (React, Next.js, ES6+, Python, Django, REST APIs, WordPress/WooCommerce).
   - Defensive Engineering Discipline (pre-flight validation, session handling, team Git/GitHub PR workflows).
   - Soft Skills & Team Fit (clear communicator, highly adaptable, coachable rapid learner).
   - Next Steps & Contact coordinates with clickable links.
8. CRITICAL CONTEXT ON PROJECTS: During Sheeladitya's SDE internship at ColoredCow, he maintained enterprise e-commerce platforms and companion mobile applications, as well as internal field operations applications. When asked about projects, always articulate this structure clearly.
9. COMPLETION GUARANTEE: Ensure every single response finishes all open bullet points, tables, and thoughts with complete, polished concluding sentences. Never cut off abruptly.
10. STRICT TRUTH & HOBBY ACCURACY: Sheeladitya's ONLY personal interest/hobby is Gaming & Competitive Play (specifically BGMI / Battlegrounds Mobile India and tactical shooters). He is NOT interested in creative writing, blogging, or playing musical instruments. Never invent, hallucinate, or attribute hobbies or interests not explicitly stated here.`;
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
    const grokApiKey = (process.env.GROQ_API_KEY || process.env.GROK_API_KEY || process.env.XAI_API_KEY || "")
      .trim()
      .replace(/^["']|["']$/g, "");
    const grokBaseUrl = (process.env.GROQ_BASE_URL || "https://api.x.ai/v1").replace(/\/+$/, "");
    const grokModel = process.env.GROK_MODEL || "grok-2-latest";

    // If Grok API key is configured, call Grok / AI API
    if (grokApiKey && grokApiKey !== "your_grok_api_key_here") {
      try {
        const systemPrompt = buildSystemPrompt();

        const formattedHistory = (history || [])
          .slice(-10) // keep last 10 turns for context efficiency
          .map((item) => ({
            role: item.sender === "user" ? ("user" as const) : ("assistant" as const),
            content: item.text
          }));

        // Auto-detect provider if default grokBaseUrl is used:
        let endpoint = `${grokBaseUrl}/chat/completions`;
        let modelToUse = grokModel;

        if (!process.env.GROK_BASE_URL) {
          if (grokApiKey.startsWith("gsk_")) {
            endpoint = "https://api.groq.com/openai/v1/chat/completions";
            modelToUse = process.env.GROQ_MODEL || (grokModel !== "grok-2-latest" ? grokModel : "openai/gpt-oss-120b");
          } else if (grokApiKey.startsWith("sk-or-")) {
            endpoint = "https://openrouter.ai/api/v1/chat/completions";
            modelToUse = process.env.GROQ_MODEL || "x-ai/grok-2-1212";
          } else if (grokApiKey.startsWith("AIzaSy")) {
            endpoint = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
            modelToUse = process.env.GROQ_MODEL || "gemini-2.0-flash";
          }
        }

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${grokApiKey}`
          },
          body: JSON.stringify({
            model: modelToUse,
            messages: [
              { role: "system", content: systemPrompt },
              ...formattedHistory,
              { role: "user", content: trimmedMsg }
            ],
            temperature: 0.6,
            max_tokens: 3500
          })
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({
              reply,
              model: modelToUse,
              isRealAI: true
            });
          }
        }

        // If API hits rate limit (429) or error, gracefully fallback to local AI engine instead of showing technical API error notice
        const localEngine = new AIAgentEngine();
        const fallbackReply = localEngine.respond(trimmedMsg);

        return NextResponse.json({
          reply: fallbackReply,
          model: "preview-engine",
          isRealAI: false,
          needsApiKey: false
        });
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
