import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

// --- ENV -------------------------------------------------------------------
const {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE,
  OPENAI_API_KEY,
} = process.env;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  throw new Error("Missing Supabase env vars");
}
if (!OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY");
}

// --- Clients ----------------------------------------------------------------
export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE,
  {
    auth: { persistSession: false },
    db: { schema: "public" },
  }
);

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// --- Helpers ----------------------------------------------------------------
export interface Chunk {
  content: string;
  tokenCount: number;
}

/**
 * Very naive token estimator (4 chars ~ 1 token). Good enough for chunking.
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Splits text into ~500-token chunks (max 800 to leave room for metadata).
 */
export function chunkText(text: string, maxTokens = 500): Chunk[] {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const chunks: Chunk[] = [];
  let buffer = "";

  for (const sentence of sentences) {
    const next = buffer ? `${buffer} ${sentence}` : sentence;
    if (estimateTokens(next) > maxTokens && buffer) {
      chunks.push({ content: buffer, tokenCount: estimateTokens(buffer) });
      buffer = sentence; // start new buffer
    } else {
      buffer = next;
    }
  }
  if (buffer) {
    chunks.push({ content: buffer, tokenCount: estimateTokens(buffer) });
  }
  return chunks;
}

/**
 * Creates embeddings for a batch of chunks using OpenAI.
 */
export async function embedChunks(chunks: Chunk[]): Promise<Float32Array[]> {
  const texts = chunks.map((c) => c.content);
  const { data } = await openai.embeddings.create({
    input: texts,
    model: "text-embedding-3-small",
  });
  return data.map((d) => new Float32Array(d.embedding));
}

/**
 * Persists chunks + embeddings to Supabase `AiChunk`.
 */
export async function saveChunks(
  courseId: string,
  playbookType: string,
  source: "video" | "workbook" | "transcript",
  chunks: Chunk[],
  embeddings: Float32Array[]
) {
  const rows = chunks.map((c, idx) => ({
    course_id: courseId,
    playbook_type: playbookType,
    source,
    content: c.content,
    token_count: c.tokenCount,
    embedding: embeddings[idx],
  }));

  const { error } = await supabase.from("AiChunk").insert(rows);
  if (error) throw error;
}
