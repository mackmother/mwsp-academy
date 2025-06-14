import { Chunk, chunkText, embedChunks, saveChunks } from "./index";
import { supabase } from "./index";
import fetch from "node-fetch";

// Minimal Mux transcript fetcher + ingestion helper
export async function ingestMuxAsset(
  muxAssetId: string,
  courseId: string,
  playbookType: string
) {
  // 1. Fetch transcript from Mux (example URL, assumes WebVTT stored)
  const url = `https://stream.mux.com/${muxAssetId}.vtt`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch transcript: ${res.status}`);
  const vtt = await res.text();
  const plain = vtt
    .split(/\n\n/)
    .filter((block) => !/^\d+$/.test(block.trim())) // remove cue numbers
    .map((b) => b.replace(/^[\d:\.\-, ]+\n/, "")) // remove timestamps
    .join(" ")
    .replace(/<[^>]+>/g, "") // strip tags
    .trim();

  // 2. Chunk, embed, save
  const chunks: Chunk[] = chunkText(plain);
  const embeddings = await embedChunks(chunks);
  await saveChunks(courseId, playbookType, "transcript", chunks, embeddings);
}
