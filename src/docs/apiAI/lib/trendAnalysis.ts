/**
 * Trend Analysis Utilities
 * Computes emotion trends from historical entries
 */

import { EmotionEntry, EmotionScores } from './emotionStore';

export interface TrendAnalysis {
  trend: string;
  confidence: 'low' | 'medium' | 'high';
  change_percentage: number;
}

/**
 * Calculate average emotion scores from a list of entries
 */
function calculateAverageScores(entries: EmotionEntry[]): EmotionScores {
  if (entries.length === 0) return {};

  const totals: EmotionScores = {};
  const counts: { [emotion: string]: number } = {};

  entries.forEach((entry) => {
    Object.entries(entry.scores).forEach(([emotion, score]) => {
      totals[emotion] = (totals[emotion] || 0) + score;
      counts[emotion] = (counts[emotion] || 0) + 1;
    });
  });

  const averages: EmotionScores = {};
  Object.keys(totals).forEach((emotion) => {
    averages[emotion] = totals[emotion] / counts[emotion];
  });

  return averages;
}

/**
 * Find the dominant emotion from scores
 */
function findDominantEmotion(scores: EmotionScores): string {
  let maxEmotion = '';
  let maxScore = -1;

  Object.entries(scores).forEach(([emotion, score]) => {
    if (score > maxScore) {
      maxScore = score;
      maxEmotion = emotion;
    }
  });

  return maxEmotion;
}

/**
 * Analyze trend for a specific emotion
 */
export function analyzeTrend(
  recentEntries: EmotionEntry[],
  olderEntries: EmotionEntry[],
  targetEmotion: string
): TrendAnalysis {
  // Not enough data for trend analysis
  if (recentEntries.length < 2) {
    return {
      trend: `${targetEmotion} detected`,
      confidence: 'low',
      change_percentage: 0,
    };
  }

  const recentAvg = calculateAverageScores(recentEntries);
  const recentScore = recentAvg[targetEmotion] || 0;

  // If no historical data, just report current state
  if (olderEntries.length === 0) {
    return {
      trend: `${targetEmotion} present`,
      confidence: 'low',
      change_percentage: 0,
    };
  }

  const olderAvg = calculateAverageScores(olderEntries);
  const olderScore = olderAvg[targetEmotion] || 0;

  // Calculate change
  const change = recentScore - olderScore;
  const changePercentage = olderScore > 0 ? (change / olderScore) * 100 : 0;

  // Determine trend direction
  let trendText = `${targetEmotion} stable`;
  let confidence: 'low' | 'medium' | 'high' = 'low';

  if (Math.abs(changePercentage) > 30) {
    confidence = 'high';
  } else if (Math.abs(changePercentage) > 15) {
    confidence = 'medium';
  }

  if (changePercentage > 10) {
    trendText = `${targetEmotion} increasing`;
  } else if (changePercentage < -10) {
    trendText = `${targetEmotion} decreasing`;
  }

  return {
    trend: trendText,
    confidence,
    change_percentage: Math.round(changePercentage * 10) / 10,
  };
}

/**
 * Get comprehensive trend analysis
 */
export function getComprehensiveTrends(
  recentEntries: EmotionEntry[],
  olderEntries: EmotionEntry[]
): {
  primary_trend: TrendAnalysis;
  all_emotions: { [emotion: string]: TrendAnalysis };
} {
  if (recentEntries.length === 0) {
    return {
      primary_trend: {
        trend: 'no data',
        confidence: 'low',
        change_percentage: 0,
      },
      all_emotions: {},
    };
  }

  // Get all unique emotions from recent entries
  const allEmotions = new Set<string>();
  recentEntries.forEach((entry) => {
    Object.keys(entry.scores).forEach((emotion) => allEmotions.add(emotion));
  });

  // Analyze trends for all emotions
  const emotionTrends: { [emotion: string]: TrendAnalysis } = {};
  allEmotions.forEach((emotion) => {
    emotionTrends[emotion] = analyzeTrend(recentEntries, olderEntries, emotion);
  });

  // Find dominant emotion in recent entries
  const recentAvg = calculateAverageScores(recentEntries);
  const dominantEmotion = findDominantEmotion(recentAvg);

  return {
    primary_trend: emotionTrends[dominantEmotion] || {
      trend: 'unknown',
      confidence: 'low',
      change_percentage: 0,
    },
    all_emotions: emotionTrends,
  };
}
