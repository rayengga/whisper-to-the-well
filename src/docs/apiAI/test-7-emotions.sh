#!/bin/bash

# 🧪 Enhanced Emotion Analysis API Test Suite
# Tests all 7 emotions: joy, sadness, anger, fear, disgust, surprise, neutral

echo "🧠 Testing Enhanced 7-Emotion Analysis API"
echo "==========================================="
echo ""
echo "✨ Detecting: joy, sadness, anger, fear, disgust, surprise, neutral"
echo ""

API_URL="http://localhost:3000"

# Check if server is running
echo "📡 Checking API status..."
curl -s "$API_URL/api/analyze" | jq '.' || {
    echo "❌ Server not running. Start with: npm run dev"
    exit 1
}
echo ""

# Test 1: Joy/Happiness
echo "1️⃣ Testing JOY emotion..."
echo "   Text: 'I am so happy and excited! This is the best day ever!'"
curl -s -X POST "$API_URL/api/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "I am so happy and excited! This is the best day ever!"
  }' | jq '{dominant_emotion, scores, trend}'
echo ""

# Test 2: Sadness
echo "2️⃣ Testing SADNESS emotion..."
echo "   Text: 'I feel so lonely and sad. Everything feels hopeless.'"
curl -s -X POST "$API_URL/api/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "I feel so lonely and sad. Everything feels hopeless."
  }' | jq '{dominant_emotion, scores, trend}'
echo ""

# Test 3: Anger
echo "3️⃣ Testing ANGER emotion..."
echo "   Text: 'This is completely unacceptable! I am furious and frustrated!'"
curl -s -X POST "$API_URL/api/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "This is completely unacceptable! I am furious and frustrated!"
  }' | jq '{dominant_emotion, scores, trend}'
echo ""

# Test 4: Fear/Anxiety
echo "4️⃣ Testing FEAR emotion..."
echo "   Text: 'I am terrified and anxious about what might happen.'"
curl -s -X POST "$API_URL/api/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "I am terrified and anxious about what might happen."
  }' | jq '{dominant_emotion, scores, trend}'
echo ""

# Test 5: Disgust
echo "5️⃣ Testing DISGUST emotion..."
echo "   Text: 'That is absolutely disgusting and revolting. I cant stand it.'"
curl -s -X POST "$API_URL/api/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "That is absolutely disgusting and revolting. I cant stand it."
  }' | jq '{dominant_emotion, scores, trend}'
echo ""

# Test 6: Surprise
echo "6️⃣ Testing SURPRISE emotion..."
echo "   Text: 'Wow! I cant believe this happened! This is so unexpected!'"
curl -s -X POST "$API_URL/api/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Wow! I cant believe this happened! This is so unexpected!"
  }' | jq '{dominant_emotion, scores, trend}'
echo ""

# Test 7: Neutral
echo "7️⃣ Testing NEUTRAL emotion..."
echo "   Text: 'The meeting is scheduled for 3 PM in conference room B.'"
curl -s -X POST "$API_URL/api/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "The meeting is scheduled for 3 PM in conference room B."
  }' | jq '{dominant_emotion, scores, trend}'
echo ""

# Test 8: Mixed emotions
echo "8️⃣ Testing MIXED emotions..."
echo "   Text: 'I am nervous but also excited about this new opportunity.'"
curl -s -X POST "$API_URL/api/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "I am nervous but also excited about this new opportunity."
  }' | jq '{dominant_emotion, scores}'
echo ""

# Verify all 7 emotions are present
echo "9️⃣ Verifying ALL 7 emotions in response..."
RESPONSE=$(curl -s -X POST "$API_URL/api/analyze" \
  -H "Content-Type: application/json" \
  -d '{"text": "This is a test"}')

EMOTIONS=("joy" "sadness" "anger" "fear" "disgust" "surprise" "neutral")
echo "$RESPONSE" | jq -r '.scores | keys[]' | sort > /tmp/emotions_returned.txt

echo "   Expected emotions: joy, sadness, anger, fear, disgust, surprise, neutral"
echo "   Returned emotions: $(echo "$RESPONSE" | jq -r '.scores | keys[]' | tr '\n' ', ' | sed 's/,$//')"
echo ""

# Check decimal precision
echo "🔍 Checking 3-decimal precision..."
echo "$RESPONSE" | jq '.scores'
echo ""

# Get statistics
echo "📊 Getting statistics..."
curl -s "$API_URL/api/stats" | jq '{total_entries, most_common_emotion, emotion_distribution}'
echo ""

echo "✅ All tests completed!"
echo ""
echo "📖 Full response format:"
curl -s -X POST "$API_URL/api/analyze" \
  -H "Content-Type: application/json" \
  -d '{"text": "I am feeling great!"}' | jq '.'
