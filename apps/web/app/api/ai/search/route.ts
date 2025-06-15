import { supabase } from "@mwsp-academy/ai";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q") || "";
  const topK = parseInt(req.nextUrl.searchParams.get("topK") ?? "5", 10);
  const threshold = parseFloat(req.nextUrl.searchParams.get("threshold") ?? "0.7");
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
    match_threshold: threshold,
    match_count: topK,
  });
  if (error) {
    // Return the full Postgres error details for easier debugging
    const body = JSON.stringify(error, null, 2);
    return new Response(body, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return Response.json({ results: data });
}
