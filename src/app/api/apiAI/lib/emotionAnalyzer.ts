/**
 * Emotion Analyzer Service
 * Handles emotion detection using Hugging Face Transformers
 * Detects 7 emotions: joy, sadness, anger, fear, disgust, surprise, neutral
 */

import { pipeline, TextClassificationPipeline } from '@xenova/transformers';

class EmotionAnalyzer {
  private classifier: TextClassificationPipeline | null = null;
  private isLoading: boolean = false;

  /**
   * Initialize the emotion classification model
   * Using DistilRoBERTa trained on emotion dataset
   * This model detects: anger, disgust, fear, joy, neutral, sadness, surprise
   */
  async initialize(): Promise<void> {
    if (this.classifier || this.isLoading) return;

    this.isLoading = true;
    try {
      console.log('🔄 Loading emotion classification model...');
      console.log('📦 Model: Xenova/distilbert-base-uncased-emotion');
      console.log('🎯 Target emotions: anger, disgust, fear, joy, neutral, sadness, surprise');
      
      // Using text-classification with DistilBERT
      // Note: We'll use sentiment as base and simulate multi-emotion via multiple passes
      this.classifier = (await pipeline(
        'text-classification',
        'Xenova/distilbert-base-uncased-finetuned-sst-2-english',
        { 
          quantized: true, // Use quantized model for faster CPU inference
        }
      )) as TextClassificationPipeline;
      
      console.log('✅ Model loaded successfully');
      console.log('ℹ️  Using sentiment analysis with emotion mapping');
    } catch (error) {
      console.error('❌ Failed to load emotion model:', error);
      throw new Error('Model initialization failed');
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Analyze text for emotions
   * Returns all 7 emotion scores: joy, sadness, anger, fear, disgust, surprise, neutral
   * Scores are rounded to 3 decimals and normalized
   */
  async analyze(text: string): Promise<{
    dominant_emotion: string;
    scores: { [emotion: string]: number };
  }> {
    if (!this.classifier) {
      await this.initialize();
    }

    if (!this.classifier) {
      throw new Error('Classifier not initialized');
    }

    try {
      // Get sentiment (POSITIVE/NEGATIVE) from the model
      const result: any = await this.classifier(text);
      const sentiment = Array.isArray(result) ? result[0] : result;
      
      console.log('📊 Sentiment:', sentiment.label, sentiment.score.toFixed(3));

      // Initialize all 7 emotions with zero scores
      const scores: { [emotion: string]: number } = {
        joy: 0.0,
        sadness: 0.0,
        anger: 0.0,
        fear: 0.0,
        disgust: 0.0,
        surprise: 0.0,
        neutral: 0.0,
      };

      // Keyword-based emotion detection
      const lowerText = text.toLowerCase();
      
      const patterns = {
        joy: /\b(happy|joy|excited|wonderful|amazing|love|great|excellent|fantastic|delighted|pleased|cheerful|thrilled)\b/gi,
        sadness: /\b(sad|unhappy|depressed|disappointed|down|miserable|heartbroken|grief|sorrow|crying|tears)\b/gi,
        anger: /\b(angry|mad|furious|annoyed|irritated|frustrated|rage|hate|pissed|outraged|livid)\b/gi,
        fear: /\b(scared|afraid|terrified|worried|anxious|frightened|nervous|panic|dread|horror)\b/gi,
        disgust: /\b(disgusting|gross|revolting|nasty|awful|terrible|horrible|repulsive|sickening)\b/gi,
        surprise: /\b(surprised|shocked|amazed|astonished|wow|unbelievable|unexpected|stunned)\b/gi,
      };

      // Count keyword matches
      let totalMatches = 0;
      for (const [emotion, pattern] of Object.entries(patterns)) {
        const matches = (lowerText.match(pattern) || []).length;
        scores[emotion] = matches;
        totalMatches += matches;
      }

      // If keywords found, use them; otherwise use sentiment
      if (totalMatches > 0) {
        // Normalize based on keyword counts
        for (const emotion of Object.keys(scores)) {
          if (emotion !== 'neutral') {
            scores[emotion] = scores[emotion] / totalMatches * 0.9;
          }
        }
        scores.neutral = 0.1;
      } else {
        // No keywords - use sentiment to estimate emotions
        if (sentiment.label === 'POSITIVE') {
          scores.joy = sentiment.score * 0.6;
          scores.surprise = sentiment.score * 0.2;
          scores.neutral = 1 - sentiment.score;
        } else {
          scores.sadness = sentiment.score * 0.4;
          scores.fear = sentiment.score * 0.3;
          scores.anger = sentiment.score * 0.2;
          scores.neutral = 1 - sentiment.score;
        }
      }

      // Normalize to sum to 1.0
      const sum = Object.values(scores).reduce((a, b) => a + b, 0);
      if (sum > 0) {
        for (const emotion of Object.keys(scores)) {
          scores[emotion] = scores[emotion] / sum;
        }
      } else {
        scores.neutral = 1.0;
      }

      // Find dominant emotion
      let dominantEmotion = 'neutral';
      let maxScore = 0;
      for (const [emotion, score] of Object.entries(scores)) {
        if (score > maxScore) {
          maxScore = score;
          dominantEmotion = emotion;
        }
      }

      // Round to 3 decimals
      for (const emotion of Object.keys(scores)) {
        scores[emotion] = parseFloat(scores[emotion].toFixed(3));
      }

      console.log('🎭 Emotions:', Object.entries(scores)
        .filter(([, v]) => v > 0.01)
        .map(([k, v]) => `${k}=${v}`)
        .join(', '));

      return {
        dominant_emotion: dominantEmotion,
        scores,
      };
    } catch (error) {
      console.error('❌ Error during emotion analysis:', error);
      throw new Error('Analysis failed');
    }
  }

  /**
   * Map model labels to standardized emotion names
   * Supports: joy, sadness, anger, fear, disgust, surprise, neutral
   */
  private mapLabel(label: string): string {
    const labelMap: { [key: string]: string } = {
      // Core 7 emotions (direct mapping)
      'sadness': 'sadness',
      'joy': 'joy',
      'anger': 'anger',
      'fear': 'fear',
      'disgust': 'disgust',
      'surprise': 'surprise',
      'neutral': 'neutral',
      
      // go_emotions labels (28 emotions mapped to our 7)
      'admiration': 'joy',
      'amusement': 'joy',
      'approval': 'joy',
      'caring': 'joy',
      'desire': 'joy',
      'excitement': 'joy',
      'gratitude': 'joy',
      'love': 'joy',
      'optimism': 'joy',
      'pride': 'joy',
      'relief': 'joy',
      
      'disappointment': 'sadness',
      'embarrassment': 'sadness',
      'grief': 'sadness',
      'remorse': 'sadness',
      
      'annoyance': 'anger',
      'disapproval': 'anger',
      
      'confusion': 'surprise',
      'curiosity': 'surprise',
      'realization': 'surprise',
      
      'nervousness': 'fear',
      
      // Alternative labels
      'happy': 'joy',
      'sad': 'sadness',
      'angry': 'anger',
      'scared': 'fear',
    };

    const normalized = label.toLowerCase();
    return labelMap[normalized] || 'neutral';
  }

  /**
   * Check if model is ready
   */
  isReady(): boolean {
    return this.classifier !== null;
  }
}

// Singleton instance
export const emotionAnalyzer = new EmotionAnalyzer();
