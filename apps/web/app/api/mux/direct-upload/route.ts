import { NextRequest } from "next/server";

// We lazy-import to avoid bundling Mux SDK in client builds
export async function POST(req: NextRequest) {
  const { default: Mux } = await import("@mux/mux-node");

  const { MUX_TOKEN_ID, MUX_TOKEN_SECRET } = process.env;
  if (!MUX_TOKEN_ID || !MUX_TOKEN_SECRET) {
    return new Response("Missing Mux credentials", { status: 500 });
  }

  const mux = new Mux({
    tokenId: MUX_TOKEN_ID,
    tokenSecret: MUX_TOKEN_SECRET,
  });

  try {
    const upload = await mux.video.uploads.create({
      new_asset_settings: {
        playback_policy: ["public"],
        // @ts-expect-error Mux types don't yet include this field
        generate_subtitles: true, // let Mux auto-transcribe
      },
      cors_origin: req.headers.get("origin") || "*",
    });

    return Response.json({ url: upload.url, id: upload.id });
  } catch (err) {
    console.error("Mux direct upload error", err);
    return new Response("Mux error", { status: 500 });
  }
}
