import type { NextRequest } from "next/server";
import { ingestMuxAsset } from "@mwsp-academy/ai/mux";

/**
 * Mux sends a webhook when an asset is ready. Body example:
 * {
 *   "type": "video.asset.static_renditions.ready",
 *   "data": {
 *     "id": "MUX_ASSET_ID",
 *     "passthrough": "courseId:PLAYBOOK_TYPE" // we store metadata here
 *   }
 * }
 */
export async function POST(req: NextRequest) {
  const payload = await req.json();
  const event = payload?.type;

  if (event !== "video.asset.static_renditions.ready") {
    return Response.json({ ok: true }); // ignore other events
  }

  const asset = payload.data;
  const passthrough = asset?.passthrough as string | undefined;
  if (!passthrough) {
    console.warn("Mux webhook missing passthrough metadata");
    return Response.json({ ok: false });
  }

  // Parse passthrough -> "courseId:PLAYBOOK_TYPE"
  const [courseId, playbookType] = passthrough.split(":");
  try {
    await ingestMuxAsset(asset.id, courseId, playbookType.toUpperCase());
    return Response.json({ ok: true });
  } catch (err: any) {
    console.error("Mux ingest failed", err);
    return new Response("Error", { status: 500 });
  }
}
