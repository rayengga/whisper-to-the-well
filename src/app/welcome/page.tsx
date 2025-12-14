"use client";

import { useEffect, useState } from "react";

export default function Welcome() {
  const [name, setName] = useState("Friend");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    // Retrieve stored information
    setName(sessionStorage.getItem("name") || "Friend");
    setGender(sessionStorage.getItem("gender") || "");
    setAge(sessionStorage.getItem("age") || "");
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center p-8 animate-fade-in">
      <div className="flex flex-col items-center gap-12 max-w-2xl w-full text-center">
        <div className="space-y-6 animate-scale-gentle">
          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-well-whisper">
            Welcome, {name}
          </h1>
          <p className="text-xl md:text-2xl font-light text-well-glow/80 leading-relaxed">
            You're in a safe space
          </p>
        </div>

        {/* Summary Card */}
        <div className="mt-8 p-10 rounded-3xl bg-well-water/10 border border-well-glow/20 
                      backdrop-blur-sm space-y-4 w-full max-w-md animate-scale-gentle well-glow">
          <p className="text-lg font-light text-well-whisper/80">
            We're here to support you on your wellness journey
          </p>
          
          {(gender || age) && (
            <div className="pt-6 mt-6 border-t border-well-glow/20 text-sm text-well-glow/60 space-y-2">
              {gender && gender !== "skipped" && (
                <p className="capitalize">Gender: {gender}</p>
              )}
              {age && age !== "0" && (
                <p>Age range stored</p>
              )}
            </div>
          )}
        </div>

        {/* Next Steps Placeholder */}
        <div className="space-y-4 animate-fade-in">
          <p className="text-well-glow/60 font-light">
            Your personalized experience will continue here...
          </p>
        </div>
      </div>
    </main>
  );
}
