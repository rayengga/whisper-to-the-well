# 🧠 Emotion Analysis API

A backend-only AI system that analyzes free-text input, detects emotions, and returns chart-ready insights using Next.js and Hugging Face Transformers.

## 🎯 Features

- ✅ **Real-time emotion detection** from free text
- ✅ **Multi-emotion analysis** with confidence scores
- ✅ **Trend detection** (emotion increasing/decreasing)
- ✅ **In-memory storage** with historical tracking
- ✅ **Chart-ready JSON responses**
- ✅ **100% free & open-source** (no paid APIs)
- ✅ **CPU-only inference** (runs locally)
- ✅ **Zero UI** (backend API routes only)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. API is now running at http://localhost:3000
```

**First request will take 10-30 seconds** as the model downloads and initializes. Subsequent requests are fast (~100-500ms).

## 📡 API Endpoints

### 1. **POST /api/analyze**

Analyze text for emotions and get trend insights.

**Request:**
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "text": "I am feeling really anxious about the upcoming presentation"
  }'
```

**Response:**
```json
{
  "dominant_emotion": "fear",
  "scores": {
    "fear": 0.68,
    "sadness": 0.19,
    "anger": 0.08,
    "joy": 0.05
  },
  "trend": "fear increasing",
  "trend_confidence": "high",
  "change_percentage": 34.5,
  "visual_hint": "line_chart",
  "timestamp": 1702512000000,
  "total_entries": 12,
  "disclaimer": "This is an emotional indicator, not a medical diagnosis"
}
```

**Fields:**
- `dominant_emotion` - Primary detected emotion
- `scores` - Confidence scores for all detected emotions (0-1)
- `trend` - Trend analysis text (e.g., "sadness increasing")
- `trend_confidence` - How confident the trend is: low/medium/high
- `change_percentage` - Percentage change compared to historical data
- `visual_hint` - Suggested chart type: `bar_chart`, `line_chart`, `pie_chart`
- `timestamp` - Unix timestamp of analysis
- `total_entries` - Total number of analyses performed
- `disclaimer` - Safety notice

---

### 2. **GET /api/analyze**

Check API health and status.

**Request:**
```bash
curl http://localhost:3000/api/analyze
```

**Response:**
```json
{
  "status": "ok",
  "endpoint": "/api/analyze",
  "method": "POST",
  "model_ready": true,
  "total_entries": 12,
  "version": "1.0.0"
}
```

---

### 3. **GET /api/history**

Get historical emotion entries.

**Request:**
```bash
# Get last 10 entries (default)
curl http://localhost:3000/api/history

# Get last 20 entries
curl http://localhost:3000/api/history?limit=20
```

**Response:**
```json
{
  "entries": [
    {
      "id": "1702512000000-abc123",
      "dominant_emotion": "joy",
      "scores": {
        "joy": 0.82,
        "sadness": 0.12,
        "anger": 0.04,
        "fear": 0.02
      },
      "timestamp": 1702512000000,
      "text_preview": "I am so excited about the new project..."
    }
  ],
  "total": 12,
  "limit": 10
}
```

---

### 4. **GET /api/stats**

Get aggregated emotion statistics.

**Request:**
```bash
curl http://localhost:3000/api/stats
```

**Response:**
```json
{
  "total_entries": 25,
  "emotion_distribution": {
    "joy": 0.45,
    "sadness": 0.30,
    "anger": 0.15,
    "fear": 0.10
  },
  "average_scores": {
    "joy": 0.52,
    "sadness": 0.28,
    "anger": 0.12,
    "fear": 0.08
  },
  "most_common_emotion": "joy",
  "visual_hint": "pie_chart"
}
```

## 🎨 Visualization Hints

The API returns `visual_hint` to suggest appropriate chart types:

- **`bar_chart`** - For single emotion breakdown (< 5 entries)
- **`line_chart`** - For trend visualization (≥ 5 entries)
- **`pie_chart`** - For emotion distribution in stats

## 🧪 Testing Examples

### Example 1: Happy Text
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "I just got promoted! This is the best day ever!"}'
```

### Example 2: Sad Text
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "I feel so lonely and isolated lately"}'
```

### Example 3: Angry Text
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "This situation is completely unacceptable and frustrating"}'
```

### Example 4: Mixed Emotions
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "I am nervous but also excited about the new opportunity"}'
```

## 📊 How Trend Analysis Works

1. **Stores last 100 entries** in memory
2. **Compares recent (last 10) vs older (previous 10)** entries
3. **Calculates average emotion scores** for each period
4. **Detects change** in dominant emotion:
   - **> 10% increase** → "emotion increasing"
   - **< -10% decrease** → "emotion decreasing"
   - **Otherwise** → "emotion stable"
5. **Confidence levels:**
   - **High**: > 30% change
   - **Medium**: 15-30% change
   - **Low**: < 15% change

## 🔧 Architecture

```
apiAI/
├── app/
│   ├── api/
│   │   ├── analyze/
│   │   │   └── route.ts      # Main emotion analysis endpoint
│   │   ├── history/
│   │   │   └── route.ts      # Historical entries endpoint
│   │   └── stats/
│   │       └── route.ts      # Statistics endpoint
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Simple info page
├── lib/
│   ├── emotionAnalyzer.ts    # Hugging Face model wrapper
│   ├── emotionStore.ts       # In-memory storage
│   └── trendAnalysis.ts      # Trend computation logic
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🤖 AI Model Details

- **Library**: `@xenova/transformers` (Hugging Face Transformers.js)
- **Model**: `distilbert-base-uncased-finetuned-sst-2-english`
- **Type**: Text classification (emotion detection)
- **Size**: ~250MB (downloads on first run)
- **Performance**: 100-500ms per request (after initialization)
- **Quantization**: Enabled for faster CPU inference

### Why This Model?

- ✅ Lightweight and fast on CPU
- ✅ Good balance of accuracy vs speed
- ✅ No GPU required
- ✅ Works in Node.js environment
- ✅ MIT licensed

## 🛡️ Safety Features

- ✅ **Neutral language** in all responses
- ✅ **Disclaimer** included in every analysis
- ✅ **No medical claims** - labeled as "emotional indicators"
- ✅ **Input validation** (max 5000 characters)
- ✅ **Error handling** with descriptive messages

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Configuration
No environment variables required! Everything runs locally.

### Memory Considerations
- Stores last **100 entries** in memory
- Each entry: ~500 bytes
- Total memory usage: ~50KB for storage + ~500MB for model

### Scaling Options
For production persistence, replace in-memory store with:
- **SQLite** (lightweight, file-based)
- **PostgreSQL** (robust, scalable)
- **MongoDB** (document-based)

Example database integration point: [lib/emotionStore.ts](lib/emotionStore.ts)

## 🔌 Integration Examples

### JavaScript/TypeScript
```typescript
async function analyzeEmotion(text: string) {
  const response = await fetch('http://localhost:3000/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return response.json();
}

const result = await analyzeEmotion("I'm feeling great!");
console.log(result.dominant_emotion); // "joy"
```

### Python
```python
import requests

def analyze_emotion(text):
    response = requests.post(
        'http://localhost:3000/api/analyze',
        json={'text': text}
    )
    return response.json()

result = analyze_emotion("I'm feeling great!")
print(result['dominant_emotion'])  # "joy"
```

## 📝 Error Handling

### 400 Bad Request
```json
{
  "error": "Invalid input",
  "details": "Text field is required and must be a string"
}
```

### 500 Internal Server Error
```json
{
  "error": "Analysis failed",
  "details": "Model initialization failed"
}
```

## 🎯 Performance Tips

1. **First request is slow** (10-30s) - model downloads and loads
2. **Subsequent requests are fast** (100-500ms)
3. **Keep server running** - model stays in memory
4. **Use Docker** for consistent performance
5. **Monitor memory** - restart if > 2GB usage

## 🔮 Future Enhancements

Want to extend this? Here are some ideas:

- [ ] **Persistent storage** (SQLite/PostgreSQL)
- [ ] **Multi-language support**
- [ ] **Batch analysis** endpoint
- [ ] **Emotion intensity levels** (mild/moderate/strong)
- [ ] **Context-aware trends** (time-of-day patterns)
- [ ] **Export data** (CSV/JSON download)
- [ ] **WebSocket support** for real-time streaming
- [ ] **Rate limiting** for production use

## 🐛 Troubleshooting

### Model fails to load
- **Cause**: Network issues or insufficient disk space
- **Fix**: Check internet connection, ensure 500MB+ free space

### Out of memory errors
- **Cause**: Too many concurrent requests
- **Fix**: Increase Node.js memory: `NODE_OPTIONS=--max-old-space-size=4096 npm run dev`

### Slow first request
- **Normal**: Model downloads on first run
- **Cached**: Stored in `~/.cache/huggingface` after first download

## 📄 License

MIT License - Free for personal and commercial use

## 🤝 Contributing

This is an MVP/prototype. Feel free to:
- Fork and extend
- Add new models
- Improve trend analysis
- Add persistence layer

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API endpoint examples
3. Check console logs for errors

---

**Built with ❤️ using Next.js, TypeScript, and Hugging Face Transformers**

**Note**: This is a prototype for educational/experimental purposes. Not intended for medical diagnosis or professional mental health assessment.
