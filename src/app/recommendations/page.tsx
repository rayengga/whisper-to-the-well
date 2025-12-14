"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getRecommendations, getPersonalizedMessage, QuickAction } from "@/lib/activityRecommendations";

export default function RecommendationsPage() {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<QuickAction[]>([]);
  const [personalMessage, setPersonalMessage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const completeData = sessionStorage.getItem("completeUserData");
    
    if (completeData) {
      try {
        const userData = JSON.parse(completeData);
        const activities = getRecommendations(userData);
        const message = getPersonalizedMessage(userData);
        
        setRecommendations(activities);
        setPersonalMessage(message);
      } catch (error) {
        console.error("Error getting recommendations:", error);
        router.push("/welcome");
      }
    } else {
      router.push("/check-in/whisper");
    }
    
    setLoading(false);
  }, [router]);

  const handleFinish = () => {
    router.push("/welcome");
  };

  if (loading) {
    return (
      <main className="relative flex min-h-screen items-center justify-center p-6">
        <div className="text-well-whisper text-xl animate-pulse">
          Crafting your journey...
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center p-6 py-20 overflow-hidden">
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

      <div className="relative z-10 flex flex-col items-center gap-10 max-w-5xl w-full animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4 animate-scale-gentle">
          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-well-whisper drop-shadow-lg">
            Your Path Forward
          </h1>
          <p className="text-lg md:text-xl font-light text-well-whisper/90 drop-shadow-lg max-w-2xl">
            {personalMessage}
          </p>
        </div>

        {/* Action Cards */}
        <div className="w-full space-y-6 max-w-3xl mx-auto">
          {recommendations.map((action, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-gradient-to-br from-well-water/20 to-well-water/10
              backdrop-blur-md border border-well-glow/30 
              hover:border-well-glow/60 transition-calm
              shadow-lg hover:well-glow animate-scale-gentle"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex items-start gap-6">
                <div className="text-5xl flex-shrink-0" style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, Android Emoji, sans-serif' }}>
                  {action.icon}
                </div>
                <p className="text-lg md:text-xl text-well-whisper/90 font-light leading-relaxed flex-1 pt-2">
                  {action.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div className="w-full p-6 rounded-2xl bg-well-water/10 backdrop-blur-md 
                     border border-well-glow/20 shadow-lg animate-scale-gentle"
             style={{ animationDelay: "0.6s" }}>
          <div className="space-y-3 text-center">
            <p className="text-well-whisper/70 font-light text-sm">
              💡 These are invitations, not obligations. Choose what resonates, 
              skip what doesn't, or create your own path entirely.
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleFinish}
          className="group relative px-12 py-5 rounded-full 
                   bg-well-water/20 hover:bg-well-water/30 
                   transition-calm
                   shadow-lg hover:well-glow
                   border border-well-glow/30 hover:border-well-glow/60
                   backdrop-blur-sm
                   animate-scale-gentle"
          style={{ animationDelay: "0.8s" }}
        >
          <span className="text-xl font-light tracking-widest text-well-whisper 
                         group-hover:text-white transition-calm">
            Complete Journey
          </span>
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-full bg-well-glow/20 blur-xl 
                        opacity-0 group-hover:opacity-100 transition-calm -z-10" />
        </button>
      </div>

      {/* Floating ripples */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-5">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full border border-well-glow/10 animate-ripple" 
             style={{ animationDelay: "0s" }} />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full border border-well-glow/10 animate-ripple" 
             style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-44 h-44 rounded-full border border-well-glow/10 animate-ripple" 
             style={{ animationDelay: "2s" }} />
      </div>
    </main>
  );
}
