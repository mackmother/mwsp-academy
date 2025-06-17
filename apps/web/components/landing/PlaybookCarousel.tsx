"use client";
import Image from "next/image";

const dummyCards = [
  { title: "Sales Playbook", img: "/placeholder/course1.jpg" },
  { title: "Marketing Playbook", img: "/placeholder/course2.jpg" },
  { title: "Operations Playbook", img: "/placeholder/course3.jpg" },
  { title: "Customer Success", img: "/placeholder/course4.jpg" },
  { title: "Pricing Strategies", img: "/placeholder/course5.jpg" },
];

export default function PlaybookCarousel() {
  return (
    <section className="bg-brand-dark2 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
        Popular Playbooks
      </h2>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 px-6 md:px-10 w-max">
          {dummyCards.map((c) => (
            <div
              key={c.title}
              className="relative w-64 h-36 rounded-lg overflow-hidden shrink-0 group cursor-pointer"
            >
              <Image
                src={c.img}
                alt={c.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition" />
              <span className="absolute bottom-3 left-3 text-white font-semibold text-sm">
                {c.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
