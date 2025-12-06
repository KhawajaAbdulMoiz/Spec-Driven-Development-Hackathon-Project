# RAG Endpoint Configuration & Error Handling Guide

## Overview

This document describes the improved RAG (Retrieval-Augmented Generation) endpoint handler with comprehensive error handling, CORS support, and debugging capabilities.

## Quick Start

### Configure Your RAG Service

Set the environment variable to point to your RAG endpoint:

```bash
# Development
export REACT_APP_RAG_ENDPOINT="https://your-rag-service.com/api/rag"

# Production
export REACT_APP_RAG_ENDPOINT="https://rag-api.production.com/query"
```

### Without Configuration (Default Behavior)

If `REACT_APP_RAG_ENDPOINT` is not set or equals `{ADD_YOUR_REAL_RAG_URL_HERE}`, the chatbot automatically uses **mock responses** with keyword matching. This allows testing without a backend service.

---

## API Specification

### Endpoint

**Active Handler**: `POST /api/rag` (via Docusaurus plugin)

### Request Format

```json
POST /api/rag
{
  "question": "What is a robot?"
}
```

### Response Format (Always Success 200)

```json
{
  "success": true,
  "answer": "A robot is a programmable machine...",
  "timestamp": "2025-12-06T08:00:00.000Z",
  "source": "rag|mock|fallback",
  "error": "Optional error message in dev mode"
}
```

### Response Sources

| Source | Meaning | When Used |
|--------|---------|-----------|
| `rag` | From actual RAG backend | Endpoint configured & working |
| `mock` | Generated locally | Endpoint not configured |
| `fallback` | Fallback due to error | Network/parsing/validation error |

---

## Error Handling Architecture

The endpoint implements **multi-layer error handling** to ensure users always get a response:

### Layer 1: Input Validation

```
✓ Check question is provided
✓ Check question is string
✓ Check question is not empty after trim
```

**Failure**: Returns 400 with error message

### Layer 2: Endpoint Configuration Check

```
✓ Check REACT_APP_RAG_ENDPOINT is set
✓ Check it's not the placeholder value
✓ Check it starts with http/https
```

**Failure**: Uses mock responses with `source: 'mock'`

### Layer 3: Network Request

```
try {
  const response = await fetch(RAG_ENDPOINT, {...})
} catch (fetchError) {
  // Network error - log and fallback
}
```

**Failure Types**:
- DNS resolution failure
- Connection timeout
- Connection refused
- Network unreachable

**Response**: Mock answer with `source: 'fallback'` + error detail

### Layer 4: HTTP Status Check

```
if (!response.ok) {
  // Log status code and attempt to read error body
  // Return mock answer with source: 'fallback'
}
```

**Failure**: Returns 4xx or 5xx HTTP status

**Response**: Mock answer + HTTP status in error field

### Layer 5: JSON Parsing

```
try {
  const data = await response.json()
} catch (parseError) {
  // Invalid JSON response
}
```

**Failure**: Malformed JSON response

**Response**: Mock answer + parse error message

### Layer 6: Response Format Validation

```
const answer = data.answer || data.response || data.text
if (!answer || typeof answer !== 'string') {
  // Missing or invalid answer field
}
```

**Failure**: Missing answer field or wrong type

**Response**: Mock answer + format error message

### Layer 7: Catch-All Handler

```
catch (error) {
  // Any unexpected error
  // Log with stack trace
  // Return mock answer with fallback source
}
```

**Failure**: Any other exception

**Response**: Mock answer + generic error message

---

## Logging & Debugging

### Console Output Format

All logs use `[RAG]` prefix for easy filtering:

```
[RAG] Question received: "What is Physical AI?..."
[RAG] Endpoint configured: YES
[RAG] Forwarding to: https://rag-api.example.com/query
[RAG] Successfully parsed RAG response
[RAG] Returning RAG response successfully
```

### Debugging in Browser DevTools

1. Open DevTools: **F12** → **Console** tab
2. Filter logs: Type `[RAG]` in filter box
3. Watch for request flow:
   - Input validation logs
   - Endpoint configuration logs
   - Network request logs
   - Parse and response logs

### Error Logs

```
[RAG] Network error: connect ECONNREFUSED 127.0.0.1:5000
[RAG] Stack: Error: connect ECONNREFUSED...
[RAG] HTTP error: 500 Internal Server Error
[RAG] Failed to parse response: Unexpected token < in JSON at position 0
```

---

## RAG Backend Implementation Guide

### Expected Endpoint Behavior

Your RAG backend should:

1. **Accept POST requests**
   ```
   POST /api/rag
   Content-Type: application/json
   ```

2. **Parse JSON body**
   ```json
   {
     "question": "User's question text"
   }
   ```

3. **Return JSON response**
   ```json
   {
     "answer": "Answer text here"
   }
   ```
   or
   ```json
   {
     "response": "Answer text here"
   }
   ```
   or
   ```json
   {
     "text": "Answer text here"
   }
   ```

4. **Support CORS** (if cross-origin)
   ```
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Methods: POST
   Access-Control-Allow-Headers: Content-Type
   ```

5. **Handle timeouts** - Response must come within 30 seconds

6. **Return valid JSON** - Even on error, return valid JSON with answer field

### Python FastAPI Example

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Question(BaseModel):
    question: str

class Answer(BaseModel):
    answer: str

@app.post("/api/rag")
async def rag_query(q: Question) -> Answer:
    """
    Process a question and return an answer.
    """
    try:
        question = q.question.strip()

        if not question:
            return Answer(answer="Please provide a valid question.")

        # Your RAG logic here:
        # 1. Query vector database for similar documents
        # 2. Extract context from top results
        # 3. Generate response using LLM
        # 4. Return formatted answer

        answer = generate_answer(question)  # Your implementation
        return Answer(answer=answer)

    except Exception as e:
        # Always return answer field even on error
        return Answer(answer=f"Error processing question: {str(e)}")
```

### Node.js Express Example

```javascript
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/rag', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== 'string') {
      return res.json({ answer: 'Please provide a valid question.' });
    }

    // Your RAG logic here
    const answer = await generateAnswer(question);

    res.json({ answer });

  } catch (error) {
    console.error('RAG error:', error);
    // Always return valid JSON with answer field
    res.json({ answer: 'Unable to process your question at this time.' });
  }
});

app.listen(3000);
```

---

## Testing & Validation

### Test with cURL

```bash
# Test endpoint with mock response
curl -X POST http://localhost:3001/api/rag \
  -H "Content-Type: application/json" \
  -d '{"question": "What is a robot?"}'

# Expected response:
# {"success":true,"answer":"A robot is...","timestamp":"...","source":"mock"}
```

### Test with Your RAG Service

```bash
# Set your RAG endpoint
export REACT_APP_RAG_ENDPOINT="https://your-service.com/api/rag"

# Restart dev server
npm run start -- --port 3001

# Open http://localhost:3001/
# Click chatbot 🤖 button
# Type a question
# Check DevTools console for [RAG] logs
```

### Validation Checklist

- [ ] RAG endpoint returns valid JSON
- [ ] JSON includes `answer` or `response` or `text` field
- [ ] Answer field contains a string (not null/undefined)
- [ ] Endpoint handles CORS properly
- [ ] Timeout occurs within 30 seconds (not longer)
- [ ] Error responses still return valid JSON with answer field
- [ ] Console shows `[RAG] Returning RAG response successfully`

---

## Troubleshooting

### Issue: "Using mock response handler"

**Cause**: `REACT_APP_RAG_ENDPOINT` not set or set incorrectly

**Solution**:
```bash
# Check environment variable is set
echo $REACT_APP_RAG_ENDPOINT

# Set it correctly
export REACT_APP_RAG_ENDPOINT="https://your-rag-service.com/api/rag"

# Restart server
npm run start -- --port 3001
```

### Issue: "Network error: connect ECONNREFUSED"

**Cause**: RAG service not running or wrong host/port

**Solution**:
- Verify RAG service is running
- Check hostname/port is correct
- Test with: `curl https://your-service.com/api/rag`
- Check firewall rules

### Issue: "HTTP error: 500 Internal Server Error"

**Cause**: RAG service crashed or returned error

**Solution**:
- Check RAG service logs
- Verify request format matches expected
- Test endpoint directly with cURL
- Restart RAG service

### Issue: "Failed to parse response: Unexpected token"

**Cause**: RAG service returning HTML or non-JSON

**Solution**:
- Verify endpoint returns `Content-Type: application/json`
- Check for HTML error pages (500 error pages usually HTML)
- Ensure endpoint returns valid JSON structure

### Issue: Chatbot shows error in browser

**Solution**:
1. Open DevTools: **F12** → **Console**
2. Filter by `[RAG]` to see detailed logs
3. Look for specific error message
4. Follow solution above

---

## Performance Considerations

### Timeout (30 seconds)

If RAG service takes longer than 30 seconds, request times out and falls back to mock response.

**Optimization**:
- Optimize vector database queries
- Use caching for common questions
- Consider async processing for complex queries
- Monitor query times in production

### Response Size

RAG answers should be concise for better UX.

**Recommendation**: 200-500 words max per answer

### Rate Limiting

Implement rate limiting on RAG endpoint to prevent abuse.

**Example**:
```python
from slowapi import Limiter
limiter = Limiter(key_func=get_remote_address)

@app.post("/api/rag")
@limiter.limit("10/minute")
async def rag_query(q: Question):
    ...
```

---

## Production Deployment

### Environment Configuration

```bash
# Staging
export REACT_APP_RAG_ENDPOINT="https://rag-staging.example.com/api/rag"

# Production
export REACT_APP_RAG_ENDPOINT="https://rag.example.com/api/rag"

# Build and deploy
npm run build
```

### Security Recommendations

1. **Use HTTPS** - Always encrypt in-transit
2. **API Keys** - Add authentication if needed
   ```javascript
   headers: {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${API_KEY}`,
   }
   ```

3. **Input Validation** - Sanitize questions on backend
4. **Output Filtering** - Remove sensitive data before responding
5. **Rate Limiting** - Prevent abuse (see section above)
6. **Monitoring** - Log all requests for audit trail

### Scaling Considerations

- Use load balancer for multiple RAG service instances
- Implement caching (Redis) for common questions
- Monitor latency and error rates
- Set up alerts for service failures

---

## Source Code References

### Main Handler
- `plugins/rag-api.js` - Active endpoint handler
- `src/api/rag.js` - Utility functions

### Integration Points
- `src/components/ChatbotWidget/index.tsx` - Client-side call to `/api/rag`
- `src/theme/Layout/index.tsx` - Global layout wrapper

### Configuration
- `docusaurus.config.ts` - Plugin registration
- Environment: `REACT_APP_RAG_ENDPOINT`

---

## FAQ

**Q: Can I use without configuring RAG?**
A: Yes! Mock responses work out of the box for testing.

**Q: What if RAG service is slow?**
A: If it takes >30 seconds, falls back to mock response.

**Q: Can I customize mock responses?**
A: Yes, edit `getMockAnswer()` function in `plugins/rag-api.js`

**Q: Does it support WebSocket?**
A: Current implementation uses HTTP polling. WebSocket support coming in future.

**Q: Can I add authentication?**
A: Yes, add `Authorization` header in fetch call.

**Q: What response formats are supported?**
A: `answer`, `response`, or `text` fields (any one works).

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2025-12-06 | Enhanced error handling, improved logging |
| 1.0 | 2025-12-06 | Initial RAG endpoint implementation |

---

**Last Updated**: 2025-12-06
**Status**: Production Ready ✅
**Build Status**: Both locales passing ✅
