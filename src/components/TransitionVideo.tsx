"use client";

import { useEffect, useRef, useState } from "react";

interface TransitionVideoProps {
  onComplete: () => void;
}

export default function TransitionVideo({ onComplete }: TransitionVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showEntryAnimation, setShowEntryAnimation] = useState(true);
  const [revealProgress, setRevealProgress] = useState(0);

  useEffect(() => {
    // Smooth reveal animation
    let progress = 0;
    const revealInterval = setInterval(() => {
      progress += 0.05;
      setRevealProgress(Math.min(progress, 1));
      
      if (progress >= 1) {
        clearInterval(revealInterval);
        setTimeout(() => {
          setShowEntryAnimation(false);
        }, 300);
      }
    }, 16);

    return () => clearInterval(revealInterval);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const mobileVideo = mobileVideoRef.current;
    
    const activeVideo = window.innerWidth >= 768 ? video : mobileVideo;
    if (!activeVideo) return;

    // Set playback speed to 2x
    activeVideo.playbackRate = 2.0;

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      activeVideo.play().catch(err => {
        console.error("Video play failed:", err);
        // If video fails to play, proceed anyway
        triggerExit();
      });
    };

    const handleEnded = () => {
      triggerExit();
    };

    const triggerExit = () => {
      setIsExiting(true);
      setTimeout(() => {
        onComplete();
      }, 800);
    };

    activeVideo.addEventListener('canplay', handleCanPlay);
    activeVideo.addEventListener('ended', handleEnded);

    return () => {
      activeVideo.removeEventListener('canplay', handleCanPlay);
      activeVideo.removeEventListener('ended', handleEnded);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-well-deep overflow-hidden">
      {/* Entry Animation - Liquid Morph Reveal */}
      {showEntryAnimation && (
        <>
          {/* Animated liquid background */}
          <div className="absolute inset-0 z-50">
            <div 
              className="absolute inset-0 bg-gradient-to-br from-well-water/40 via-well-glow/20 to-well-deep"
              style={{
                transform: `scale(${1 + revealProgress * 0.5})`,
                opacity: 1 - revealProgress,
                filter: `blur(${30 - revealProgress * 30}px)`,
              }}
            />
          </div>

          {/* Ripple waves */}
          <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border-2"
                style={{
                  width: `${revealProgress * 300 + i * 100}%`,
                  height: `${revealProgress * 300 + i * 100}%`,
                  borderColor: `rgba(126, 168, 184, ${0.3 - i * 0.03})`,
                  opacity: Math.max(0, 1 - revealProgress - i * 0.1),
                  animation: `ripple-pulse ${2 + i * 0.2}s ease-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>

          {/* Floating light particles */}
          <div className="absolute inset-0 z-50 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-well-glow"
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: (1 - revealProgress) * (0.3 + Math.random() * 0.5),
                  animation: `float-particle ${3 + Math.random() * 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                  filter: 'blur(1px)',
                }}
              />
            ))}
          </div>

          {/* Center portal effect */}
          <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div 
              className="rounded-full"
              style={{
                width: `${revealProgress * 150}%`,
                height: `${revealProgress * 150}%`,
                background: `radial-gradient(circle, transparent ${revealProgress * 60}%, rgba(26, 35, 50, ${1 - revealProgress}) 100%)`,
                opacity: 1 - revealProgress,
              }}
            />
          </div>
        </>
      )}

      {/* Video Container with Fade In */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        showEntryAnimation ? 'opacity-0' : 'opacity-100'
      } ${isExiting ? 'animate-fade-out' : ''}`}>
        {/* Mobile Video */}
        <video
          ref={mobileVideoRef}
          className="block md:hidden w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        >
          <source src="/vedios/mobile-view.mp4" type="video/mp4" />
        </video>

        {/* Desktop Video */}
        <video
          ref={videoRef}
          className="hidden md:block w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        >
          <source src="/vedios/pc-view.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Exit Animation - Dimensional Warp */}
      {isExiting && (
        <>
          {/* Kaleidoscope shards */}
          <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className="absolute origin-center"
                style={{
                  width: '200%',
                  height: '4px',
                  background: `linear-gradient(90deg, transparent, rgba(126, 168, 184, ${0.6 - i * 0.02}), transparent)`,
                  transform: `rotate(${i * 15}deg)`,
                  animation: `shard-expand 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                  animationDelay: `${i * 0.02}s`,
                }}
              />
            ))}
          </div>

          {/* Spiral energy trails */}
          <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  width: `${150 + i * 50}px`,
                  height: `${150 + i * 50}px`,
                  border: `2px solid rgba(126, 168, 184, ${0.4 - i * 0.06})`,
                  borderRadius: '50%',
                  animation: `spiral-out 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                  animationDelay: `${i * 0.08}s`,
                }}
              />
            ))}
          </div>

          {/* Glowing particle explosion */}
          <div className="absolute inset-0 z-50 pointer-events-none">
            {[...Array(36)].map((_, i) => {
              const angle = (i * 10) * (Math.PI / 180);
              const distance = 100 + Math.random() * 200;
              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    width: `${Math.random() * 6 + 3}px`,
                    height: `${Math.random() * 6 + 3}px`,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, rgba(126, 168, 184, ${0.8 - i * 0.02}), transparent)`,
                    animation: `particle-explode 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                    animationDelay: `${i * 0.015}s`,
                    '--angle': `${angle}rad`,
                    '--distance': `${distance}px`,
                    filter: 'blur(1px)',
                    boxShadow: `0 0 ${10 + Math.random() * 10}px rgba(126, 168, 184, 0.6)`,
                  } as React.CSSProperties}
                />
              );
            })}
          </div>

          {/* Vortex distortion overlay */}
          <div 
            className="absolute inset-0 z-50 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, rgba(26, 35, 50, 0.3) 50%, rgba(26, 35, 50, 0.9) 100%)',
              animation: 'vortex-spin 0.8s ease-in forwards',
            }}
          />

          {/* Light flash */}
          <div 
            className="absolute inset-0 z-50 pointer-events-none bg-well-glow"
            style={{
              animation: 'flash-fade 0.4s ease-out forwards',
            }}
          />
        </>
      )}

      {/* Loading indicator with animation */}
      {!isVideoLoaded && !showEntryAnimation && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-well-deep z-40">
          <div className="relative">
            {/* Spinning ring */}
            <div className="w-16 h-16 rounded-full border-2 border-well-glow/20 border-t-well-glow animate-spin" />
            
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-well-glow/50 animate-pulse" />
          </div>
          
          <p className="mt-6 text-well-whisper/70 text-sm font-light animate-pulse">
            Transitioning...
          </p>
        </div>
      )}

      {/* Vignette overlay for cinematic effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-well-deep/20 via-transparent to-well-deep/20" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-well-deep/20 via-transparent to-well-deep/20" />

      <style jsx>{`
        @keyframes ripple-pulse {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(10px, -20px) scale(1.2);
            opacity: 0.6;
          }
          50% {
            transform: translate(-5px, -40px) scale(0.8);
            opacity: 0.8;
          }
          75% {
            transform: translate(-15px, -25px) scale(1.1);
            opacity: 0.5;
          }
        }

        @keyframes shard-expand {
          0% {
            transform: rotate(var(--rotation, 0deg)) scale(0);
            opacity: 1;
          }
          60% {
            opacity: 0.8;
          }
          100% {
            transform: rotate(var(--rotation, 0deg)) scale(3);
            opacity: 0;
          }
        }

        @keyframes spiral-out {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(4) rotate(180deg);
            opacity: 0;
          }
        }

        @keyframes particle-explode {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          70% {
            opacity: 0.8;
          }
          100% {
            transform: translate(
              calc(-50% + cos(var(--angle)) * var(--distance)), 
              calc(-50% + sin(var(--angle)) * var(--distance))
            ) scale(0);
            opacity: 0;
          }
        }

        @keyframes vortex-spin {
          0% {
            transform: rotate(0deg) scale(1);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: rotate(180deg) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes flash-fade {
          0% {
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes fade-out {
          0% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
          100% {
            opacity: 0;
            transform: scale(1.1);
            filter: blur(10px);
          }
        }

        .animate-fade-out {
          animation: fade-out 0.8s ease-out forwards;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
