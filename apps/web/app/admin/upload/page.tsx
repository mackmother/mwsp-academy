"use client";
import { useState, ChangeEvent } from "react";
// using native button instead of shadcn/ui
// native progress element

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string | null>(null);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
  }

  async function handleUpload() {
    if (!file) return;

    setStatus("Requesting upload URL…");
    const res = await fetch("/api/mux/direct-upload", { method: "POST" });
    if (!res.ok) {
      setStatus("Failed to get upload URL");
      return;
    }
    const { url } = await res.json();

    setStatus("Uploading to Mux…");
    await uploadToMux(url, file, setProgress);
    setStatus("Upload complete – Mux will process the video and generate captions. You can leave this page.");
  }

  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6">Upload Video or Audio</h1>
      <input type="file" accept="video/*,audio/*" onChange={handleFileChange} />
      {file && (
        <div className="mt-4 space-y-4">
          <p className="font-medium">{file.name}</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleUpload}>Upload</button>
          <progress className="w-full" value={progress} max={100} />
          {status && <p className="text-sm text-gray-600">{status}</p>}
        </div>
      )}
    </div>
  );
}

async function uploadToMux(
  url: string,
  file: File,
  onProgress: (pct: number) => void
) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", file.type);

    xhr.upload.onprogress = (evt) => {
      if (evt.lengthComputable) {
        const pct = Math.round((evt.loaded / evt.total) * 100);
        onProgress(pct);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress(100);
        resolve();
      } else {
        reject(new Error(`Upload failed: ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(file);
  });
}
