#!/usr/bin/env ts-node
/**
 * CLI helper to ingest a single Mux asset transcript into Supabase.
 *
 * Usage:
 *   pnpm --filter ai ingest <muxAssetId> <courseId> <playbookType>
 *
 * Example:
 *   pnpm --filter ai ingest ABC123 "intro-to-wifi" "Sales"
 */

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
// Load the repo-root .env (three levels up: scripts -> ai -> packages -> repo root)
config({ path: resolve(__dirname, "../../../.env") });
import { ingestMuxAsset } from "../mux.js";

async function main() {
  const [muxId, courseId, playbookType] = process.argv.slice(2);
  if (!muxId || !courseId || !playbookType) {
    console.error(
      "Usage: ingest <muxAssetId> <courseId> <playbookType>. Received insufficient args."
    );
    process.exit(1);
  }

  try {
    console.log(`Ingesting Mux asset ${muxId} ...`);
    await ingestMuxAsset(muxId, courseId, playbookType);
    console.log("✔ Ingestion complete");
  } catch (err) {
    if (err instanceof Error) {
      console.error("Ingestion failed (Error):", err.message, "\n", err.stack);
    } else {
      const { inspect } = await import("node:util");
      console.error("Ingestion failed (object):", inspect(err, { depth: 5, colors: false }));
    }
    process.exit(1);
  }
}

main();
