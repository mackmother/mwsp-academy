"use client";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full h-[70vh] bg-gradient-to-b from-[#1F2124] to-[#383A3F] text-white overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6">
        <Image
          src="/logo.png" // TODO: replace with optimized logo path
          alt="MwSP Academy logo"
          width={180}
          height={42}
          priority
        />
      </div>
      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-center max-w-4xl leading-tight">
        Level-up Your MSP with <span className="text-[#F6B352]">World-Class</span> Playbooks & Courses
      </h1>
      {/* CTA buttons */}
      <div className="mt-8 flex gap-4">
        <Link
          href="/browse"
          className="px-6 py-3 rounded-md bg-[#F6B352] text-black font-semibold hover:opacity-90 transition"
        >
          Browse Courses
        </Link>
        <Link
          href="/api/auth/login"
          className="px-6 py-3 rounded-md border border-white font-semibold hover:bg-white hover:text-black transition"
        >
          Sign In
        </Link>
      </div>
      {/* Subtle background flair */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-[#F68657] opacity-10 blur-3xl rounded-full" />
      </div>
    </section>
  );
}
