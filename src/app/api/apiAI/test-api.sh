#!/bin/bash

# Test script for the Emotion Analysis API
# Run this after starting the dev server with: npm run dev

echo "🧪 Testing Emotion Analysis API"
echo "================================"
echo ""

API_URL="http://localhost:3000"

# Check if server is running
echo "1. Checking API status..."
curl -s "$API_URL/api/analyze" | jq '.' || echo "❌ Server not running. Start with: npm run dev"
echo ""

# Test happy emotion
echo "2. Testing happy emotion..."
curl -s -X POST "$API_URL/api/analyze" \
  -H "Content-Type: application/json" \
  -d '{"text": "I am so happy and excited today! Everything is going great!"}' \
  | jq '.'
echo ""

# Test sad emotion
echo "3. Testing sad emotion..."
curl -s -X POST "$API_URL/api/analyze" \
  -H "Content-Type: application/json" \
  -d '{"text": "I feel so lonely and sad. Nothing seems to work out."}' \
  | jq '.'
echo ""

# Test angry emotion
echo "4. Testing angry emotion..."
curl -s -X POST "$API_URL/api/analyze" \
  -H "Content-Type: application/json" \
  -d '{"text": "This is completely unacceptable! I am so frustrated and angry!"}' \
  | jq '.'
echo ""

# Test mixed emotion
echo "5. Testing mixed emotions..."
curl -s -X POST "$API_URL/api/analyze" \
  -H "Content-Type: application/json" \
  -d '{"text": "I am nervous but also excited about this new opportunity."}' \
  | jq '.'
echo ""

# Get history
echo "6. Getting history..."
curl -s "$API_URL/api/history?limit=5" | jq '.'
echo ""

# Get stats
echo "7. Getting statistics..."
curl -s "$API_URL/api/stats" | jq '.'
echo ""

echo "✅ All tests completed!"
