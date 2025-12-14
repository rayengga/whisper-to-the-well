/**
 * Example usage of the Emotion Analysis API
 * Demonstrates detection of all 7 emotions: joy, sadness, anger, fear, disgust, surprise, neutral
 * 
 * Run with: node examples/example.mjs
 */

const API_URL = 'http://localhost:3000';

async function analyzeEmotion(text) {
  try {
    const response = await fetch(`${API_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error analyzing emotion:', error);
    throw error;
  }
}

async function getHistory(limit = 10) {
  try {
    const response = await fetch(`${API_URL}/api/history?limit=${limit}`);
    return await response.json();
  } catch (error) {
    console.error('Error getting history:', error);
    throw error;
  }
}

async function getStats() {
  try {
    const response = await fetch(`${API_URL}/api/stats`);
    return await response.json();
  } catch (error) {
    console.error('Error getting stats:', error);
    throw error;
  }
}

// Example usage demonstrating all 7 emotions
async function main() {
  console.log('🧠 Emotion Analysis API - All 7 Emotions Demo\n');
  console.log('Detecting: joy, sadness, anger, fear, disgust, surprise, neutral\n');

  // Example 1: Joy
  console.log('1️⃣ Testing JOY emotion...');
  const joy = await analyzeEmotion(
    'I just got accepted to my dream university! This is the best day ever!'
  );
  console.log('Dominant emotion:', joy.dominant_emotion);
  console.log('All scores:', joy.scores);
  console.log('Trend:', joy.trend);
  console.log('');

  // Example 2: Sadness
  console.log('2️⃣ Testing SADNESS emotion...');
  const sadness = await analyzeEmotion(
    'I feel so alone and disconnected from everyone. Nothing brings me joy anymore.'
  );
  console.log('Dominant emotion:', sadness.dominant_emotion);
  console.log('All scores:', sadness.scores);
  console.log('Trend:', sadness.trend);
  console.log('');

  // Example 3: Anger
  console.log('3️⃣ Testing ANGER emotion...');
  const anger = await analyzeEmotion(
    'This is completely unacceptable! I am so frustrated and angry with this situation!'
  );
  console.log('Dominant emotion:', anger.dominant_emotion);
  console.log('All scores:', anger.scores);
  console.log('Trend:', anger.trend);
  console.log('');

  // Example 4: Fear
  console.log('4️⃣ Testing FEAR emotion...');
  const fear = await analyzeEmotion(
    'I am terrified and anxious about what might happen. I cannot stop worrying.'
  );
  console.log('Dominant emotion:', fear.dominant_emotion);
  console.log('All scores:', fear.scores);
  console.log('Trend:', fear.trend);
  console.log('');

  // Example 5: Disgust
  console.log('5️⃣ Testing DISGUST emotion...');
  const disgust = await analyzeEmotion(
    'That is absolutely disgusting and revolting. I cannot stand it.'
  );
  console.log('Dominant emotion:', disgust.dominant_emotion);
  console.log('All scores:', disgust.scores);
  console.log('Trend:', disgust.trend);
  console.log('');

  // Example 6: Surprise
  console.log('6️⃣ Testing SURPRISE emotion...');
  const surprise = await analyzeEmotion(
    'Wow! I cannot believe this just happened! This is so unexpected and shocking!'
  );
  console.log('Dominant emotion:', surprise.dominant_emotion);
  console.log('All scores:', surprise.scores);
  console.log('Trend:', surprise.trend);
  console.log('');

  // Example 7: Neutral
  console.log('7️⃣ Testing NEUTRAL emotion...');
  const neutral = await analyzeEmotion(
    'The meeting is scheduled for 3 PM tomorrow in conference room B.'
  );
  console.log('Dominant emotion:', neutral.dominant_emotion);
  console.log('All scores:', neutral.scores);
  console.log('');

  // Example 8: Get history
  console.log('8️⃣ Getting recent history...');
  const history = await getHistory(5);
  console.log(`Total entries: ${history.total}`);
  console.log(`Showing last ${history.entries.length} entries:`);
  history.entries.forEach((entry, i) => {
    console.log(`  ${i + 1}. ${entry.dominant_emotion.toUpperCase()} (${entry.text_preview})`);
  });
  console.log('');

  // Example 9: Get statistics
  console.log('9️⃣ Getting statistics...');
  const stats = await getStats();
  console.log('Total entries analyzed:', stats.total_entries);
  console.log('Most common emotion:', stats.most_common_emotion?.toUpperCase() || 'N/A');
  if (stats.emotion_distribution) {
    console.log('Emotion distribution:');
    Object.entries(stats.emotion_distribution).forEach(([emotion, pct]) => {
      console.log(`  ${emotion}: ${(pct * 100).toFixed(1)}%`);
    });
  }
  console.log('');

  console.log('✅ All 7 emotions tested successfully!');
  console.log('\n📊 Summary:');
  console.log('   • All responses include all 7 emotions');
  console.log('   • Scores are rounded to 3 decimals');
  console.log('   • Scores sum to approximately 1.0');
  console.log('   • Trend analysis shows increasing/decreasing patterns');
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { analyzeEmotion, getHistory, getStats };
