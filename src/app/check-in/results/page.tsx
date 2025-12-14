"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface AnalysisResult {
  dominant_emotion: string;
  scores: {
    joy: number;
    sadness: number;
    anger: number;
    fear: number;
    disgust: number;
    surprise: number;
    neutral: number;
  };
  trend: string;
  trend_confidence: string;
  change_percentage: number;
  visual_hint: string;
  timestamp: number;
  total_entries: number;
  disclaimer: string;
}

const emotionEmojis: Record<string, string> = {
  joy: "😊",
  sadness: "😢",
  anger: "😠",
  fear: "😨",
  disgust: "🤢",
  surprise: "😲",
  neutral: "😐"
};

const emotionColors: Record<string, string> = {
  joy: "from-yellow-400/30 to-amber-500/30",
  sadness: "from-blue-400/30 to-indigo-500/30",
  anger: "from-red-400/30 to-orange-500/30",
  fear: "from-purple-400/30 to-violet-500/30",
  disgust: "from-green-400/30 to-teal-500/30",
  surprise: "from-pink-400/30 to-fuchsia-500/30",
  neutral: "from-gray-400/30 to-slate-500/30"
};

const emotionDescriptions: Record<string, string> = {
  joy: "Brightness and positivity flow through you",
  sadness: "A gentle melancholy touches your heart",
  anger: "Intensity and passion rise within",
  fear: "Caution and alertness guide you",
  disgust: "Something doesn't sit quite right",
  surprise: "The unexpected catches your attention",
  neutral: "A calm, balanced state of being"
};

const quickActions: Record<string, { line1: string; line2: string }> = {
  anger: {
    line1: "Move your body: fast walk, run, or push-ups to release anger quickly.",
    line2: "Calm your mind: deep breathing for 2 minutes or write what you're feeling."
  },
  sadness: {
    line1: "Connect or express: talk to someone you trust or write your feelings.",
    line2: "Gentle care: slow walk, calming music, or deep breathing."
  },
  fear: {
    line1: "Ground yourself: slow breathing and name 5 things you can see around you.",
    line2: "Reassure action: take one small step toward what scares you."
  },
  joy: {
    line1: "Celebrate it: smile, dance, or share the moment with someone.",
    line2: "Savor it: pause, breathe, and notice what makes this moment good."
  },
  disgust: {
    line1: "Create distance: step away, wash your hands, or get fresh air.",
    line2: "Reset your senses: breathe slowly or focus on a neutral, clean environment."
  },
  surprise: {
    line1: "Pause and breathe: give your body a moment to settle.",
    line2: "Assess calmly: notice what happened and decide your next step."
  },
  neutral: {
    line1: "Stay present: notice your breath and surroundings.",
    line2: "Choose intention: decide what you want to do next."
  }
};

export default function ResultsPage() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const analysisData = sessionStorage.getItem("emotionAnalysis");
    console.log("Analysis data from storage:", analysisData);
    
    if (analysisData) {
      try {
        const parsed = JSON.parse(analysisData);
        console.log("Parsed analysis:", parsed);
        setAnalysis(parsed);
        
        // Collect all data from previous pages and cookie consent
        const completeUserData = {
          // User profile from check-in flow
          profile: {
            gender: sessionStorage.getItem("gender") || null,
            age: sessionStorage.getItem("age") || null,
            name: sessionStorage.getItem("name") || null,
          },
          // Emotional state selections
          emotionalState: {
            star: sessionStorage.getItem("star") || null,
            landscape: sessionStorage.getItem("landscape") || null,
            colorState: sessionStorage.getItem("colorState") || null,
            weather: sessionStorage.getItem("weather") || null,
            emojiState: sessionStorage.getItem("emojiState") || null,
          },
          // User's whisper text
          whisper: sessionStorage.getItem("whisper") || null,
          // AI Analysis results
          aiAnalysis: parsed,
          // Cookie consent data
          consent: (() => {
            if (typeof window !== 'undefined') {
              try {
                const consent = localStorage.getItem('user-consent');
                return consent ? JSON.parse(consent) : null;
              } catch {
                return null;
              }
            }
            return null;
          })(),
          // Timestamp
          timestamp: new Date().toISOString(),
        };
        
        // Store complete data
        sessionStorage.setItem("completeUserData", JSON.stringify(completeUserData));
        
        // Log the complete data
        console.log("Complete User Data:", completeUserData);
        console.log("Complete User Data JSON:", JSON.stringify(completeUserData, null, 2));
        
      } catch (error) {
        console.error("Error parsing analysis data:", error);
        router.push("/welcome");
      }
    } else {
      console.log("No analysis data found, redirecting to whisper");
      router.push("/check-in/whisper");
    }
    setLoading(false);
  }, [router]);

  const handleContinue = () => {
    router.push("/recommendations");
  };

  if (loading) {
    return (
      <main className="relative flex min-h-screen items-center justify-center p-6">
        <div className="text-well-whisper text-xl animate-pulse">
          Reading the depths...
        </div>
      </main>
    );
  }

  if (!analysis || !analysis.scores) {
    return null;
  }

  // Convert scores object to array for easier rendering
  const emotionsArray = Object.entries(analysis.scores).map(([emotion, score]) => ({
    emotion,
    score: score as number,
    description: emotionDescriptions[emotion] || "An emotional state",
  }));

  return (
    <main className="relative flex min-h-screen items-center justify-center p-6 overflow-hidden">
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

      <div className="relative z-10 flex flex-col items-center gap-10 max-w-4xl w-full animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4 animate-scale-gentle">
          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-well-whisper drop-shadow-lg">
            The Well Reflects
          </h1>
          <p className="text-lg md:text-xl font-light text-well-whisper/80 drop-shadow-lg">
            Your emotional landscape
          </p>
        </div>

        {/* Dominant Emotion Card */}
        <div className={`w-full p-8 rounded-3xl bg-gradient-to-br ${
          emotionColors[analysis.dominant_emotion] || emotionColors.neutral
        } backdrop-blur-md border border-well-glow/30 shadow-2xl animate-scale-gentle`}>
          <div className="text-center space-y-4">
            <div className="text-7xl animate-float" style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, Android Emoji, sans-serif' }}>
              {emotionEmojis[analysis.dominant_emotion] || "🌟"}
            </div>
            <h2 className="text-3xl font-light text-well-whisper capitalize">
              {analysis.dominant_emotion}
            </h2>
            <p className="text-lg text-well-whisper/90 font-light">
              {emotionDescriptions[analysis.dominant_emotion]}
            </p>
            <div className="pt-2">
              <div className="inline-block px-6 py-2 rounded-full bg-well-water/20 backdrop-blur-sm border border-well-glow/20">
                <span className="text-well-whisper/80 text-sm font-light">
                  Strength: {Math.round(analysis.scores[analysis.dominant_emotion as keyof typeof analysis.scores] * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="w-full p-6 rounded-2xl bg-well-water/10 backdrop-blur-md 
                     border border-well-glow/20 shadow-lg animate-scale-gentle"
             style={{ animationDelay: "0.2s" }}>
          <div className="space-y-4">
            <h3 className="text-xl font-light text-well-whisper/90 text-center flex items-center justify-center gap-2">
              <span>⚡</span>
              <span>Quick Actions</span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-well-glow text-lg mt-0.5">•</span>
                <p className="text-well-whisper/80 font-light leading-relaxed flex-1">
                  {quickActions[analysis.dominant_emotion]?.line1}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-well-glow text-lg mt-0.5">•</span>
                <p className="text-well-whisper/80 font-light leading-relaxed flex-1">
                  {quickActions[analysis.dominant_emotion]?.line2}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* All Emotions Grid */}
        <div className="w-full space-y-6 animate-scale-gentle" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-2xl font-light text-well-whisper/90 text-center">
            Emotional Spectrum
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emotionsArray
              .sort((a, b) => b.score - a.score)
              .map((emotion, index) => (
                <div
                  key={emotion.emotion}
                  className="p-6 rounded-2xl bg-well-water/10 backdrop-blur-md 
                           border border-well-glow/20 hover:border-well-glow/40
                           transition-calm shadow-lg hover:well-glow"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl" style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, Android Emoji, sans-serif' }}>
                      {emotionEmojis[emotion.emotion] || "🌟"}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg font-light text-well-whisper capitalize">
                          {emotion.emotion}
                        </h4>
                        <span className="text-sm text-well-glow">
                          {Math.round(emotion.score * 100)}%
                        </span>
                      </div>
                      {/* Progress bar */}
                      <div className="w-full h-2 bg-well-water/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-well-glow to-well-whisper rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${emotion.score * 100}%`,
                            transitionDelay: `${index * 0.1}s`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Trend Information */}
        {analysis.trend && (
          <div className="w-full p-6 rounded-2xl bg-well-water/10 backdrop-blur-md 
                       border border-well-glow/20 shadow-lg animate-scale-gentle"
               style={{ animationDelay: "0.4s" }}>
            <div className="space-y-3">
              <h3 className="text-xl font-light text-well-whisper/90">
                Emotional Trend
              </h3>
              <p className="text-well-whisper/80 font-light leading-relaxed">
                {analysis.trend}
              </p>
              <div className="flex gap-4 text-sm">
                <span className="px-4 py-1 rounded-full bg-well-water/20 backdrop-blur-sm border border-well-glow/20 text-well-whisper/70 capitalize">
                  {analysis.trend_confidence} confidence
                </span>
                {analysis.change_percentage !== 0 && (
                  <span className="px-4 py-1 rounded-full bg-well-water/20 backdrop-blur-sm border border-well-glow/20 text-well-glow">
                    {analysis.change_percentage > 0 ? '+' : ''}{analysis.change_percentage.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="group relative px-12 py-5 rounded-full 
                   bg-well-water/20 hover:bg-well-water/30 
                   transition-calm
                   shadow-lg hover:well-glow
                   border border-well-glow/30 hover:border-well-glow/60
                   backdrop-blur-sm
                   animate-scale-gentle"
          style={{ animationDelay: "0.6s" }}
        >
          <span className="text-xl font-light tracking-widest text-well-whisper 
                         group-hover:text-white transition-calm">
            Continue
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
