// Activity Recommendation System based on emotional analysis

export interface Activity {
  title: string;
  description: string;
  emoji: string;
  duration: string;
  category: 'creative' | 'physical' | 'social' | 'mindful' | 'expressive';
  emotionMatch: string[];
}

const activities: Activity[] = [
  // JOY activities
  {
    title: "Dance to Your Favorite Song",
    description: "Let your body move freely to music that makes you smile. No rules, just pure expression.",
    emoji: "💃",
    duration: "10-15 min",
    category: "physical",
    emotionMatch: ["joy", "surprise"]
  },
  {
    title: "Create a Gratitude Collage",
    description: "Gather images, colors, and words that represent things you're grateful for. Digital or paper - your choice.",
    emoji: "✨",
    duration: "20-30 min",
    category: "creative",
    emotionMatch: ["joy", "neutral"]
  },
  {
    title: "Write a Letter to Your Future Self",
    description: "Capture this joyful moment in words. What do you want to remember? What advice would you give?",
    emoji: "💌",
    duration: "15-20 min",
    category: "expressive",
    emotionMatch: ["joy", "neutral"]
  },
  
  // SADNESS activities
  {
    title: "Create a Comfort Playlist",
    description: "Curate songs that honor your feelings. Music that understands, comforts, or gently lifts you.",
    emoji: "🎵",
    duration: "15-25 min",
    category: "creative",
    emotionMatch: ["sadness", "neutral"]
  },
  {
    title: "Paint with Blues and Purples",
    description: "Express your emotions through color. No artistic skills needed - just let the colors flow.",
    emoji: "🎨",
    duration: "20-40 min",
    category: "creative",
    emotionMatch: ["sadness", "fear"]
  },
  {
    title: "Write a Poem for Your Feelings",
    description: "Give your sadness a voice. Short or long, rhyming or free - just let it out.",
    emoji: "📝",
    duration: "10-20 min",
    category: "expressive",
    emotionMatch: ["sadness", "neutral"]
  },
  {
    title: "Take a Gentle Nature Walk",
    description: "Move slowly through nature. Notice the small things. Let the earth hold your heaviness.",
    emoji: "🌿",
    duration: "15-30 min",
    category: "mindful",
    emotionMatch: ["sadness", "fear", "neutral"]
  },
  
  // ANGER activities
  {
    title: "Scribble Art Rage Release",
    description: "Grab paper and markers. Scribble with intensity. Tear it up if you need to. Transform anger into art.",
    emoji: "🖍️",
    duration: "10-15 min",
    category: "expressive",
    emotionMatch: ["anger", "disgust"]
  },
  {
    title: "Write an Unsent Letter",
    description: "Say everything you need to say. No filter, no holding back. Then decide what to do with it.",
    emoji: "✉️",
    duration: "15-25 min",
    category: "expressive",
    emotionMatch: ["anger", "sadness"]
  },
  {
    title: "High-Energy Movement",
    description: "Box, run, jump, dance hard. Let your body process what words can't express.",
    emoji: "🥊",
    duration: "15-30 min",
    category: "physical",
    emotionMatch: ["anger", "surprise"]
  },
  {
    title: "Create a Protest Playlist",
    description: "Channel your anger into music. Loud, powerful, unapologetic songs that match your energy.",
    emoji: "🎸",
    duration: "20-30 min",
    category: "creative",
    emotionMatch: ["anger", "disgust"]
  },
  
  // FEAR activities
  {
    title: "Build a Safety Nest",
    description: "Create a cozy corner with blankets, pillows, soft lighting. A physical space that holds you.",
    emoji: "🏡",
    duration: "15-20 min",
    category: "mindful",
    emotionMatch: ["fear", "sadness"]
  },
  {
    title: "List Your Strengths",
    description: "Write down times you've been brave. Skills you have. People who support you. Evidence of your resilience.",
    emoji: "🛡️",
    duration: "10-15 min",
    category: "expressive",
    emotionMatch: ["fear", "neutral"]
  },
  {
    title: "Guided Breathing Journey",
    description: "Follow a meditation that grounds you back in your body. YouTube has many - find one that feels right.",
    emoji: "🫁",
    duration: "5-15 min",
    category: "mindful",
    emotionMatch: ["fear", "sadness", "anger"]
  },
  {
    title: "Draw Your Fears as Monsters",
    description: "Make your fears visible. Sometimes when we see them on paper, they become less overwhelming.",
    emoji: "👹",
    duration: "15-25 min",
    category: "creative",
    emotionMatch: ["fear", "anger"]
  },
  
  // SURPRISE activities
  {
    title: "Free-Write About This Moment",
    description: "Capture the surprise. What does it feel like? What happened? Let the words tumble out.",
    emoji: "⚡",
    duration: "10-20 min",
    category: "expressive",
    emotionMatch: ["surprise", "joy", "fear"]
  },
  {
    title: "Try Something New",
    description: "Ride the surprise energy. Learn a new recipe, try a new route, explore something you've been curious about.",
    emoji: "🌟",
    duration: "30-60 min",
    category: "creative",
    emotionMatch: ["surprise", "joy"]
  },
  {
    title: "Call Someone Unexpected",
    description: "Reach out to someone you've been thinking about. Share the moment or just connect.",
    emoji: "📞",
    duration: "15-30 min",
    category: "social",
    emotionMatch: ["surprise", "joy"]
  },
  
  // NEUTRAL activities
  {
    title: "Mindful Doodling",
    description: "No goal, no judgment. Just let your pen wander. Patterns, shapes, whatever emerges.",
    emoji: "✏️",
    duration: "15-25 min",
    category: "creative",
    emotionMatch: ["neutral", "sadness"]
  },
  {
    title: "Organize Something Small",
    description: "A drawer, your phone apps, a shelf. Small acts of order can be surprisingly satisfying.",
    emoji: "📦",
    duration: "20-30 min",
    category: "mindful",
    emotionMatch: ["neutral", "disgust"]
  },
  {
    title: "Learn One New Thing",
    description: "Pick a topic you're curious about. Watch a video, read an article, explore for 20 minutes.",
    emoji: "🧠",
    duration: "20-30 min",
    category: "creative",
    emotionMatch: ["neutral", "surprise"]
  },
  
  // DISGUST activities
  {
    title: "Cleansing Ritual",
    description: "Clean your space, take a long shower, change your sheets. Physical cleansing for emotional release.",
    emoji: "🧼",
    duration: "30-45 min",
    category: "physical",
    emotionMatch: ["disgust", "anger"]
  },
  {
    title: "Set a Boundary",
    description: "Write down what you won't tolerate anymore. Define your limits clearly. This is self-respect in action.",
    emoji: "🚫",
    duration: "15-20 min",
    category: "expressive",
    emotionMatch: ["disgust", "anger"]
  },
  {
    title: "Create Your Ideal Environment",
    description: "Sketch or collage what your perfect space would look like. What would you keep? What would you remove?",
    emoji: "🏠",
    duration: "20-30 min",
    category: "creative",
    emotionMatch: ["disgust", "neutral"]
  }
];

export interface QuickAction {
  text: string;
  icon: string;
}

export const emotionActions: Record<string, QuickAction[]> = {
  anger: [
    { text: "Move your body: fast walk, run, or push-ups to release anger quickly.", icon: "🔥" },
    { text: "Calm your mind: deep breathing for 2 minutes or write what you're feeling.", icon: "🧘" }
  ],
  sadness: [
    { text: "Connect or express: talk to someone you trust or write your feelings.", icon: "💬" },
    { text: "Gentle care: slow walk, calming music, or deep breathing.", icon: "🌸" }
  ],
  fear: [
    { text: "Ground yourself: slow breathing and name 5 things you can see around you.", icon: "🌿" },
    { text: "Reassure action: take one small step toward what scares you.", icon: "👣" }
  ],
  joy: [
    { text: "Celebrate it: smile, dance, or share the moment with someone.", icon: "🎉" },
    { text: "Savor it: pause, breathe, and notice what makes this moment good.", icon: "✨" }
  ],
  disgust: [
    { text: "Create distance: step away, wash your hands, or get fresh air.", icon: "🚪" },
    { text: "Reset your senses: breathe slowly or focus on a neutral, clean environment.", icon: "🧼" }
  ],
  surprise: [
    { text: "Pause and breathe: give your body a moment to settle.", icon: "⏸️" },
    { text: "Assess calmly: notice what happened and decide your next step.", icon: "🧭" }
  ],
  neutral: [
    { text: "Stay present: notice your breath and surroundings.", icon: "🍃" },
    { text: "Choose intention: decide what you want to do next.", icon: "🎯" }
  ]
};

export function getRecommendations(userData: any): QuickAction[] {
  const dominantEmotion = userData.aiAnalysis?.dominant_emotion || 'neutral';
  return emotionActions[dominantEmotion] || emotionActions.neutral;
}

export function getPersonalizedMessage(userData: any): string {
  const name = userData.profile?.name || 'friend';
  const dominantEmotion = userData.aiAnalysis?.dominant_emotion || 'neutral';
  
  const messages: Record<string, string> = {
    joy: `${name}, your light is shining bright today. Here are some ways to honor and amplify that joy:`,
    sadness: `${name}, it takes courage to feel what you're feeling. These activities might offer comfort and expression:`,
    anger: `${name}, your anger is valid and deserves space. Here are healthy ways to channel that energy:`,
    fear: `${name}, feeling afraid doesn't mean you're weak. These activities can help you find your ground:`,
    disgust: `${name}, sometimes we need to create boundaries and cleanse. These might help:`,
    surprise: `${name}, life just threw you a curveball. Here are ways to process and respond:`,
    neutral: `${name}, sometimes stillness is exactly what we need. Here are gentle invitations:`
  };
  
  return messages[dominantEmotion] || messages.neutral;
}
