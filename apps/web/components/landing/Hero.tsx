"use client";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full h-screen bg-gradient-to-b from-brand-dark2 to-brand-dark1 text-white overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6">
        <Image
          src="/logo.svg" // TODO: replace with optimized logo path
          alt="MwSP Academy logo"
          width={200}
          height={45}
          priority
        />
      </div>
      {/* Headline */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-center max-w-4xl leading-tight">
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
    </section>
  );
}
