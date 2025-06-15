import { config } from "dotenv";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Ensure environment variables are loaded BEFORE anything else
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../../.env") });

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
    // --- Resolve course ID ----------------------------------------------------
  // If the caller supplied a real UUID we use it directly; otherwise treat the
  // value as a slug/title and create the Course with a fresh UUID.
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  let cid = courseId;
  if (!uuidRegex.test(courseId)) {
    // Provided string is not a UUID; create a new Course and use its generated UUID.
    const { randomUUID } = await import("node:crypto");
    cid = randomUUID();
    await supabase.from("Course").insert({
      id: cid,
      title: courseId.replace(/-/g, " "), // use original arg as title
      playbook_type: playbookType.toUpperCase(),
    });
  } else {
    // If UUID, ensure course exists (insert minimal row if missing)
    const { data: existing } = await supabase
      .from("Course")
      .select("id")
      .eq("id", cid)
      .single();
    if (!existing) {
      await supabase.from("Course").insert({
        id: cid,
        title: "Untitled Course",
        playbook_type: playbookType.toUpperCase(),
      });
    }
  }

  const rows = chunks.map((c, idx) => ({
    course_id: cid,
    playbook_type: playbookType.toUpperCase(), // ensure matches Postgres enum (e.g., "SALES")
    source,
    content: c.content,
    token_count: c.tokenCount,
    // Supabase pgvector expects number[] not Float32Array
    embedding: Array.from(embeddings[idx]),
  }));

  const { error, data: inserted } = await supabase
    .from("AiChunk")
    .insert(rows)
    .select()
    .throwOnError();
  console.log("Inserted rows:", Array.isArray(inserted) ? inserted.length : 0);
  if (error) {
    console.error("Supabase insertion error fields:", {
      message: (error as any).message,
      details: (error as any).details,
      hint: (error as any).hint,
      code: (error as any).code,
    });
    throw error;
  }
}
