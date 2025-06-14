import { supabase } from "@mwsp-academy/ai";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q") || "";
  if (!query) return new Response("Missing q", { status: 400 });

  // 1. Embed the query with OpenAI (same model as chunks)
  const { default: OpenAI } = await import("openai");
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const {
    data: [embed],
  } = await openai.embeddings.create({
    input: query,
    model: "text-embedding-3-small",
  });

  // 2. Vector similarity search via rpc function (cosine distance)
  const { data, error } = await supabase.rpc("match_ai_chunks", {
    query_embedding: embed.embedding,
    match_threshold: 0.8,
    match_count: 5,
  });
  if (error) {
    console.error(error);
    return new Response("Search error", { status: 500 });
  }

  return Response.json({ results: data });
}
