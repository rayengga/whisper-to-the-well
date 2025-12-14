# 🎯 Quick Reference: 7-Emotion API

## 🚀 Start Server
```bash
npm run dev
```
First request: 10-30s (model loads)  
Subsequent: 100-500ms

---

## 📡 API Endpoint

**POST** `http://localhost:3000/api/analyze`

### Request
```json
{
  "text": "YOUR TEXT HERE"
}
```

### Response
```json
{
  "dominant_emotion": "anger",
  "scores": {
    "joy": 0.050,
    "sadness": 0.120,
    "anger": 0.620,
    "fear": 0.150,
    "disgust": 0.030,
    "surprise": 0.020,
    "neutral": 0.010
  },
  "trend": "anger increasing",
  "trend_confidence": "high",
  "change_percentage": 34.5,
  "visual_hint": "bar_chart",
  "timestamp": 1702512000000,
  "total_entries": 12,
  "disclaimer": "This is an emotional indicator, not a medical diagnosis"
}
```

---

## 🎨 All 7 Emotions

| Emotion | Description | Color Suggestion |
|---------|-------------|------------------|
| 😊 joy | Happiness, excitement | 🟡 Gold #FFD700 |
| 😢 sadness | Unhappiness, grief | 🔵 Blue #4169E1 |
| 😡 anger | Frustration, rage | 🔴 Red #DC143C |
| 😰 fear | Anxiety, worry | 🟣 Purple #9370DB |
| 🤢 disgust | Repulsion, aversion | 🟢 Green #228B22 |
| 😲 surprise | Shock, amazement | 🩷 Pink #FF69B4 |
| 😐 neutral | No strong emotion | ⚪ Gray #808080 |

---

## 🧪 Test Commands

### Test All 7 Emotions
```bash
./test-7-emotions.sh
```

### Test Individual Emotions

**Joy:**
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "I am so happy and excited!"}'
```

**Sadness:**
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "I feel lonely and depressed."}'
```

**Anger:**
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "This is unacceptable! I am furious!"}'
```

**Fear:**
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "I am terrified and anxious."}'
```

**Disgust:**
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "That is absolutely disgusting."}'
```

**Surprise:**
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "Wow! I cant believe this!"}'
```

**Neutral:**
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "The meeting is at 3 PM."}'
```

---

## 📊 Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `dominant_emotion` | string | Highest scoring emotion |
| `scores.joy` | number | Joy score (0-1, 3 decimals) |
| `scores.sadness` | number | Sadness score |
| `scores.anger` | number | Anger score |
| `scores.fear` | number | Fear score |
| `scores.disgust` | number | Disgust score |
| `scores.surprise` | number | Surprise score |
| `scores.neutral` | number | Neutral score |
| `trend` | string | "emotion increasing/decreasing/stable" |
| `trend_confidence` | string | "low", "medium", or "high" |
| `change_percentage` | number | % change vs history |
| `visual_hint` | string | "bar_chart" or "line_chart" |
| `timestamp` | number | Unix timestamp |
| `total_entries` | number | Number of analyses |
| `disclaimer` | string | Safety notice |

---

## 🎨 Chart.js Integration

```javascript
// Fetch emotion data
const response = await fetch('/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'I am happy!' })
});
const data = await response.json();

// Create bar chart
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Joy', 'Sadness', 'Anger', 'Fear', 'Disgust', 'Surprise', 'Neutral'],
    datasets: [{
      label: 'Emotions',
      data: Object.values(data.scores),
      backgroundColor: ['#FFD700', '#4169E1', '#DC143C', '#9370DB', '#228B22', '#FF69B4', '#808080']
    }]
  },
  options: {
    scales: { y: { beginAtZero: true, max: 1 } }
  }
});
```

---

## 🐍 Python Integration

```python
import requests

response = requests.post(
    'http://localhost:3000/api/analyze',
    json={'text': 'I am happy!'}
)
data = response.json()

print(f"Dominant: {data['dominant_emotion']}")
print(f"Scores: {data['scores']}")
```

---

## 🔧 Other Endpoints

### Check Status
```bash
curl http://localhost:3000/api/analyze
```

### Get History
```bash
curl http://localhost:3000/api/history?limit=10
```

### Get Statistics
```bash
curl http://localhost:3000/api/stats
```

---

## ✅ Features

- ✅ All 7 emotions in every response
- ✅ 3-decimal precision (0.123)
- ✅ Scores normalized (sum ≈ 1.0)
- ✅ Dominant emotion identified
- ✅ Trend analysis (increasing/decreasing)
- ✅ Free & open-source model
- ✅ CPU-only (no GPU needed)
- ✅ Fast (100-500ms after init)

---

## 🛠️ Model Details

- **Name**: distilbert-base-uncased-emotion
- **Size**: ~250MB
- **Type**: Transformer (DistilBERT)
- **License**: Apache 2.0 (free)
- **Speed**: Fast on CPU
- **Accuracy**: High for English text

---

## 📖 Documentation

- [UPGRADE_GUIDE.md](UPGRADE_GUIDE.md) - Detailed upgrade docs
- [README.md](README.md) - Complete API reference
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical details

---

## 🆘 Troubleshooting

**Port in use:**
```bash
PORT=3001 npm run dev
```

**Out of memory:**
```bash
NODE_OPTIONS=--max-old-space-size=4096 npm run dev
```

**Model won't load:**
```bash
rm -rf ~/.cache/huggingface
npm run dev
```

---

**🎉 Ready to use! Start with: `npm run dev`**
