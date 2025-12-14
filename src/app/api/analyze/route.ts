/**
 * POST /api/analyze
 * 
 * Emotion Analysis API Endpoint
 * Analyzes free-text input for ALL 7 emotions and returns chart-ready insights
 * 
 * Detects: joy, sadness, anger, fear, disgust, surprise, neutral
 * 
 * Request Body:
 * {
 *   "text": "I'm feeling really frustrated with this situation!"
 * }
 * 
 * Response:
 * {
 *   "dominant_emotion": "anger",
 *   "scores": {
 *     "joy": 0.050,
 *     "sadness": 0.120,
 *     "anger": 0.620,
 *     "fear": 0.150,
 *     "disgust": 0.030,
 *     "surprise": 0.020,
 *     "neutral": 0.010
 *   },
 *   "trend": "anger increasing",
 *   "trend_confidence": "high",
 *   "change_percentage": 45.2,
 *   "visual_hint": "bar_chart",
 *   "timestamp": 1702512000000,
 *   "total_entries": 5,
 *   "disclaimer": "This is an emotional indicator, not a medical diagnosis"
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import { emotionAnalyzer } from '@/lib/emotionAnalyzer';
import { emotionStore, EmotionEntry } from '@/lib/emotionStore';
import { analyzeTrend } from '@/lib/trendAnalysis';

// Types
interface AnalyzeRequest {
  text: string;
}

interface AnalyzeResponse {
  dominant_emotion: string;
  scores: {
    joy: number;
    sadness: number;
    anger: number;
    fear: number;
    disgust: number;
    surprise: number;
    neutral: number;
  };
  trend: string;
  trend_confidence: 'low' | 'medium' | 'high';
  change_percentage: number;
  visual_hint: string;
  timestamp: number;
  total_entries: number;
  disclaimer: string;
}

interface ErrorResponse {
  error: string;
  details?: string;
}

/**
 * POST handler for emotion analysis
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: AnalyzeRequest = await request.json();

    // Validate input
    if (!body.text || typeof body.text !== 'string') {
      return NextResponse.json(
        { 
          error: 'Invalid input', 
          details: 'Text field is required and must be a string' 
        } as ErrorResponse,
        { status: 400 }
      );
    }

    // Validate text length
    if (body.text.trim().length === 0) {
      return NextResponse.json(
        { 
          error: 'Invalid input', 
          details: 'Text cannot be empty' 
        } as ErrorResponse,
        { status: 400 }
      );
    }

    if (body.text.length > 5000) {
      return NextResponse.json(
        { 
          error: 'Invalid input', 
          details: 'Text exceeds maximum length of 5000 characters' 
        } as ErrorResponse,
        { status: 400 }
      );
    }

    // Analyze emotions (detects all 7: joy, sadness, anger, fear, disgust, surprise, neutral)
    const analysis = await emotionAnalyzer.analyze(body.text);

    // Ensure all 7 emotions are present in scores (with 3 decimal precision)
    const allEmotions = ['joy', 'sadness', 'anger', 'fear', 'disgust', 'surprise', 'neutral'];
    const normalizedScores: any = {};
    
    allEmotions.forEach(emotion => {
      normalizedScores[emotion] = parseFloat((analysis.scores[emotion] || 0).toFixed(3));
    });

    // Create entry
    const timestamp = Date.now();
    const entry: EmotionEntry = {
      id: `${timestamp}-${Math.random().toString(36).substr(2, 9)}`,
      text: body.text,
      dominant_emotion: analysis.dominant_emotion,
      scores: normalizedScores,
      timestamp,
    };

    // Store entry
    emotionStore.addEntry(entry);

    // Get trend analysis
    const recentEntries = emotionStore.getRecentEntries(10);
    const olderEntries = emotionStore.getOlderEntries(10);
    const trendAnalysis = analyzeTrend(
      recentEntries,
      olderEntries,
      analysis.dominant_emotion
    );

    // Determine visualization hint based on data available
    let visualHint = 'bar_chart';
    if (emotionStore.getCount() >= 5) {
      visualHint = 'line_chart'; // Enough data for trend visualization
    }

    // Prepare response with all 7 emotions
    const response: AnalyzeResponse = {
      dominant_emotion: analysis.dominant_emotion,
      scores: normalizedScores,
      trend: trendAnalysis.trend,
      trend_confidence: trendAnalysis.confidence,
      change_percentage: trendAnalysis.change_percentage,
      visual_hint: visualHint,
      timestamp,
      total_entries: emotionStore.getCount(),
      disclaimer: 'This is an emotional indicator, not a medical diagnosis',
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Error in /api/analyze:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        error: 'Analysis failed', 
        details: errorMessage 
      } as ErrorResponse,
      { status: 500 }
    );
  }
}

/**
 * GET handler to check API status
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/analyze',
    method: 'POST',
    model_ready: emotionAnalyzer.isReady(),
    total_entries: emotionStore.getCount(),
    version: '1.0.0',
  });
}
