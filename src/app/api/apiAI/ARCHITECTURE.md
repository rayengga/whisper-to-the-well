# 🏗️ Architecture Documentation

## System Overview

This is a **backend-only AI emotion analysis system** built with Next.js API routes. It uses Hugging Face Transformers running locally on CPU for privacy and cost-efficiency.

## Technology Stack

### Core Framework
- **Next.js 14** (App Router)
- **TypeScript** for type safety
- **Node.js 18+** runtime

### AI/ML
- **@xenova/transformers** - Hugging Face Transformers.js
- **distilbert-base-uncased-finetuned-sst-2-english** - Emotion classification model
- CPU-only inference (no GPU required)
- Quantized models for faster inference

### Storage
- **In-memory store** (JavaScript arrays)
- Maximum 100 entries retained
- No external database required for MVP

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                         │
│  (curl, fetch, Python requests, any HTTP client)            │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/JSON
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                     Next.js API Routes                      │
│                                                             │
│  ┌─────────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ /api/analyze    │  │ /api/history │  │  /api/stats  │  │
│  │  (POST/GET)     │  │    (GET)     │  │    (GET)     │  │
│  └────────┬────────┘  └──────┬───────┘  └──────┬───────┘  │
│           │                  │                  │           │
└───────────┼──────────────────┼──────────────────┼──────────┘
            │                  │                  │
            ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                      Business Logic Layer                   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  emotionAnalyzer.ts                                 │   │
│  │  - Model initialization                             │   │
│  │  - Text classification                              │   │
│  │  - Emotion detection                                │   │
│  └───────────────────────┬─────────────────────────────┘   │
│                          │                                  │
│  ┌───────────────────────▼─────────────────────────────┐   │
│  │  emotionStore.ts                                    │   │
│  │  - In-memory storage (max 100 entries)             │   │
│  │  - CRUD operations                                  │   │
│  │  - Entry management                                 │   │
│  └───────────────────────┬─────────────────────────────┘   │
│                          │                                  │
│  ┌───────────────────────▼─────────────────────────────┐   │
│  │  trendAnalysis.ts                                   │   │
│  │  - Trend computation                                │   │
│  │  - Statistical analysis                             │   │
│  │  - Change detection                                 │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Hugging Face Model                       │
│                                                             │
│  distilbert-base-uncased-finetuned-sst-2-english           │
│  - Downloads to ~/.cache/huggingface                       │
│  - ~250MB model size                                       │
│  - CPU inference with quantization                         │
└─────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. API Routes (app/api/)

#### `/api/analyze/route.ts`
**Purpose**: Main emotion analysis endpoint

**Responsibilities**:
- Validate input text
- Call emotion analyzer
- Store entry in memory
- Compute trends
- Return chart-ready JSON

**Flow**:
1. Parse request body
2. Validate text (length, type)
3. Analyze emotions using model
4. Create entry with timestamp
5. Store in memory
6. Get recent + older entries
7. Compute trend analysis
8. Return response

#### `/api/history/route.ts`
**Purpose**: Retrieve historical entries

**Responsibilities**:
- Accept limit parameter
- Fetch recent entries
- Format response with previews

#### `/api/stats/route.ts`
**Purpose**: Aggregate statistics

**Responsibilities**:
- Calculate emotion distribution
- Find most common emotion
- Compute average scores
- Return visualization hints

### 2. Business Logic (lib/)

#### `emotionAnalyzer.ts`
**Purpose**: AI model wrapper

**Key Methods**:
- `initialize()` - Load Hugging Face model
- `analyze(text)` - Perform emotion detection
- `mapLabel(label)` - Normalize emotion labels

**Model Details**:
- Uses pipeline API from @xenova/transformers
- Lazy loading (initializes on first request)
- Singleton pattern for reuse
- Quantized for CPU performance

#### `emotionStore.ts`
**Purpose**: In-memory data store

**Key Methods**:
- `addEntry()` - Store new analysis
- `getRecentEntries(count)` - Get latest N entries
- `getOlderEntries(count)` - Get historical entries for comparison
- `getAllEntries()` - Get full history
- `clear()` - Reset store (for testing)

**Data Structure**:
```typescript
interface EmotionEntry {
  id: string;           // Unique identifier
  text: string;         // Original input text
  dominant_emotion: string;
  scores: {             // Confidence scores
    [emotion: string]: number;
  };
  timestamp: number;    // Unix timestamp
}
```

#### `trendAnalysis.ts`
**Purpose**: Trend computation logic

**Key Functions**:
- `analyzeTrend()` - Compare recent vs older data
- `calculateAverageScores()` - Compute mean emotions
- `findDominantEmotion()` - Get highest scoring emotion
- `getComprehensiveTrends()` - Full trend breakdown

**Algorithm**:
1. Split data into recent (last 10) and older (previous 10)
2. Calculate average emotion scores for each period
3. Compute percentage change
4. Classify as increasing/decreasing/stable
5. Assign confidence level (low/medium/high)

## Data Flow

### POST /api/analyze

```
User Text Input
     │
     ▼
[Validation]
     │
     ▼
[Emotion Analyzer]
     │
     ▼
[Create Entry]
     │
     ▼
[Store Entry]
     │
     ├──► [Get Recent Entries]
     │
     └──► [Get Older Entries]
          │
          ▼
     [Trend Analysis]
          │
          ▼
    [Response JSON]
```

### Trend Computation

```
Recent Entries (Last 10) ──┐
                           ├──► [Calculate Averages]
Older Entries (Prev 10) ───┘           │
                                       ▼
                              [Compute Change %]
                                       │
                                       ▼
                           [Classify Trend Direction]
                                       │
                                       ▼
                            [Assign Confidence Level]
                                       │
                                       ▼
                              [Return Trend Object]
```

## Storage Strategy

### In-Memory Store (Current)
- **Pros**: Fast, simple, no external dependencies
- **Cons**: Data lost on restart, not scalable
- **Limit**: 100 entries (configurable)

### Future: Database Integration

For production, replace `emotionStore` with:

**SQLite** (recommended for small-scale):
```typescript
import Database from 'better-sqlite3';

class SQLiteEmotionStore {
  private db: Database.Database;
  
  constructor() {
    this.db = new Database('emotions.db');
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS emotions (
        id TEXT PRIMARY KEY,
        text TEXT,
        dominant_emotion TEXT,
        scores TEXT,
        timestamp INTEGER
      )
    `);
  }
  
  addEntry(entry: EmotionEntry) {
    this.db.prepare(`
      INSERT INTO emotions VALUES (?, ?, ?, ?, ?)
    `).run(
      entry.id,
      entry.text,
      entry.dominant_emotion,
      JSON.stringify(entry.scores),
      entry.timestamp
    );
  }
}
```

## Performance Characteristics

### Latency
- **First request**: 10-30 seconds (model download + initialization)
- **Subsequent requests**: 100-500ms
- **Model loading**: One-time per server start
- **Trend computation**: < 10ms

### Memory Usage
- **Model**: ~500MB (stays in memory)
- **Storage**: ~50KB (100 entries × ~500 bytes)
- **Total**: ~550MB baseline

### Optimization Tips
1. Keep server running (avoid cold starts)
2. Use quantized models
3. Limit stored entries
4. Use caching for repeated texts
5. Consider batching for multiple inputs

## Scalability Considerations

### Current Limits
- **Concurrent requests**: Limited by Node.js event loop
- **Storage**: 100 entries max
- **Model**: Single instance

### Scaling Options

**Horizontal Scaling**:
- Load balancer (NGINX, AWS ALB)
- Multiple Next.js instances
- Shared database (PostgreSQL, Redis)
- Model caching strategy

**Vertical Scaling**:
- Increase Node.js memory
- Use GPU for faster inference
- Optimize model (distillation, pruning)

**Microservices Split**:
```
API Gateway
    ├─► Analysis Service (model inference)
    ├─► Storage Service (database)
    └─► Trend Service (analytics)
```

## Security Considerations

### Input Validation
- ✅ Max length check (5000 chars)
- ✅ Type validation
- ✅ Empty text rejection

### Rate Limiting (TODO)
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per window
});
```

### Privacy
- ✅ No data sent to external APIs
- ✅ Local model inference
- ✅ In-memory storage (no disk writes)

## Testing Strategy

### Unit Tests
```bash
npm test
```

Test files to add:
- `lib/__tests__/emotionAnalyzer.test.ts`
- `lib/__tests__/emotionStore.test.ts`
- `lib/__tests__/trendAnalysis.test.ts`

### Integration Tests
```bash
npm run test:integration
```

### Manual Testing
```bash
./test-api.sh
```

or

```bash
node examples/example.mjs
```

## Deployment Options

### Option 1: Vercel (Recommended)
```bash
vercel deploy
```

**Note**: Serverless functions have cold start issues. Consider Vercel Pro for better performance.

### Option 2: Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Option 3: Traditional Server
```bash
npm run build
pm2 start npm --name "emotion-api" -- start
```

## Monitoring

### Metrics to Track
- Request latency
- Model inference time
- Memory usage
- Error rate
- Storage size

### Logging
```typescript
// Add to API routes
console.log({
  timestamp: Date.now(),
  endpoint: '/api/analyze',
  latency: duration,
  emotion: result.dominant_emotion,
});
```

## Future Enhancements

### Phase 1: Core Improvements
- [ ] Add more emotion categories
- [ ] Improve trend algorithms
- [ ] Add caching layer
- [ ] Implement rate limiting

### Phase 2: Features
- [ ] Multi-language support
- [ ] Batch analysis endpoint
- [ ] Export data (CSV, JSON)
- [ ] WebSocket for streaming

### Phase 3: Advanced
- [ ] Fine-tune custom model
- [ ] Context-aware analysis
- [ ] Emotion intensity levels
- [ ] Time-series visualization data

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [@xenova/transformers](https://huggingface.co/docs/transformers.js)
- [Hugging Face Models](https://huggingface.co/models)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Built by**: Senior Full-Stack Engineer with AI/NLP expertise  
**Date**: December 2025  
**Version**: 1.0.0
