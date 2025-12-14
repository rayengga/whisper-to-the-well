/**
 * Emotion Entry Storage
 * In-memory store for emotion analysis entries
 */

export interface EmotionScores {
  [emotion: string]: number;
}

export interface EmotionEntry {
  id: string;
  text: string;
  dominant_emotion: string;
  scores: EmotionScores;
  timestamp: number;
}

class EmotionStore {
  private entries: EmotionEntry[] = [];
  private readonly MAX_ENTRIES = 100; // Keep last 100 entries

  /**
   * Add a new emotion entry
   */
  addEntry(entry: EmotionEntry): void {
    this.entries.push(entry);
    
    // Keep only the most recent entries
    if (this.entries.length > this.MAX_ENTRIES) {
      this.entries.shift();
    }
  }

  /**
   * Get all entries
   */
  getAllEntries(): EmotionEntry[] {
    return [...this.entries];
  }

  /**
   * Get recent entries (default: last 10)
   */
  getRecentEntries(count: number = 10): EmotionEntry[] {
    return this.entries.slice(-count);
  }

  /**
   * Get entries older than recent ones for trend comparison
   */
  getOlderEntries(count: number = 10): EmotionEntry[] {
    if (this.entries.length <= count) {
      return [];
    }
    const startIndex = Math.max(0, this.entries.length - count * 2);
    const endIndex = this.entries.length - count;
    return this.entries.slice(startIndex, endIndex);
  }

  /**
   * Get total entry count
   */
  getCount(): number {
    return this.entries.length;
  }

  /**
   * Clear all entries (for testing)
   */
  clear(): void {
    this.entries = [];
  }
}

// Singleton instance
export const emotionStore = new EmotionStore();
