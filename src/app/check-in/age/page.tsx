"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AgeSelector() {
  const router = useRouter();
  const [selectedAge, setSelectedAge] = useState<number | null>(null);

  const ageRanges = [
    { label: "13-17", value: 15 },
    { label: "18-24", value: 21 },
    { label: "25-34", value: 30 },
    { label: "35-44", value: 40 },
    { label: "45-54", value: 50 },
    { label: "55-64", value: 60 },
    { label: "65+", value: 65 },
  ];

  const handleAgeSelect = (age: number) => {
    setSelectedAge(age);
    sessionStorage.setItem("age", age.toString());
    
    // Smooth transition to name page
    setTimeout(() => {
      router.push("/check-in/name");
    }, 400);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center p-8 overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 -z-10">
        <div className="block md:hidden absolute inset-0">
          <Image
            src="/well-mobile.jpg"
            alt="Mystical well in forest"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-well-deep/40 backdrop-blur-[2px]" />
        </div>
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/well-desktop.jpg"
            alt="Mystical well in forest"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-well-deep/30 backdrop-blur-[1px]" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12 max-w-3xl w-full animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4 animate-scale-gentle">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-well-whisper">
            What's your age range?
          </h1>
          <p className="text-lg font-light text-well-glow/70">
            This helps us provide age-appropriate support
          </p>
        </div>

        {/* Age Range Options */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl animate-scale-gentle">
          {ageRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => handleAgeSelect(range.value)}
              className={`group relative p-8 rounded-3xl transition-calm
                       shadow-lg hover:well-glow
                       border backdrop-blur-sm text-center
                       ${
                         selectedAge === range.value
                           ? "bg-well-water/30 border-well-glow/60"
                           : "bg-well-water/10 hover:bg-well-water/20 border-well-glow/30 hover:border-well-glow/50"
                       }`}
            >
              <span className="text-2xl font-light tracking-wide text-well-whisper 
                             group-hover:text-white transition-calm block">
                {range.label}
              </span>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-well-glow/20 blur-xl 
                            opacity-0 group-hover:opacity-100 transition-calm -z-10" />
            </button>
          ))}
        </div>

        {/* Skip option */}
        <button
          onClick={() => handleAgeSelect(0)}
          className="text-sm font-light text-well-glow/40 hover:text-well-whisper/60 
                   transition-calm underline-offset-4 hover:underline"
        >
          Prefer not to say
        </button>
      </div>
    </main>
  );
}
