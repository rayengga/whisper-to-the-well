"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EmojiStateSelector() {
  const router = useRouter();
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const emojiStates = [
    {
      id: "sparkles",
      emoji: "✨",
      name: "Sparkly",
      description: "Magical, inspired, full of wonder",
      color: "from-yellow-300/30 to-pink-400/30",
      glow: "shadow-yellow-400/60",
    },
    {
      id: "melting",
      emoji: "🫠",
      name: "Melting",
      description: "Overwhelmed, need support",
      color: "from-orange-300/30 to-red-400/30",
      glow: "shadow-orange-400/60",
    },
    {
      id: "zen",
      emoji: "🧘",
      name: "Zen",
      description: "Centered, peaceful, present",
      color: "from-green-300/30 to-teal-400/30",
      glow: "shadow-green-400/60",
    },
    {
      id: "fire",
      emoji: "🔥",
      name: "On Fire",
      description: "Passionate, driven, unstoppable",
      color: "from-orange-400/30 to-red-500/30",
      glow: "shadow-orange-500/60",
    },
    {
      id: "butterfly",
      emoji: "🦋",
      name: "Transforming",
      description: "Changing, evolving, becoming",
      color: "from-violet-300/30 to-fuchsia-400/30",
      glow: "shadow-violet-400/60",
    },
    {
      id: "sleepy",
      emoji: "😴",
      name: "Sleepy",
      description: "Drained, exhausted, need rest",
      color: "from-indigo-300/30 to-purple-400/30",
      glow: "shadow-indigo-400/60",
    },
  ];

  const handleEmojiSelect = (emojiId: string) => {
    setSelectedEmoji(emojiId);
    sessionStorage.setItem("emojiState", emojiId);
    
    setTimeout(() => {
      router.push("/check-in/whisper");
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

      <div className="relative z-10 flex flex-col items-center gap-10 max-w-6xl w-full animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4 animate-scale-gentle">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-well-whisper drop-shadow-lg">
            Choose your emoji state
          </h1>
          <p className="text-lg md:text-xl font-light text-well-glow/90 drop-shadow-md">
            Which one captures your vibe right now?
          </p>
        </div>

        {/* Emoji Options Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 w-full max-w-4xl animate-scale-gentle">
          {emojiStates.map((emojiState, index) => (
            <button
              key={emojiState.id}
              onClick={() => handleEmojiSelect(emojiState.id)}
              style={{ animationDelay: `${index * 60}ms` }}
              className={`group relative p-8 md:p-10 rounded-3xl transition-calm
                       backdrop-blur-md border-2
                       ${
                         selectedEmoji === emojiState.id
                           ? `bg-gradient-to-br ${emojiState.color} border-white/60 ${emojiState.glow}`
                           : "bg-well-deep/40 hover:bg-well-deep/60 border-well-glow/30 hover:border-well-glow/60"
                       }
                       shadow-xl hover:shadow-2xl hover:scale-105
                       animate-scale-gentle`}
            >
              {/* Emoji */}
              <div className="text-6xl md:text-7xl mb-4 animate-float">
                {emojiState.emoji}
              </div>
              
              {/* Name */}
              <h3 className="text-2xl md:text-3xl font-light tracking-wide text-well-whisper 
                           group-hover:text-white transition-calm mb-2">
                {emojiState.name}
              </h3>
              
              {/* Description */}
              <p className="text-sm md:text-base font-light text-well-glow/80 
                          group-hover:text-well-whisper/90 transition-calm">
                {emojiState.description}
              </p>
              
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${emojiState.color} blur-xl 
                            opacity-0 group-hover:opacity-50 transition-calm -z-10`} />
            </button>
          ))}
        </div>

        {/* Skip option */}
        <button
          onClick={() => handleEmojiSelect("none")}
          className="text-sm font-light text-well-glow/50 hover:text-well-whisper/70 
                   transition-calm underline-offset-4 hover:underline drop-shadow-md"
        >
          Skip for now
        </button>
      </div>

      {/* Floating ambient lights - colorful theme */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-5">
        <div className="absolute top-1/4 left-1/6 w-40 h-40 bg-pink-300/8 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: "0s" }} />
        <div className="absolute top-1/3 right-1/6 w-32 h-32 bg-yellow-300/8 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/4 left-1/4 w-44 h-44 bg-purple-300/8 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-cyan-300/8 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-green-300/6 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: "2.5s" }} />
      </div>
    </main>
  );
}
