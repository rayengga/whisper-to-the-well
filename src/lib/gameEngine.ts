// Adaptive Difficulty Engine for "Whisper to the Well" Mini-Game

export interface PerformanceMetrics {
  accuracy: number; // 0-100
  averageSpeed: number; // milliseconds
  consistency: number; // standard deviation
  successStreak: number;
  totalAttempts: number;
  correctAnswers: number;
}

export interface DifficultySettings {
  level: number; // 1-10
  timeLimit: number; // milliseconds
  distractionLevel: number; // 0-10
  complexity: number; // 1-5
  itemCount: number; // for memory challenges
}

export type ChallengeType = 
  | 'rapid-fire'
  | 'reaction-time'
  | 'distraction-filter'
  | 'memory-recall'
  | 'multi-task'
  | 'problem-solve';

export interface Challenge {
  id: string;
  type: ChallengeType;
  difficulty: DifficultySettings;
  data: any;
}

export class AdaptiveDifficultyEngine {
  private metrics: PerformanceMetrics = {
    accuracy: 100,
    averageSpeed: 0,
    consistency: 0,
    successStreak: 0,
    totalAttempts: 0,
    correctAnswers: 0,
  };

  private speedHistory: number[] = [];
  private baseDifficulty: DifficultySettings = {
    level: 3,
    timeLimit: 3000,
    distractionLevel: 2,
    complexity: 1,
    itemCount: 3,
  };

  // Update metrics based on user performance
  updateMetrics(correct: boolean, responseTime: number): void {
    this.metrics.totalAttempts++;
    if (correct) {
      this.metrics.correctAnswers++;
      this.metrics.successStreak++;
    } else {
      this.metrics.successStreak = 0;
    }

    // Update accuracy
    this.metrics.accuracy = (this.metrics.correctAnswers / this.metrics.totalAttempts) * 100;

    // Update speed tracking
    this.speedHistory.push(responseTime);
    if (this.speedHistory.length > 10) {
      this.speedHistory.shift(); // Keep only last 10
    }

    // Calculate average speed
    this.metrics.averageSpeed = 
      this.speedHistory.reduce((a, b) => a + b, 0) / this.speedHistory.length;

    // Calculate consistency (standard deviation)
    if (this.speedHistory.length > 2) {
      const mean = this.metrics.averageSpeed;
      const variance = 
        this.speedHistory.reduce((sum, time) => sum + Math.pow(time - mean, 2), 0) / 
        this.speedHistory.length;
      this.metrics.consistency = Math.sqrt(variance);
    }
  }

  // Get current performance metrics
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  // Calculate adaptive difficulty based on performance
  getAdaptiveDifficulty(baseSettings: DifficultySettings): DifficultySettings {
    const { accuracy, averageSpeed, successStreak, totalAttempts } = this.metrics;

    // Don't adjust until we have enough data
    if (totalAttempts < 3) {
      return baseSettings;
    }

    let levelAdjustment = 0;

    // Accuracy-based adjustment
    if (accuracy > 90 && successStreak >= 3) {
      levelAdjustment += 1;
    } else if (accuracy < 60) {
      levelAdjustment -= 1;
    }

    // Speed-based adjustment (compared to time limit)
    const speedRatio = averageSpeed / baseSettings.timeLimit;
    if (speedRatio < 0.5 && accuracy > 80) {
      levelAdjustment += 1; // Fast and accurate
    } else if (speedRatio > 0.9) {
      levelAdjustment -= 0.5; // Using full time
    }

    // Streak bonus
    if (successStreak >= 5) {
      levelAdjustment += 1;
    }

    // Apply adjustments
    const newLevel = Math.max(1, Math.min(10, baseSettings.level + levelAdjustment));
    const levelMultiplier = newLevel / baseSettings.level;

    return {
      level: newLevel,
      timeLimit: Math.max(1000, baseSettings.timeLimit * (1 - (levelMultiplier - 1) * 0.15)),
      distractionLevel: Math.min(10, Math.floor(baseSettings.distractionLevel * levelMultiplier)),
      complexity: Math.min(5, Math.ceil(baseSettings.complexity * Math.sqrt(levelMultiplier))),
      itemCount: Math.min(12, Math.floor(baseSettings.itemCount * levelMultiplier)),
    };
  }

  // Get well mood based on performance (for visual feedback)
  getWellMood(): 'excellent' | 'good' | 'neutral' | 'struggling' | 'difficult' {
    const { accuracy, successStreak } = this.metrics;

    if (accuracy >= 90 && successStreak >= 5) return 'excellent';
    if (accuracy >= 75 && successStreak >= 3) return 'good';
    if (accuracy >= 60) return 'neutral';
    if (accuracy >= 40) return 'struggling';
    return 'difficult';
  }

  // Reset for new game session
  reset(): void {
    this.metrics = {
      accuracy: 100,
      averageSpeed: 0,
      consistency: 0,
      successStreak: 0,
      totalAttempts: 0,
      correctAnswers: 0,
    };
    this.speedHistory = [];
  }

  // Generate challenges based on current difficulty
  generateChallenge(type: ChallengeType): Challenge {
    const difficulty = this.getAdaptiveDifficulty(this.baseDifficulty);
    
    return {
      id: `${type}-${Date.now()}`,
      type,
      difficulty,
      data: this.generateChallengeData(type, difficulty),
    };
  }

  private generateChallengeData(type: ChallengeType, difficulty: DifficultySettings): any {
    switch (type) {
      case 'rapid-fire':
        return this.generateRapidFireData(difficulty);
      case 'reaction-time':
        return this.generateReactionTimeData(difficulty);
      case 'distraction-filter':
        return this.generateDistractionFilterData(difficulty);
      case 'memory-recall':
        return this.generateMemoryRecallData(difficulty);
      case 'multi-task':
        return this.generateMultiTaskData(difficulty);
      case 'problem-solve':
        return this.generateProblemSolveData(difficulty);
      default:
        return {};
    }
  }

  private generateRapidFireData(difficulty: DifficultySettings) {
    const questions = [
      { q: 'Is 5 + 3 = 8?', a: true },
      { q: 'Is the sky green?', a: false },
      { q: 'Does water freeze at 0°C?', a: true },
      { q: 'Is 10 × 2 = 25?', a: false },
      { q: 'Are there 7 days in a week?', a: true },
      { q: 'Is the sun cold?', a: false },
      { q: 'Does 15 ÷ 3 = 5?', a: true },
      { q: 'Is a triangle a shape with 4 sides?', a: false },
    ];
    
    return questions[Math.floor(Math.random() * questions.length)];
  }

  private generateReactionTimeData(difficulty: DifficultySettings) {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    return {
      targetColor: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2000 + 1000, // 1-3 seconds
      displayTime: Math.max(500, 2000 - difficulty.level * 150),
    };
  }

  private generateDistractionFilterData(difficulty: DifficultySettings) {
    const shapes = ['circle', 'square', 'triangle', 'star'];
    const colors = ['red', 'blue', 'green', 'yellow'];
    
    return {
      target: { shape: shapes[0], color: colors[0] },
      distractors: Array(difficulty.distractionLevel)
        .fill(null)
        .map(() => ({
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
        })),
    };
  }

  private generateMemoryRecallData(difficulty: DifficultySettings) {
    const items = ['🌟', '🌙', '☀️', '⭐', '💫', '✨', '🌈', '🔥', '💧', '🌊', '🍃', '🌸'];
    const sequence = [];
    
    for (let i = 0; i < difficulty.itemCount; i++) {
      sequence.push(items[Math.floor(Math.random() * items.length)]);
    }
    
    return { sequence, displayTime: 1000 + difficulty.itemCount * 500 };
  }

  private generateMultiTaskData(difficulty: DifficultySettings) {
    return {
      primaryTask: this.generateRapidFireData(difficulty),
      secondaryTask: {
        trackingSpeed: 1 + difficulty.level * 0.3,
        trackingCount: Math.min(3, 1 + Math.floor(difficulty.level / 3)),
      },
    };
  }

  private generateProblemSolveData(difficulty: DifficultySettings) {
    const puzzles = [
      { q: 'If you have 3 apples and get 2 more, how many do you have?', a: 5 },
      { q: 'What comes next: 2, 4, 6, 8, __?', a: 10 },
      { q: 'If all birds can fly, and a robin is a bird, can a robin fly?', a: 1 }, // Yes = 1
      { q: 'How many sides does a hexagon have?', a: 6 },
    ];
    
    return puzzles[Math.floor(Math.random() * Math.min(puzzles.length, difficulty.complexity))];
  }
}
