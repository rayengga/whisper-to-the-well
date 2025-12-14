# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

This will install:
- Next.js 14
- @xenova/transformers (Hugging Face models)
- TypeScript and React dependencies

**Time**: ~2-3 minutes

---

### Step 2: Start the Server
```bash
npm run dev
```

The API will be available at: **http://localhost:3000**

**Note**: The first request will take 10-30 seconds as the AI model downloads (~250MB) and initializes. After that, responses are fast (100-500ms).

---

### Step 3: Test the API

#### Option A: Using curl
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "I am so happy today!"}'
```

#### Option B: Using the test script
```bash
chmod +x test-api.sh
./test-api.sh
```

#### Option C: Using the example code
```bash
node examples/example.mjs
```

---

## 📡 Available Endpoints

1. **POST /api/analyze** - Analyze emotion from text
2. **GET /api/analyze** - Check API status
3. **GET /api/history** - Get historical entries
4. **GET /api/stats** - Get emotion statistics

---

## 📝 Example Request

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "text": "I feel anxious about the presentation tomorrow"
  }'
```

## ✅ Example Response

```json
{
  "dominant_emotion": "fear",
  "scores": {
    "fear": 0.68,
    "sadness": 0.19,
    "joy": 0.08,
    "anger": 0.05
  },
  "trend": "fear increasing",
  "trend_confidence": "high",
  "change_percentage": 34.5,
  "visual_hint": "line_chart",
  "timestamp": 1702512000000,
  "total_entries": 5,
  "disclaimer": "This is an emotional indicator, not a medical diagnosis"
}
```

---

## 🛠️ Troubleshooting

### Problem: Model fails to download
**Solution**: Check internet connection and ensure you have 500MB+ free disk space

### Problem: Out of memory
**Solution**: Increase Node.js memory:
```bash
NODE_OPTIONS=--max-old-space-size=4096 npm run dev
```

### Problem: Port 3000 already in use
**Solution**: Kill the process or use a different port:
```bash
PORT=3001 npm run dev
```

---

## 📖 Full Documentation

See [README.md](README.md) for complete documentation including:
- Detailed API reference
- Architecture overview
- Integration examples
- Performance optimization
- Production deployment

---

**Ready to build?** Start with `npm install && npm run dev`! 🚀
