"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LandscapeSelector() {
  const router = useRouter();
  const [selectedLandscape, setSelectedLandscape] = useState<string | null>(null);

  const landscapes = [
    {
      id: "calm-ocean",
      name: "Calm Ocean",
      emoji: "🌊",
      description: "Peaceful waves, gentle and flowing",
      color: "from-blue-400/20 to-cyan-500/20",
      glow: "shadow-blue-400/50",
    },
    {
      id: "stormy-sky",
      name: "Stormy Sky",
      emoji: "⛈️",
      description: "Turbulent clouds, powerful emotions",
      color: "from-gray-400/20 to-slate-500/20",
      glow: "shadow-gray-400/50",
    },
    {
      id: "quiet-forest",
      name: "Quiet Forest",
      emoji: "🌲",
      description: "Serene trees, grounded and stable",
      color: "from-green-400/20 to-emerald-500/20",
      glow: "shadow-green-400/50",
    },
    {
      id: "open-desert",
      name: "Open Desert",
      emoji: "🏜️",
      description: "Vast emptiness, seeking clarity",
      color: "from-amber-400/20 to-orange-500/20",
      glow: "shadow-amber-400/50",
    },
  ];

  const handleLandscapeSelect = (landscapeId: string) => {
    setSelectedLandscape(landscapeId);
    sessionStorage.setItem("landscape", landscapeId);
    
    setTimeout(() => {
      router.push("/check-in/color-state");
    }, 500);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center p-6 overflow-hidden">
      {/* Background Images - Same as star page */}
      <div className="absolute inset-0 -z-10">
        {/* Mobile Background */}
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
        
        {/* Desktop Background */}
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

      <div className="relative z-10 flex flex-col items-center gap-10 max-w-4xl w-full animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4 animate-scale-gentle">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-well-whisper drop-shadow-lg">
            If your mind was a landscape right now
          </h1>
          <p className="text-lg md:text-xl font-light text-well-glow/90 drop-shadow-md">
            What would it look like?
          </p>
        </div>

        {/* Landscape Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-3xl animate-scale-gentle">
          {landscapes.map((landscape, index) => (
            <button
              key={landscape.id}
              onClick={() => handleLandscapeSelect(landscape.id)}
              style={{ animationDelay: `${index * 100}ms` }}
              className={`group relative p-8 md:p-10 rounded-3xl transition-calm
                       backdrop-blur-md border-2
                       ${
                         selectedLandscape === landscape.id
                           ? `bg-gradient-to-br ${landscape.color} border-white/60 ${landscape.glow}`
                           : "bg-well-deep/40 hover:bg-well-deep/60 border-well-glow/30 hover:border-well-glow/60"
                       }
                       shadow-xl hover:shadow-2xl hover:scale-105
                       animate-scale-gentle`}
            >
              {/* Landscape Emoji */}
              <div className="text-6xl md:text-7xl mb-4 animate-float">
                {landscape.emoji}
              </div>
              
              {/* Landscape Name */}
              <h3 className="text-2xl md:text-3xl font-light tracking-wide text-well-whisper 
                           group-hover:text-white transition-calm mb-2">
                {landscape.name}
              </h3>
              
              {/* Description */}
              <p className="text-sm md:text-base font-light text-well-glow/80 
                          group-hover:text-well-whisper/90 transition-calm">
                {landscape.description}
              </p>
              
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${landscape.color} blur-xl 
                            opacity-0 group-hover:opacity-50 transition-calm -z-10`} />
            </button>
          ))}
        </div>

        {/* Skip option */}
        <button
          onClick={() => handleLandscapeSelect("none")}
          className="text-sm font-light text-well-glow/50 hover:text-well-whisper/70 
                   transition-calm underline-offset-4 hover:underline drop-shadow-md"
        >
          Skip for now
        </button>
      </div>

      {/* Floating ambient lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: "0s" }} />
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-gray-400/10 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-green-400/10 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/3 right-1/3 w-44 h-44 bg-amber-400/10 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: "1.5s" }} />
      </div>
    </main>
  );
}
