"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Start() {
  const router = useRouter();

  const handleStart = () => {
    // Navigate to check-in with smooth transition
    setTimeout(() => {
      router.push("/check-in");
    }, 300);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center p-8 overflow-hidden">
      {/* Background Images */}
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

      <div className="relative z-10 flex flex-col items-center gap-16 max-w-3xl w-full animate-fade-in">
        {/* Well illustration/symbol */}
        <div className="relative animate-scale-gentle">
          <div className="w-48 h-48 rounded-full border-4 border-well-glow/40 flex items-center justify-center animate-ripple">
            <div className="w-36 h-36 rounded-full border-2 border-well-glow/60 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-well-water/30 backdrop-blur-sm well-glow" />
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="text-center space-y-6 animate-scale-gentle">
          <h1 className="text-4xl md:text-5xl font-light tracking-wider text-well-whisper">
            Welcome to the Well
          </h1>
          <p className="text-lg md:text-xl font-light text-well-glow/80 leading-relaxed max-w-2xl">
            This is a safe, quiet space where you can share your thoughts and feelings.
            <br />
            <span className="text-well-whisper/60 text-base mt-4 block">
              Everything you whisper here stays between you and the well
            </span>
          </p>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="group relative px-20 py-7 rounded-full bg-well-water/20 
                   hover:bg-well-water/30 transition-calm
                   shadow-lg hover:well-glow
                   border border-well-glow/30 hover:border-well-glow/60
                   backdrop-blur-sm animate-float"
        >
          <span className="text-3xl font-light tracking-widest text-well-whisper 
                         group-hover:text-white transition-calm">
            Start
          </span>
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-full bg-well-glow/20 blur-xl 
                        opacity-0 group-hover:opacity-100 transition-calm -z-10" />
        </button>

        {/* Ambient decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-well-moss/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-well-water/5 rounded-full blur-3xl animate-ripple" />
        </div>
      </div>
    </main>
  );
}
