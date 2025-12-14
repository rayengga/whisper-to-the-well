"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ColorStateSelector() {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const colorStates = [
    {
      id: "blue",
      name: "Blue",
      emoji: "💙",
      description: "Calm, peaceful, introspective",
      color: "from-blue-400/30 to-blue-600/30",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-400/60",
      glow: "shadow-blue-500/60",
    },
    {
      id: "green",
      name: "Green",
      emoji: "💚",
      description: "Balanced, hopeful, growing",
      color: "from-green-400/30 to-green-600/30",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-400/60",
      glow: "shadow-green-500/60",
    },
    {
      id: "yellow",
      name: "Yellow",
      emoji: "💛",
      description: "Optimistic, energized, bright",
      color: "from-yellow-400/30 to-yellow-600/30",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-400/60",
      glow: "shadow-yellow-500/60",
    },
    {
      id: "red",
      name: "Red",
      emoji: "❤️",
      description: "Passionate, intense, alive",
      color: "from-red-400/30 to-red-600/30",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-400/60",
      glow: "shadow-red-500/60",
    },
    {
      id: "purple",
      name: "Purple",
      emoji: "💜",
      description: "Creative, spiritual, mysterious",
      color: "from-purple-400/30 to-purple-600/30",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-400/60",
      glow: "shadow-purple-500/60",
    },
    {
      id: "gray",
      name: "Gray",
      emoji: "🩶",
      description: "Neutral, tired, contemplative",
      color: "from-gray-400/30 to-gray-600/30",
      bgColor: "bg-gray-500/20",
      borderColor: "border-gray-400/60",
      glow: "shadow-gray-500/60",
    },
  ];

  const handleColorSelect = (colorId: string) => {
    setSelectedColor(colorId);
    sessionStorage.setItem("colorState", colorId);
    
    setTimeout(() => {
      router.push("/check-in/weather");
    }, 500);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center p-6 overflow-hidden">
      {/* Background Images - Same as previous pages */}
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

      <div className="relative z-10 flex flex-col items-center gap-10 max-w-5xl w-full animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4 animate-scale-gentle">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-well-whisper drop-shadow-lg">
            Choose your color state
          </h1>
          <p className="text-lg md:text-xl font-light text-well-glow/90 drop-shadow-md">
            Which color represents how you feel right now?
          </p>
        </div>

        {/* Color Options Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 w-full max-w-4xl animate-scale-gentle">
          {colorStates.map((colorState, index) => (
            <button
              key={colorState.id}
              onClick={() => handleColorSelect(colorState.id)}
              style={{ animationDelay: `${index * 80}ms` }}
              className={`group relative p-6 md:p-8 rounded-3xl transition-calm
                       backdrop-blur-md border-2
                       ${
                         selectedColor === colorState.id
                           ? `bg-gradient-to-br ${colorState.color} ${colorState.borderColor} ${colorState.glow}`
                           : "bg-well-deep/40 hover:bg-well-deep/60 border-well-glow/30 hover:border-well-glow/60"
                       }
                       shadow-xl hover:shadow-2xl hover:scale-105
                       animate-scale-gentle`}
            >
              {/* Color Emoji */}
              <div className="text-5xl md:text-6xl mb-3 animate-float">
                {colorState.emoji}
              </div>
              
              {/* Color Name */}
              <h3 className="text-xl md:text-2xl font-light tracking-wide text-well-whisper 
                           group-hover:text-white transition-calm mb-2">
                {colorState.name}
              </h3>
              
              {/* Description */}
              <p className="text-xs md:text-sm font-light text-well-glow/80 
                          group-hover:text-well-whisper/90 transition-calm">
                {colorState.description}
              </p>
              
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${colorState.color} blur-xl 
                            opacity-0 group-hover:opacity-50 transition-calm -z-10`} />
            </button>
          ))}
        </div>

        {/* Skip option */}
        <button
          onClick={() => handleColorSelect("none")}
          className="text-sm font-light text-well-glow/50 hover:text-well-whisper/70 
                   transition-calm underline-offset-4 hover:underline drop-shadow-md"
        >
          Skip for now
        </button>
      </div>

      {/* Floating ambient lights - matching color theme */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/8 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: "0s" }} />
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-purple-400/8 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-green-400/8 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/3 right-1/3 w-44 h-44 bg-yellow-400/8 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: "1.5s" }} />
      </div>
    </main>
  );
}
