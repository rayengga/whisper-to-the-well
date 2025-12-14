"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TransitionVideo from "@/components/TransitionVideo";

export default function WhisperInput() {
  const router = useRouter();
  const [whisper, setWhisper] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (whisper.trim()) {
      setIsAnalyzing(true);
      sessionStorage.setItem("whisper", whisper.trim());
      
      try {
        // Send to AI analyzer
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: whisper.trim() }),
        });

        if (response.ok) {
          const data = await response.json();
          // Store the analysis results
          sessionStorage.setItem("emotionAnalysis", JSON.stringify(data));
          
          // Show video transition
          setIsAnalyzing(false);
          setShowVideo(true);
        } else {
          console.error('Analysis failed');
          // Navigate to welcome as fallback
          router.push("/welcome");
        }
      } catch (error) {
        console.error('Error analyzing:', error);
        // Navigate to welcome as fallback
        router.push("/welcome");
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const handleSkip = () => {
    sessionStorage.setItem("whisper", "");
    setTimeout(() => {
      router.push("/welcome");
    }, 300);
  };

  const handleVideoComplete = () => {
    router.push("/check-in/results");
  };

  if (showVideo) {
    return <TransitionVideo onComplete={handleVideoComplete} />;
  }

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

      <div className="relative z-10 flex flex-col items-center gap-12 max-w-3xl w-full animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4 animate-scale-gentle">
          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-well-whisper drop-shadow-lg">
            What's on your mind?
          </h1>
          <p className="text-xl md:text-2xl font-light text-well-whisper/90 drop-shadow-lg">
            Whisper it to the well.
          </p>
        </div>

        {/* Whisper Input Form */}
        <form 
          onSubmit={handleSubmit}
          className="w-full space-y-8 animate-scale-gentle"
        >
          <div className="relative">
            <textarea
              value={whisper}
              onChange={(e) => setWhisper(e.target.value)}
              placeholder="Your thoughts are safe here..."
              rows={8}
              className="w-full px-6 py-6 rounded-3xl bg-well-water/10 
                       border-2 border-well-glow/30 focus:border-well-glow/60
                       backdrop-blur-md transition-calm
                       text-lg font-light text-well-whisper
                       placeholder:text-well-whisper/60
                       focus:outline-none focus:ring-2 focus:ring-well-glow/20
                       shadow-xl focus:well-glow
                       resize-none"
              autoFocus
              maxLength={1000}
            />
            
            {/* Character count */}
            <div className="absolute bottom-4 right-6 text-xs text-well-glow/40">
              {whisper.length}/1000
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            disabled={isAnalyzing || !whisper.trim()}
            className="w-full group relative px-12 py-5 rounded-full 
                     bg-well-water/20 hover:bg-well-water/30 
                     transition-calm
                     shadow-lg hover:well-glow
                     border border-well-glow/30 hover:border-well-glow/60
                     backdrop-blur-sm
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-xl font-light tracking-widest text-well-whisper 
                           group-hover:text-white transition-calm">
              {isAnalyzing ? "Analyzing..." : "Drop it into the Well"}
            </span>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-full bg-well-glow/20 blur-xl 
                          opacity-0 group-hover:opacity-100 transition-calm -z-10" />
          </button>
        </form>

        {/* Skip option */}
        <button
          onClick={handleSkip}
          className="text-sm font-light text-well-glow/50 hover:text-well-whisper/70 
                   transition-calm underline-offset-4 hover:underline drop-shadow-md"
        >
          Skip for now
        </button>
      </div>

      {/* Floating ripples around the well */}
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
