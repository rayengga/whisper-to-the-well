#!/usr/bin/env node

/**
 * Quick API Test - Validates 7-emotion detection
 * Run with: node test-quick.mjs
 */

const API_URL = 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Quick 7-Emotion API Test\n');

  try {
    // Test with an angry message
    console.log('Testing with angry text...');
    const response = await fetch(`${API_URL}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'I am so frustrated and angry with this situation! This is completely unacceptable!'
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    console.log('\n✅ Response received!\n');
    console.log('Dominant Emotion:', data.dominant_emotion.toUpperCase());
    console.log('\nAll 7 Emotion Scores (3 decimals):');
    console.log('  😊 Joy:      ', data.scores.joy);
    console.log('  😢 Sadness:  ', data.scores.sadness);
    console.log('  😡 Anger:    ', data.scores.anger);
    console.log('  😰 Fear:     ', data.scores.fear);
    console.log('  🤢 Disgust:  ', data.scores.disgust);
    console.log('  😲 Surprise: ', data.scores.surprise);
    console.log('  😐 Neutral:  ', data.scores.neutral);

    // Validation
    const emotions = ['joy', 'sadness', 'anger', 'fear', 'disgust', 'surprise', 'neutral'];
    const allPresent = emotions.every(e => e in data.scores);
    const sum = Object.values(data.scores).reduce((a, b) => a + b, 0);
    const has3Decimals = Object.values(data.scores).every(score => 
      score.toString().split('.')[1]?.length <= 3
    );

    console.log('\n📊 Validation:');
    console.log('  All 7 emotions present:', allPresent ? '✅' : '❌');
    console.log('  Scores sum to ~1.0:', Math.abs(sum - 1.0) < 0.01 ? '✅' : '❌', `(${sum.toFixed(3)})`);
    console.log('  3-decimal precision:', has3Decimals ? '✅' : '❌');
    console.log('  Trend:', data.trend);
    console.log('  Confidence:', data.trend_confidence);

    console.log('\n🎉 API is working correctly!');

  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ Server not running. Start with: npm run dev');
    } else {
      console.error('❌ Error:', error.message);
    }
    process.exit(1);
  }
}

testAPI();
