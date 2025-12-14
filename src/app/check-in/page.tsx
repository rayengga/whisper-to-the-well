"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CheckIn() {
  const router = useRouter();

  const handleGenderSelect = (gender: string) => {
    // Store gender preference (you can add state management later)
    sessionStorage.setItem("gender", gender);
    
    // Navigate to age selector with smooth transition
    setTimeout(() => {
      router.push("/check-in/age");
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

      <div className="relative z-10 flex flex-col items-center gap-12 max-w-3xl w-full animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4 animate-scale-gentle">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-well-whisper">
            How do you identify?
          </h1>
          <p className="text-lg font-light text-well-glow/70">
            This helps us personalize your experience
          </p>
        </div>

        {/* Gender Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl animate-scale-gentle">
          {/* Male Option */}
          <button
            onClick={() => handleGenderSelect("male")}
            className="group relative p-10 rounded-3xl bg-well-water/10 
                     hover:bg-well-water/20 transition-calm
                     shadow-lg hover:well-glow
                     border border-well-glow/30 hover:border-well-glow/50
                     backdrop-blur-sm text-center"
          >
            <div className="space-y-3">
              <div className="text-5xl">♂</div>
              <span className="text-2xl font-light tracking-wide text-well-whisper 
                             group-hover:text-white transition-calm block">
                Male
              </span>
            </div>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-well-glow/20 blur-xl 
                          opacity-0 group-hover:opacity-100 transition-calm -z-10" />
          </button>

          {/* Female Option */}
          <button
            onClick={() => handleGenderSelect("female")}
            className="group relative p-10 rounded-3xl bg-well-water/10 
                     hover:bg-well-water/20 transition-calm
                     shadow-lg hover:well-glow
                     border border-well-glow/30 hover:border-well-glow/50
                     backdrop-blur-sm text-center"
          >
            <div className="space-y-3">
              <div className="text-5xl">♀</div>
              <span className="text-2xl font-light tracking-wide text-well-whisper 
                             group-hover:text-white transition-calm block">
                Female
              </span>
            </div>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-well-glow/20 blur-xl 
                          opacity-0 group-hover:opacity-100 transition-calm -z-10" />
          </button>

          {/* Non-binary / Other Option */}
          <button
            onClick={() => handleGenderSelect("non-binary")}
            className="group relative p-10 rounded-3xl bg-well-water/10 
                     hover:bg-well-water/20 transition-calm
                     shadow-lg hover:well-glow
                     border border-well-glow/30 hover:border-well-glow/50
                     backdrop-blur-sm text-center md:col-span-2"
          >
            <div className="space-y-3">
              <div className="text-5xl">⚲</div>
              <span className="text-2xl font-light tracking-wide text-well-whisper 
                             group-hover:text-white transition-calm block">
                Non-binary / Prefer not to say
              </span>
            </div>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-well-glow/20 blur-xl 
                          opacity-0 group-hover:opacity-100 transition-calm -z-10" />
          </button>
        </div>

        {/* Skip option */}
        <button
          onClick={() => handleGenderSelect("skipped")}
          className="text-sm font-light text-well-glow/40 hover:text-well-whisper/60 
                   transition-calm underline-offset-4 hover:underline"
        >
          Skip for now
        </button>
      </div>
    </main>
  );
}
