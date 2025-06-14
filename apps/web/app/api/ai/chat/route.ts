import { supabase } from "@mwsp-academy/ai";
import OpenAI from "openai";
import { NextRequest } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { question, courseId } = body as {
    question: string;
    courseId?: string;
  };
  if (!question) return new Response("Missing question", { status: 400 });

  // 1. Embed question and find 4 relevant chunks for context.
  const {
    data: [embed],
  } = await openai.embeddings.create({
    input: question,
    model: "text-embedding-3-small",
  });
  const { data: matches } = await supabase.rpc("match_ai_chunks", {
    query_embedding: embed.embedding,
    match_threshold: 0.8,
    match_count: 4,
    course_filter: courseId ?? null,
  });
  const context = matches?.map((m: any) => m.content).join("\n\n") ?? "";

  // 2. Chat completion with context
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: false,
    messages: [
      {
        role: "system",
        content:
          "You are an AI coach for MSP Academy. Use the provided context to answer the user question. If unsure, say you don't know.",
      },
      { role: "system", content: `CONTEXT:\n${context}` },
      { role: "user", content: question },
    ],
  });

  return Response.json({
    answer: completion.choices[0].message.content,
    sources: matches?.map((m: any) => ({ id: m.id, source: m.source })) ?? [],
  });
}
