"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [countdown, setCountdown] = useState(6);
  const router = useRouter();

  const handleBreatheClick = () => {
    setIsBreathing(true);
    let count = 6;
    setCountdown(count);

    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);

      if (count === 0) {
        clearInterval(interval);
        // Brief pause before navigation for smooth transition
        setTimeout(() => {
          router.push("/start");
        }, 500);
      }
    }, 1000);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center p-8 overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 -z-10">
        {/* Mobile Background */}
        <div className="block md:hidden absolute inset-0">
          <Image
            src="/1-mobile-view.jpeg"
            alt="Whisper to the Well"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        
        {/* Desktop Background */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/1-pc-view.jpeg"
            alt="Whisper to the Well"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12 max-w-2xl w-full">
        {/* Well welcome message */}
        {!isBreathing && (
          <div className="text-center space-y-6 animate-scale-gentle">
            <p className="text-2xl md:text-3xl font-light text-well-glow/90 leading-relaxed drop-shadow-lg">
              A safe place for your thoughts
            </p>
          </div>
        )}

        {/* Breathing guide with circular animation */}
        {isBreathing && (
          <div className="relative text-center space-y-8">
            {/* Animated breathing circles */}
            <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto">
              {/* Outer pulsing circle */}
              <div 
                className="absolute inset-0 rounded-full border-2 border-well-glow/40 animate-breathe"
                style={{ animationDuration: '6s' }}
              />
              
              {/* Middle pulsing circle */}
              <div 
                className="absolute inset-8 rounded-full border-2 border-well-glow/60 animate-breathe"
                style={{ animationDuration: '6s', animationDelay: '0.5s' }}
              />
              
              {/* Inner pulsing circle */}
              <div 
                className="absolute inset-16 rounded-full border-2 border-well-glow/80 animate-breathe"
                style={{ animationDuration: '6s', animationDelay: '1s' }}
              />
              
              {/* Center countdown */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-9xl md:text-[10rem] font-extralight text-well-whisper well-glow animate-scale-gentle"
                     style={{ 
                       fontFamily: 'system-ui',
                       textShadow: '0 0 40px rgba(126, 168, 184, 0.6), 0 0 80px rgba(126, 168, 184, 0.3)'
                     }}>
                  {countdown}
                </div>
              </div>
              
              {/* Rotating sparkles */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-2xl text-well-glow/60">✦</div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl text-well-glow/60">✦</div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl text-well-glow/60">✦</div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl text-well-glow/60">✦</div>
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-light tracking-wide text-well-whisper/90 animate-breathe drop-shadow-lg">
              Take a deep breath
            </h2>
          </div>
        )}

        {/* Breathe button with enhanced design */}
        {!isBreathing && (
          <div className="relative animate-float">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-well-glow/20 blur-2xl animate-pulse" 
                 style={{ animationDuration: '3s' }} />
            
            <button
              onClick={handleBreatheClick}
              className="group relative px-20 py-8 rounded-full bg-gradient-to-br from-well-water/30 to-well-water/10
                       hover:from-well-water/40 hover:to-well-water/20 transition-calm
                       shadow-2xl hover:well-glow
                       border-2 border-well-glow/40 hover:border-well-glow/80
                       backdrop-blur-md overflow-hidden"
            >
              {/* Animated shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-well-glow/20 to-transparent 
                            -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <span className="relative text-3xl md:text-4xl font-light tracking-widest text-well-whisper 
                             group-hover:text-white transition-calm drop-shadow-lg">
                Breathe
              </span>
              
              {/* Enhanced glow effect */}
              <div className="absolute inset-0 rounded-full bg-well-glow/30 blur-xl 
                            opacity-0 group-hover:opacity-100 transition-calm -z-10" />
            </button>
          </div>
        )}

        {/* Subtle hint */}
        {!isBreathing && (
          <p className="text-sm font-light text-well-glow/50 animate-fade-in drop-shadow-md">
            Click when you're ready
          </p>
        )}
      </div>
    </main>
  );
}
