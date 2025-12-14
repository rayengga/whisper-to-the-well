"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function WeatherSelector() {
  const router = useRouter();
  const [selectedWeather, setSelectedWeather] = useState<string | null>(null);

  const weatherStates = [
    {
      id: "sunny",
      name: "Sunny",
      emoji: "☀️",
      description: "Clear and bright, full of energy",
      color: "from-yellow-300/30 to-orange-400/30",
      glow: "shadow-yellow-400/60",
    },
    {
      id: "partly-cloudy",
      name: "Partly Cloudy",
      emoji: "⛅",
      description: "Mixed feelings, some uncertainty",
      color: "from-sky-300/30 to-gray-400/30",
      glow: "shadow-sky-400/60",
    },
    {
      id: "cloudy",
      name: "Cloudy",
      emoji: "☁️",
      description: "Foggy thoughts, unclear direction",
      color: "from-gray-300/30 to-gray-500/30",
      glow: "shadow-gray-400/60",
    },
    {
      id: "rainy",
      name: "Rainy",
      emoji: "🌧️",
      description: "Sad, tearful, releasing emotions",
      color: "from-blue-400/30 to-indigo-500/30",
      glow: "shadow-blue-500/60",
    },
    {
      id: "stormy",
      name: "Stormy",
      emoji: "⛈️",
      description: "Turbulent, intense, overwhelmed",
      color: "from-slate-500/30 to-purple-600/30",
      glow: "shadow-purple-500/60",
    },
    {
      id: "foggy",
      name: "Foggy",
      emoji: "🌫️",
      description: "Confused, lost, need clarity",
      color: "from-gray-400/30 to-slate-500/30",
      glow: "shadow-slate-400/60",
    },
  ];

  const handleWeatherSelect = (weatherId: string) => {
    setSelectedWeather(weatherId);
    sessionStorage.setItem("weather", weatherId);
    
    setTimeout(() => {
      router.push("/check-in/emoji-state");
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
            Your internal weather report
          </h1>
          <p className="text-lg md:text-xl font-light text-well-glow/90 drop-shadow-md">
            How does your inner world feel today?
          </p>
        </div>

        {/* Weather Options Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 w-full max-w-4xl animate-scale-gentle">
          {weatherStates.map((weather, index) => (
            <button
              key={weather.id}
              onClick={() => handleWeatherSelect(weather.id)}
              style={{ animationDelay: `${index * 80}ms` }}
              className={`group relative p-6 md:p-8 rounded-3xl transition-calm
                       backdrop-blur-md border-2
                       ${
                         selectedWeather === weather.id
                           ? `bg-gradient-to-br ${weather.color} border-white/60 ${weather.glow}`
                           : "bg-well-deep/40 hover:bg-well-deep/60 border-well-glow/30 hover:border-well-glow/60"
                       }
                       shadow-xl hover:shadow-2xl hover:scale-105
                       animate-scale-gentle`}
            >
              {/* Weather Emoji */}
              <div className="text-5xl md:text-6xl mb-3 animate-float">
                {weather.emoji}
              </div>
              
              {/* Weather Name */}
              <h3 className="text-xl md:text-2xl font-light tracking-wide text-well-whisper 
                           group-hover:text-white transition-calm mb-2">
                {weather.name}
              </h3>
              
              {/* Description */}
              <p className="text-xs md:text-sm font-light text-well-glow/80 
                          group-hover:text-well-whisper/90 transition-calm">
                {weather.description}
              </p>
              
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${weather.color} blur-xl 
                            opacity-0 group-hover:opacity-50 transition-calm -z-10`} />
            </button>
          ))}
        </div>

        {/* Skip option */}
        <button
          onClick={() => handleWeatherSelect("none")}
          className="text-sm font-light text-well-glow/50 hover:text-well-whisper/70 
                   transition-calm underline-offset-4 hover:underline drop-shadow-md"
        >
          Skip for now
        </button>
      </div>

      {/* Floating ambient lights - weather themed */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-300/8 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: "0s" }} />
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-blue-400/8 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-gray-400/8 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/3 right-1/3 w-44 h-44 bg-slate-400/8 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: "1.5s" }} />
      </div>
    </main>
  );
}
