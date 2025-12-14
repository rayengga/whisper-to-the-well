"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getConsent, setConsent } from "@/lib/consent";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already given/rejected consent
    const consent = getConsent();
    if (!consent) {
      // Small delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    setConsent(true);
    setShowBanner(false);
  };

  const handleReject = () => {
    setConsent(false);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 animate-fade-in">
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-well-deep/60 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto p-6 md:p-8">
        <div className="bg-well-stone/90 backdrop-blur-md rounded-3xl border-2 border-well-glow/30 
                      shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Text Content */}
            <div className="flex-1 space-y-3">
              <h3 className="text-xl md:text-2xl font-light text-well-whisper">
                🍪 Your Privacy Matters
              </h3>
              <p className="text-sm md:text-base font-light text-well-whisper/80 leading-relaxed">
                We collect anonymized data to improve your experience: device type, usage patterns, 
                and response times. Your thoughts and personal information remain private and are never shared.
              </p>
              <Link 
                href="/terms"
                className="text-sm text-well-glow hover:text-well-whisper transition-calm 
                         underline underline-offset-2 inline-block"
              >
                Read our full Privacy Policy →
              </Link>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:flex-col md:min-w-[200px]">
              <button
                onClick={handleAccept}
                className="px-8 py-3 rounded-full bg-well-glow/30 hover:bg-well-glow/40
                         border border-well-glow/50 hover:border-well-glow/70
                         text-well-whisper hover:text-white font-light
                         transition-calm shadow-lg hover:well-glow"
              >
                Accept
              </button>
              <button
                onClick={handleReject}
                className="px-8 py-3 rounded-full bg-well-water/20 hover:bg-well-water/30
                         border border-well-glow/30 hover:border-well-glow/50
                         text-well-whisper/70 hover:text-well-whisper font-light
                         transition-calm"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
