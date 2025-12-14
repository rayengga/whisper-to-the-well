"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AdaptiveDifficultyEngine, Challenge, ChallengeType } from "@/lib/gameEngine";
import Image from "next/image";

export default function GamePage() {
  const router = useRouter();
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [gameEngine] = useState(() => new AdaptiveDifficultyEngine());
  const [score, setScore] = useState(0);
  const [wellMood, setWellMood] = useState<string>('neutral');
  const [showInstructions, setShowInstructions] = useState(true);
  const [challengePhase, setChallengePhase] = useState<'waiting' | 'active' | 'feedback'>('waiting');
  const [userAnswer, setUserAnswer] = useState<any>(null);
  const [startTime, setStartTime] = useState(0);
  const [totalChallenges, setTotalChallenges] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const challengeTypes: ChallengeType[] = [
    'rapid-fire',
    'reaction-time',
    'memory-recall',
    'distraction-filter',
  ];

  // Start game
  const startGame = () => {
    setGameStarted(true);
    setShowInstructions(false);
    gameEngine.reset();
    setScore(0);
    setTotalChallenges(0);
    setGameComplete(false);
    loadNextChallenge();
  };

  // Load next challenge
  const loadNextChallenge = () => {
    if (totalChallenges >= 15) {
      setGameComplete(true);
      return;
    }

    const randomType = challengeTypes[Math.floor(Math.random() * challengeTypes.length)];
    const challenge = gameEngine.generateChallenge(randomType);
    setCurrentChallenge(challenge);
    setChallengePhase('active');
    setStartTime(Date.now());
    setUserAnswer(null);
  };

  // Handle answer submission
  const submitAnswer = (answer: any, correct: boolean) => {
    const responseTime = Date.now() - startTime;
    gameEngine.updateMetrics(correct, responseTime);
    
    if (correct) {
      setScore(prev => prev + Math.floor(100 / (responseTime / 1000)));
    }
    
    setUserAnswer({ answer, correct, responseTime });
    setChallengePhase('feedback');
    setWellMood(gameEngine.getWellMood());
    setTotalChallenges(prev => prev + 1);

    // Auto-advance after feedback
    setTimeout(() => {
      loadNextChallenge();
    }, 2000);
  };

  const metrics = gameEngine.getMetrics();

  return (
    <main className="relative flex min-h-screen items-center justify-center p-4 overflow-hidden bg-well-deep">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="block md:hidden absolute inset-0">
          <Image
            src="/1-mobile-view.jpeg"
            alt="Mystical well"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/1-pc-view.jpeg"
            alt="Mystical well"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-well-deep/60 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Instructions Screen */}
        {showInstructions && (
          <div className="bg-well-deep/80 backdrop-blur-md rounded-3xl p-8 md:p-12 border-2 border-well-glow/30 shadow-2xl animate-fade-in">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-light text-well-whisper mb-4">
                Whisper to the Well
              </h1>
              <p className="text-xl text-well-glow/90">
                An Adaptive Mind Training Game
              </p>

              <div className="text-left space-y-4 mt-8 text-well-glow/80">
                <h2 className="text-2xl font-light text-well-whisper mb-4">How to Play:</h2>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⚡</span>
                    <p><strong className="text-well-whisper">Speed Challenges:</strong> Answer questions quickly or react to visual cues</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🎯</span>
                    <p><strong className="text-well-whisper">Focus Challenges:</strong> Find targets among distractions</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🧠</span>
                    <p><strong className="text-well-whisper">Memory Challenges:</strong> Remember and recall sequences</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🌟</span>
                    <p><strong className="text-well-whisper">Adaptive Difficulty:</strong> The game adjusts to your performance</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-well-moss/20 rounded-xl border border-well-moss/40">
                  <p className="text-sm">
                    The magical well responds to your performance. Watch it glow brighter as you excel!
                  </p>
                </div>
              </div>

              <button
                onClick={startGame}
                className="mt-8 px-12 py-4 bg-gradient-to-r from-well-glow to-well-whisper text-well-deep font-medium rounded-full text-lg hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Begin Training
              </button>
            </div>
          </div>
        )}

        {/* Game Screen */}
        {gameStarted && !gameComplete && currentChallenge && (
          <div className="space-y-6 animate-fade-in">
            {/* Score and Stats Header */}
            <div className="bg-well-deep/80 backdrop-blur-md rounded-2xl p-4 border border-well-glow/30 flex justify-between items-center">
              <div>
                <div className="text-sm text-well-glow/70">Score</div>
                <div className="text-3xl font-bold text-well-whisper">{score}</div>
              </div>
              
              <div>
                <div className="text-sm text-well-glow/70">Progress</div>
                <div className="text-xl text-well-glow">{totalChallenges}/15</div>
              </div>
              
              <div>
                <div className="text-sm text-well-glow/70">Accuracy</div>
                <div className="text-xl text-well-glow">{metrics.accuracy.toFixed(0)}%</div>
              </div>
              
              <div>
                <div className="text-sm text-well-glow/70">Streak</div>
                <div className="text-xl text-well-whisper">{metrics.successStreak} 🔥</div>
              </div>
            </div>

            {/* Well Mood Indicator */}
            <div className="flex justify-center">
              <div className={`
                w-32 h-32 rounded-full transition-all duration-500 flex items-center justify-center text-6xl
                ${wellMood === 'excellent' && 'bg-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.5)] animate-pulse'}
                ${wellMood === 'good' && 'bg-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.4)]'}
                ${wellMood === 'neutral' && 'bg-well-glow/20 shadow-[0_0_30px_rgba(126,168,184,0.3)]'}
                ${wellMood === 'struggling' && 'bg-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.3)]'}
                ${wellMood === 'difficult' && 'bg-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]'}
              `}>
                {wellMood === 'excellent' && '✨'}
                {wellMood === 'good' && '😊'}
                {wellMood === 'neutral' && '🌙'}
                {wellMood === 'struggling' && '😐'}
                {wellMood === 'difficult' && '😓'}
              </div>
            </div>

            {/* Challenge Area */}
            <div className="bg-well-deep/90 backdrop-blur-md rounded-3xl p-8 md:p-12 border-2 border-well-glow/30 shadow-2xl min-h-[400px] flex items-center justify-center">
              {currentChallenge.type === 'rapid-fire' && (
                <RapidFireChallenge 
                  challenge={currentChallenge} 
                  onAnswer={submitAnswer}
                  phase={challengePhase}
                  userAnswer={userAnswer}
                />
              )}
              
              {currentChallenge.type === 'reaction-time' && (
                <ReactionTimeChallenge 
                  challenge={currentChallenge} 
                  onAnswer={submitAnswer}
                  phase={challengePhase}
                />
              )}
              
              {currentChallenge.type === 'memory-recall' && (
                <MemoryRecallChallenge 
                  challenge={currentChallenge} 
                  onAnswer={submitAnswer}
                  phase={challengePhase}
                  userAnswer={userAnswer}
                />
              )}
              
              {currentChallenge.type === 'distraction-filter' && (
                <DistractionFilterChallenge 
                  challenge={currentChallenge} 
                  onAnswer={submitAnswer}
                  phase={challengePhase}
                />
              )}
            </div>
          </div>
        )}

        {/* Game Complete Screen */}
        {gameComplete && (
          <div className="bg-well-deep/90 backdrop-blur-md rounded-3xl p-8 md:p-12 border-2 border-well-glow/30 shadow-2xl animate-fade-in">
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-4xl font-light text-well-whisper">Training Complete!</h2>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-6 bg-well-moss/20 rounded-xl border border-well-moss/40">
                  <div className="text-sm text-well-glow/70">Final Score</div>
                  <div className="text-4xl font-bold text-well-whisper mt-2">{score}</div>
                </div>
                
                <div className="p-6 bg-well-moss/20 rounded-xl border border-well-moss/40">
                  <div className="text-sm text-well-glow/70">Accuracy</div>
                  <div className="text-4xl font-bold text-well-whisper mt-2">{metrics.accuracy.toFixed(0)}%</div>
                </div>
                
                <div className="p-6 bg-well-moss/20 rounded-xl border border-well-moss/40">
                  <div className="text-sm text-well-glow/70">Best Streak</div>
                  <div className="text-4xl font-bold text-well-whisper mt-2">{metrics.successStreak}</div>
                </div>
                
                <div className="p-6 bg-well-moss/20 rounded-xl border border-well-moss/40">
                  <div className="text-sm text-well-glow/70">Avg Speed</div>
                  <div className="text-4xl font-bold text-well-whisper mt-2">{(metrics.averageSpeed / 1000).toFixed(1)}s</div>
                </div>
              </div>

              <div className="flex gap-4 mt-8 justify-center">
                <button
                  onClick={startGame}
                  className="px-8 py-3 bg-gradient-to-r from-well-glow to-well-whisper text-well-deep font-medium rounded-full hover:scale-105 transition-all duration-300"
                >
                  Play Again
                </button>
                
                <button
                  onClick={() => router.push('/recommendations')}
                  className="px-8 py-3 bg-well-deep/60 text-well-whisper border border-well-glow/40 rounded-full hover:bg-well-deep/80 transition-all duration-300"
                >
                  Back to Recommendations
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// Rapid Fire Challenge Component
function RapidFireChallenge({ challenge, onAnswer, phase, userAnswer }: any) {
  const { q, a } = challenge.data;
  const { timeLimit } = challenge.difficulty;
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    if (phase !== 'active') return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 100) {
          clearInterval(timer);
          onAnswer(null, false);
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [phase]);

  if (phase === 'feedback') {
    return (
      <div className="text-center space-y-6 animate-scale-gentle">
        <div className="text-6xl">
          {userAnswer?.correct ? '✅' : '❌'}
        </div>
        <p className="text-2xl text-well-glow">
          {userAnswer?.correct ? 'Correct!' : 'Incorrect'}
        </p>
        <p className="text-well-glow/70">
          Response time: {(userAnswer?.responseTime / 1000).toFixed(2)}s
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Time bar */}
      <div className="w-full h-2 bg-well-deep/50 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-well-glow to-well-whisper transition-all duration-100"
          style={{ width: `${(timeLeft / timeLimit) * 100}%` }}
        />
      </div>

      <div className="text-center space-y-8">
        <h3 className="text-3xl md:text-4xl font-light text-well-whisper">
          {q}
        </h3>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onAnswer(true, a === true)}
            className="px-12 py-6 bg-green-600/30 hover:bg-green-600/50 text-white text-2xl rounded-2xl border-2 border-green-500/50 hover:scale-105 transition-all duration-200"
          >
            TRUE
          </button>
          
          <button
            onClick={() => onAnswer(false, a === false)}
            className="px-12 py-6 bg-red-600/30 hover:bg-red-600/50 text-white text-2xl rounded-2xl border-2 border-red-500/50 hover:scale-105 transition-all duration-200"
          >
            FALSE
          </button>
        </div>
      </div>
    </div>
  );
}

// Reaction Time Challenge Component
function ReactionTimeChallenge({ challenge, onAnswer, phase }: any) {
  const { targetColor, delay, displayTime } = challenge.data;
  const [showTarget, setShowTarget] = useState(false);
  const [canClick, setCanClick] = useState(false);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (phase !== 'active') return;

    // Wait for delay
    const delayTimer = setTimeout(() => {
      setShowTarget(true);
      setCanClick(true);
      startTimeRef.current = Date.now();

      // Auto-fail if no click
      const failTimer = setTimeout(() => {
        if (canClick) {
          onAnswer(false, false);
        }
      }, displayTime);

      return () => clearTimeout(failTimer);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [phase]);

  const handleClick = () => {
    if (!canClick) return;
    
    const responseTime = Date.now() - startTimeRef.current;
    setCanClick(false);
    onAnswer(true, true);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-8">
      <p className="text-2xl text-well-glow text-center">
        Click when you see the {targetColor} circle!
      </p>

      <div className="relative w-full h-64 flex items-center justify-center">
        {!showTarget && (
          <p className="text-well-glow/50 text-xl">Wait for it...</p>
        )}
        
        {showTarget && canClick && (
          <button
            onClick={handleClick}
            className="w-32 h-32 rounded-full animate-scale-gentle transition-transform hover:scale-110"
            style={{ backgroundColor: targetColor }}
          />
        )}
      </div>
    </div>
  );
}

// Memory Recall Challenge Component
function MemoryRecallChallenge({ challenge, onAnswer, phase, userAnswer }: any) {
  const { sequence, displayTime } = challenge.data;
  const [showSequence, setShowSequence] = useState(true);
  const [userSequence, setUserSequence] = useState<string[]>([]);

  useEffect(() => {
    if (phase !== 'active') return;

    const timer = setTimeout(() => {
      setShowSequence(false);
    }, displayTime);

    return () => clearTimeout(timer);
  }, [phase]);

  const handleItemClick = (item: string) => {
    if (showSequence) return;

    const newSequence = [...userSequence, item];
    setUserSequence(newSequence);

    if (newSequence.length === sequence.length) {
      const correct = newSequence.every((item, i) => item === sequence[i]);
      onAnswer(newSequence, correct);
    }
  };

  if (phase === 'feedback') {
    return (
      <div className="text-center space-y-6 animate-scale-gentle">
        <div className="text-6xl">
          {userAnswer?.correct ? '✅' : '❌'}
        </div>
        <p className="text-2xl text-well-glow">
          {userAnswer?.correct ? 'Perfect Memory!' : 'Not quite right'}
        </p>
        <div className="flex gap-2 justify-center text-3xl">
          {sequence.map((item: string, i: number) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>
    );
  }

  if (showSequence) {
    return (
      <div className="text-center space-y-8">
        <p className="text-2xl text-well-glow">Memorize this sequence:</p>
        <div className="flex gap-4 justify-center text-5xl">
          {sequence.map((item: string, i: number) => (
            <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  const availableItems = ['🌟', '🌙', '☀️', '⭐', '💫', '✨', '🌈', '🔥', '💧', '🌊', '🍃', '🌸'];

  return (
    <div className="space-y-8">
      <p className="text-2xl text-well-glow text-center">Click the items in order:</p>
      
      <div className="flex gap-2 justify-center text-3xl min-h-[60px]">
        {userSequence.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {availableItems.map((item, i) => (
          <button
            key={i}
            onClick={() => handleItemClick(item)}
            className="text-4xl p-4 bg-well-deep/40 hover:bg-well-glow/20 rounded-xl border border-well-glow/30 hover:scale-110 transition-all"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

// Distraction Filter Challenge Component
function DistractionFilterChallenge({ challenge, onAnswer, phase }: any) {
  const { target, distractors } = challenge.data;
  const [timeLeft, setTimeLeft] = useState(challenge.difficulty.timeLimit);
  
  const allItems = [target, ...distractors].sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (phase !== 'active') return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 100) {
          clearInterval(timer);
          onAnswer(null, false);
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [phase, onAnswer]);

  const handleClick = (item: any) => {
    const correct = item.shape === target.shape && item.color === target.color;
    onAnswer(item, correct);
  };

  return (
    <div className="w-full space-y-8">
      <div className="w-full h-2 bg-well-deep/50 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-well-glow to-well-whisper transition-all duration-100"
          style={{ width: `${(timeLeft / challenge.difficulty.timeLimit) * 100}%` }}
        />
      </div>

      <p className="text-2xl text-well-glow text-center">
        Find the {target.color} {target.shape}!
      </p>

      <div className="grid grid-cols-4 gap-4">
        {allItems.map((item, i) => (
          <button
            key={i}
            onClick={() => handleClick(item)}
            className={`
              h-24 rounded-xl border-2 hover:scale-110 transition-all
              ${item.shape === 'circle' && 'rounded-full'}
              ${item.shape === 'square' && 'rounded-lg'}
              ${item.color === 'red' && 'bg-red-500/70 border-red-400'}
              ${item.color === 'blue' && 'bg-blue-500/70 border-blue-400'}
              ${item.color === 'green' && 'bg-green-500/70 border-green-400'}
              ${item.color === 'yellow' && 'bg-yellow-500/70 border-yellow-400'}
            `}
          />
        ))}
      </div>
    </div>
  );
}
