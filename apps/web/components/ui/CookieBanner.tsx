"use client";
import { useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white border-t shadow z-50 text-gray-700 text-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-center md:text-left">
          We use cookies to personalize content, improve your experience, and analyze traffic. By
          continuing, you consent to our cookies. {" "}
          <a href="/privacy-policy" className="text-primary underline hover:text-primary/80">
            Learn more
          </a>
          .
        </p>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
            onClick={() => setVisible(false)}
          >
            Decline
          </button>
          <button
            className="px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded"
            onClick={() => setVisible(false)}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
