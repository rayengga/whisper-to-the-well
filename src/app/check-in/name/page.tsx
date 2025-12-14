"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NameInput() {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim()) {
      sessionStorage.setItem("name", name.trim());
    }
    
    // Navigate to star selection page
    setTimeout(() => {
      router.push("/check-in/star");
    }, 300);
  };

  const handleSkip = () => {
    sessionStorage.setItem("name", "Friend");
    setTimeout(() => {
      router.push("/check-in/star");
    }, 300);
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

      <div className="relative z-10 flex flex-col items-center gap-12 max-w-2xl w-full animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4 animate-scale-gentle">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-well-whisper">
            What should we call you?
          </h1>
          <p className="text-lg font-light text-well-glow/70">
            You can use your real name or a nickname
          </p>
        </div>

        {/* Name Input Form */}
        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-8 animate-scale-gentle"
        >
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-8 py-6 rounded-3xl bg-well-water/10 
                       border border-well-glow/30 focus:border-well-glow/60
                       backdrop-blur-sm transition-calm
                       text-2xl font-light text-well-whisper text-center
                       placeholder:text-well-glow/40
                       focus:outline-none focus:ring-2 focus:ring-well-glow/20
                       shadow-lg focus:well-glow"
              autoFocus
              maxLength={50}
            />
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full group relative px-12 py-5 rounded-full 
                     bg-well-water/20 hover:bg-well-water/30 
                     transition-calm
                     shadow-lg hover:well-glow
                     border border-well-glow/30 hover:border-well-glow/60
                     backdrop-blur-sm
                     disabled:opacity-40 disabled:cursor-not-allowed
                     disabled:hover:bg-well-water/20"
          >
            <span className="text-xl font-light tracking-widest text-well-whisper 
                           group-hover:text-white transition-calm">
              Continue
            </span>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-full bg-well-glow/20 blur-xl 
                          opacity-0 group-hover:opacity-100 transition-calm -z-10" />
          </button>
        </form>

        {/* Skip option */}
        <button
          onClick={handleSkip}
          className="text-sm font-light text-well-glow/40 hover:text-well-whisper/60 
                   transition-calm underline-offset-4 hover:underline"
        >
          Skip for now
        </button>
      </div>
    </main>
  );
}
