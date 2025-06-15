import { config } from "dotenv";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
// Ensure env is loaded even when this file is imported first
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../../.env") });

import { Chunk, chunkText, embedChunks, saveChunks } from "./index";
import { supabase } from "./index";
import fetch from "node-fetch";

// --- ENV -------------------------------------------------------------------
const { MUX_TOKEN_ID, MUX_TOKEN_SECRET } = process.env;
if (!MUX_TOKEN_ID || !MUX_TOKEN_SECRET) {
  throw new Error("Missing Mux API credentials (MUX_TOKEN_ID / MUX_TOKEN_SECRET)");
}

// Base64 basic-auth header value once, reuse for all Mux API calls
const authHeader =
  "Basic " + Buffer.from(`${MUX_TOKEN_ID.trim()}:${MUX_TOKEN_SECRET.trim()}`).toString("base64");

// Minimal Mux transcript fetcher + ingestion helper
export async function ingestMuxAsset(
  muxAssetId: string,
  courseId: string,
  playbookType: string
) {
  // 1. Look up asset details to find playback_id & generated caption track
  const assetRes = await fetch(
    `https://api.mux.com/video/v1/assets/${muxAssetId}`,
    {
      headers: {
        Authorization: authHeader,
        Accept: "application/json"
      }
    }
  );
  if (!assetRes.ok) {
    throw new Error(`Failed to fetch asset details: ${assetRes.status}`);
  }
  const assetJson: any = await assetRes.json();
  console.log("✔ Fetched asset details from Mux");
  const playbackId = assetJson.data.playback_ids?.find((p: any) => p.policy === "public")?.id;
  const captionTrack = assetJson.data.tracks?.find(
    (t: any) => t.type === "text" && t.text_source === "generated_vod" && t.status === "ready"
  );
  if (!playbackId || !captionTrack) {
    throw new Error("Playback ID or generated_vod caption track not ready yet");
  }

  const url = `https://stream.mux.com/${playbackId}/text/${captionTrack.id}.vtt`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch transcript: ${res.status}`);
  const vtt = await res.text();
  console.log(`✔ Downloaded transcript VTT (${vtt.length} chars)`);
  const plain = vtt
    .split(/\n\n/)
    .filter((block) => !/^\d+$/.test(block.trim())) // remove cue numbers
    .map((b) => b.replace(/^[\d:\.\-, ]+\n/, "")) // remove timestamps
    .join(" ")
    .replace(/<[^>]+>/g, "") // strip tags
    .trim();

  // 2. Chunk, embed, save
  const chunks: Chunk[] = chunkText(plain);
  console.log(`✔ Chunked transcript into ${chunks.length} segments`);
  const embeddings = await embedChunks(chunks);
  console.log("✔ Received embeddings, saving to Supabase...");
  try {
    await saveChunks(courseId, playbookType, "transcript", chunks, embeddings);
  } catch (supErr: any) {
    throw new Error(`Supabase save error: ${JSON.stringify(supErr, null, 2)}`);
  }
}
