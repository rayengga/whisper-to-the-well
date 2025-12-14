/**
 * GET /api/stats
 * 
 * Returns statistical insights about all emotion entries
 * 
 * Response:
 * {
 *   "total_entries": 25,
 *   "emotion_distribution": {
 *     "joy": 0.45,
 *     "sadness": 0.30,
 *     "anger": 0.15,
 *     "fear": 0.10
 *   },
 *   "most_common_emotion": "joy",
 *   "visual_hint": "pie_chart"
 * }
 */

import { NextResponse } from 'next/server';
import { emotionStore, EmotionScores } from '@/app/api/apiAI/lib/emotionStore';

export async function GET() {
  try {
    const allEntries = emotionStore.getAllEntries();
    const totalEntries = allEntries.length;

    if (totalEntries === 0) {
      return NextResponse.json({
        total_entries: 0,
        emotion_distribution: {},
        most_common_emotion: null,
        visual_hint: 'no_data',
        message: 'No entries yet. Submit text to /api/analyze to get started.',
      });
    }

    // Calculate emotion distribution
    const emotionCounts: { [emotion: string]: number } = {};
    const emotionScoreSums: EmotionScores = {};

    allEntries.forEach((entry) => {
      // Count dominant emotions
      emotionCounts[entry.dominant_emotion] = 
        (emotionCounts[entry.dominant_emotion] || 0) + 1;

      // Sum all emotion scores
      Object.entries(entry.scores).forEach(([emotion, score]) => {
        emotionScoreSums[emotion] = (emotionScoreSums[emotion] || 0) + score;
      });
    });

    // Calculate percentages for dominant emotions
    const emotionDistribution: EmotionScores = {};
    Object.entries(emotionCounts).forEach(([emotion, count]) => {
      emotionDistribution[emotion] = 
        Math.round((count / totalEntries) * 100) / 100;
    });

    // Find most common emotion
    let mostCommonEmotion = '';
    let maxCount = 0;
    Object.entries(emotionCounts).forEach(([emotion, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostCommonEmotion = emotion;
      }
    });

    // Calculate average scores for all emotions
    const avgScores: EmotionScores = {};
    Object.entries(emotionScoreSums).forEach(([emotion, sum]) => {
      avgScores[emotion] = Math.round((sum / totalEntries) * 100) / 100;
    });

    return NextResponse.json({
      total_entries: totalEntries,
      emotion_distribution: emotionDistribution,
      average_scores: avgScores,
      most_common_emotion: mostCommonEmotion,
      visual_hint: 'pie_chart',
    });

  } catch (error) {
    console.error('Error in /api/stats:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve statistics' },
      { status: 500 }
    );
  }
}
