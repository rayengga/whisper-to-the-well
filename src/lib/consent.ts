// Consent management utilities

export interface ConsentData {
  analytics: boolean;
  timestamp: number;
  version: string;
}

const CONSENT_KEY = 'user-consent';
const CONSENT_VERSION = '1.0';

export const getConsent = (): ConsentData | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const setConsent = (analytics: boolean): void => {
  if (typeof window === 'undefined') return;
  
  const consent: ConsentData = {
    analytics,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  };
  
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
};

export const revokeConsent = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CONSENT_KEY);
};

export const hasConsent = (): boolean => {
  const consent = getConsent();
  return consent?.analytics === true;
};

// Analytics tracking function (only tracks if consent given)
export const trackEvent = (eventName: string, data?: Record<string, any>): void => {
  if (!hasConsent()) return;
  
  // Implement your analytics tracking here
  console.log('Analytics Event:', eventName, {
    timestamp: new Date().toISOString(),
    timeOfDay: getTimeOfDay(),
    deviceType: getDeviceType(),
    ...data,
  });
};

const getTimeOfDay = (): string => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
};

const getDeviceType = (): string => {
  if (typeof window === 'undefined') return 'unknown';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};
