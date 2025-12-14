/**
 * GET /api/history
 * 
 * Returns historical emotion entries
 * 
 * Query Parameters:
 * - limit: number of recent entries to return (default: 10, max: 100)
 * 
 * Response:
 * {
 *   "entries": [...],
 *   "total": 25,
 *   "limit": 10
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import { emotionStore } from '@/app/api/apiAI/lib/emotionStore';

export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const limitParam = searchParams.get('limit');
    let limit = 10;

    if (limitParam) {
      const parsedLimit = parseInt(limitParam, 10);
      if (!isNaN(parsedLimit) && parsedLimit > 0 && parsedLimit <= 100) {
        limit = parsedLimit;
      }
    }

    // Get recent entries
    const entries = emotionStore.getRecentEntries(limit);
    const total = emotionStore.getCount();

    return NextResponse.json({
      entries: entries.map((entry) => ({
        id: entry.id,
        dominant_emotion: entry.dominant_emotion,
        scores: entry.scores,
        timestamp: entry.timestamp,
        text_preview: entry.text.substring(0, 100) + (entry.text.length > 100 ? '...' : ''),
      })),
      total,
      limit,
    });

  } catch (error) {
    console.error('Error in /api/history:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve history' },
      { status: 500 }
    );
  }
}
