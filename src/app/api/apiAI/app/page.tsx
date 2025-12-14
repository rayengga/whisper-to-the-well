export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Emotion Analysis API</h1>
      <p>Backend-only AI emotion analysis system</p>
      
      <h2>Available Endpoints:</h2>
      <ul>
        <li>
          <strong>POST /api/analyze</strong> - Analyze text for emotions
        </li>
        <li>
          <strong>GET /api/analyze</strong> - Check API status
        </li>
        <li>
          <strong>GET /api/history</strong> - Get historical entries
        </li>
        <li>
          <strong>GET /api/stats</strong> - Get emotion statistics
        </li>
      </ul>

      <h2>Quick Test:</h2>
      <pre style={{ 
        background: '#f4f4f4', 
        padding: '1rem', 
        borderRadius: '4px',
        overflow: 'auto' 
      }}>
{`curl -X POST http://localhost:3000/api/analyze \\
  -H "Content-Type: application/json" \\
  -d '{"text": "I am so happy today!"}'`}
      </pre>

      <p>
        <a href="/README.md" style={{ color: '#0070f3' }}>
          View full documentation
        </a>
      </p>
    </div>
  );
}
