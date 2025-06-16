"use client";
import { ReactNode } from "react";

interface FeatureProps {
  icon: ReactNode;
  title: string;
  description: string;
}

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="text-4xl mb-4 text-[#F6B352]">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <p className="text-sm text-gray-300 max-w-xs">{description}</p>
    </div>
  );
}

export default function FeaturesGrid() {
  const features: FeatureProps[] = [
    {
      icon: "🎯",
      title: "Actionable Playbooks",
      description: "Step-by-step guides proven to grow recurring revenue for MSPs.",
    },
    {
      icon: "📈",
      title: "Expert Instructors",
      description: "Learn directly from industry leaders who have scaled multi-million-dollar MSPs.",
    },
    {
      icon: "⚡️",
      title: "Bite-Size Lessons",
      description: "Netflix-style episodes you can binge or watch on the go.",
    },
  ];

  return (
    <section className="bg-[#1F2124] py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-6">
        {features.map((f) => (
          <Feature key={f.title} {...f} />
        ))}
      </div>
    </section>
  );
}
