"use client";

import { useRouter } from "next/navigation";
import { revokeConsent } from "@/lib/consent";

export default function TermsPage() {
  const router = useRouter();

  const handleRevokeConsent = () => {
    revokeConsent();
    alert("Your consent has been revoked. The page will reload to apply changes.");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-well-deep via-well-stone to-well-deep p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-light text-well-whisper mb-4">
            Privacy Policy & Terms
          </h1>
          <p className="text-well-glow/80 font-light">
            Last updated: December 14, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-well-water/10 backdrop-blur-md rounded-3xl border border-well-glow/20 
                      shadow-xl p-8 md:p-12 space-y-8 animate-scale-gentle">
          
          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-well-whisper">
              Welcome to Whisper to the Well
            </h2>
            <p className="text-well-whisper/80 font-light leading-relaxed">
              We believe in transparency. This policy explains what data we collect, why we collect it, 
              and how you can control your information. Your privacy and trust are our priorities.
            </p>
          </section>

          {/* What We Collect */}
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-well-whisper">
              📊 What We Collect
            </h2>
            <div className="space-y-3 text-well-whisper/80 font-light">
              <p className="leading-relaxed">
                We collect <strong className="text-well-whisper">anonymized, non-personal data</strong> to 
                improve your experience:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>General location:</strong> Country and city (via IP address) to provide localized support</li>
                <li><strong>Usage patterns:</strong> Time of day you use the app (morning/afternoon/evening/night)</li>
                <li><strong>Response times:</strong> How long you spend on each question to optimize the experience</li>
                <li><strong>Device type:</strong> Mobile, tablet, or desktop to improve interface design</li>
              </ul>
              <p className="pt-2 text-well-glow/90">
                <strong>What we DON'T collect:</strong> Your name, email, personal thoughts, or any identifiable information 
                unless you explicitly provide it. Your whispers to the well remain private.
              </p>
            </div>
          </section>

          {/* Why We Collect */}
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-well-whisper">
              🎯 Why We Collect This Data
            </h2>
            <div className="text-well-whisper/80 font-light space-y-2">
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Understand when our app is most helpful to users</li>
                <li>Optimize load times and performance across devices</li>
                <li>Improve question flow based on interaction patterns</li>
                <li>Provide region-appropriate mental health resources</li>
              </ul>
            </div>
          </section>

          {/* How We Use It */}
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-well-whisper">
              🔒 How We Protect Your Data
            </h2>
            <div className="text-well-whisper/80 font-light leading-relaxed space-y-3">
              <p>
                <strong>Encryption:</strong> All data is encrypted in transit and at rest.
              </p>
              <p>
                <strong>Anonymization:</strong> We cannot link collected data back to you personally.
              </p>
              <p>
                <strong>No sharing:</strong> We never sell or share your data with third parties.
              </p>
              <p>
                <strong>Secure storage:</strong> Data is stored on secure, GDPR-compliant servers.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-well-whisper">
              ✅ Your Rights (GDPR/CCPA Compliant)
            </h2>
            <div className="text-well-whisper/80 font-light space-y-3">
              <p className="leading-relaxed">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Access:</strong> Request a copy of any data we have</li>
                <li><strong>Delete:</strong> Request deletion of your data at any time</li>
                <li><strong>Opt-out:</strong> Reject or revoke consent for data collection</li>
                <li><strong>Correct:</strong> Update any inaccurate information</li>
                <li><strong>Port:</strong> Receive your data in a portable format</li>
              </ul>
            </div>
          </section>

          {/* Cookies */}
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-well-whisper">
              🍪 Cookie Policy
            </h2>
            <div className="text-well-whisper/80 font-light leading-relaxed space-y-3">
              <p>
                We use <strong>localStorage</strong> (not traditional cookies) to remember your consent choice. 
                This data stays on your device and is never transmitted to our servers.
              </p>
              <p>
                <strong>Essential:</strong> Consent preferences (cannot be disabled)
              </p>
              <p>
                <strong>Analytics:</strong> Usage patterns (requires your consent)
              </p>
            </div>
          </section>

          {/* Age Restrictions */}
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-well-whisper">
              👤 Age Requirements
            </h2>
            <p className="text-well-whisper/80 font-light leading-relaxed">
              This service is intended for users aged 13 and above. If you are under 13, 
              please use this service with parental guidance. We do not knowingly collect 
              data from children under 13 without parental consent.
            </p>
          </section>

          {/* Liability */}
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-well-whisper">
              ⚖️ Disclaimer
            </h2>
            <div className="text-well-whisper/80 font-light leading-relaxed space-y-3">
              <p>
                <strong>Not medical advice:</strong> This app provides emotional support tools but is not 
                a substitute for professional mental health care. If you are experiencing a crisis, 
                please contact emergency services or a mental health professional.
              </p>
              <p>
                <strong>Use at your own discretion:</strong> While we strive to create a safe space, 
                we cannot guarantee specific outcomes or results from using this service.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-well-whisper">
              📧 Contact & Data Requests
            </h2>
            <div className="text-well-whisper/80 font-light leading-relaxed space-y-3">
              <p>
                For privacy concerns, data requests, or questions:
              </p>
              <p className="text-well-glow">
                Email: <a href="mailto:privacy@whisperwell.app" className="underline">privacy@whisperwell.app</a>
              </p>
              <p>
                We will respond to all requests within 30 days.
              </p>
            </div>
          </section>

          {/* Revoke Consent */}
          <section className="space-y-4 pt-8 border-t border-well-glow/20">
            <h2 className="text-2xl font-light text-well-whisper">
              🔄 Manage Your Consent
            </h2>
            <p className="text-well-whisper/80 font-light leading-relaxed">
              You can revoke your consent at any time. This will prevent any future data collection.
            </p>
            <button
              onClick={handleRevokeConsent}
              className="px-8 py-4 rounded-full bg-well-water/20 hover:bg-well-water/30
                       border border-well-glow/30 hover:border-well-glow/60
                       text-well-whisper hover:text-white font-light
                       transition-calm shadow-lg hover:well-glow"
            >
              Revoke My Consent
            </button>
          </section>

          {/* Updates */}
          <section className="space-y-4 pt-8 border-t border-well-glow/20">
            <h2 className="text-2xl font-light text-well-whisper">
              📝 Policy Updates
            </h2>
            <p className="text-well-whisper/80 font-light leading-relaxed">
              We may update this policy from time to time. Significant changes will be communicated 
              through the app. Continued use after changes indicates acceptance of the updated terms.
            </p>
          </section>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.back()}
            className="text-well-glow hover:text-well-whisper transition-calm 
                     font-light underline underline-offset-4"
          >
            ← Back to App
          </button>
        </div>
      </div>
    </main>
  );
}
