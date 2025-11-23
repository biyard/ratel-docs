---
title: Rate Limits & Best Practices
description: API usage best practices
sidebar_position: 4
---

# Rate Limits & Best Practices

Learn about API rate limits and best practices.

:::info Coming Soon
The Ratel API is planned for release in **Q2 2025**. This documentation describes the planned rate limits and guidelines.
:::

## Rate Limits

### Default Limits

| Auth Type | Requests/Hour | Burst Limit |
|-----------|---------------|-------------|
| Unauthenticated | 60 | 10/minute |
| API Key (Free) | 5,000 | 100/minute |
| OAuth User | 1,000 | 50/minute |
| Premium Account | 10,000 | 200/minute |
| Enterprise | Custom | Custom |

### Rate Limit Headers

Every API response includes rate limit information:

```http
HTTP/1.1 200 OK
X-RateLimit-Limit: 5000
X-RateLimit-Remaining: 4999
X-RateLimit-Reset: 1621350000
X-RateLimit-Used: 1
```

**Headers:**
- `X-RateLimit-Limit` - Total requests allowed per window
- `X-RateLimit-Remaining` - Requests remaining in current window
- `X-RateLimit-Reset` - Unix timestamp when limit resets
- `X-RateLimit-Used` - Requests used in current window

### Handling Rate Limits

When you exceed the rate limit:

```json
{
  "success": false,
  "error": {
    "code": "rate_limit_exceeded",
    "message": "You have exceeded the rate limit",
    "retry_after": 600
  }
}
```

HTTP Status: `429 Too Many Requests`

**Best Practice:**

```javascript
async function apiCall(endpoint) {
  const response = await fetch(endpoint);

  if (response.status === 429) {
    const retryAfter = response.headers.get('Retry-After');
    await sleep(retryAfter * 1000);
    return apiCall(endpoint); // Retry
  }

  return response.json();
}
```

### Endpoint-Specific Limits

Some endpoints have additional limits:

| Endpoint | Limit | Reason |
|----------|-------|--------|
| POST /posts | 100/hour | Prevent spam |
| POST /media/upload | 50/hour | Storage costs |
| POST /deliberations | 10/day | Quality control |
| POST /oracle/verifications | 5/day | Prevent abuse |

## Best Practices

### 1. Use Webhooks Instead of Polling

❌ **Don't poll:**

```javascript
// Bad: Polling every 10 seconds
setInterval(async () => {
  const posts = await fetch('/api/posts?since=' + lastCheck);
  // Process posts
}, 10000);
```

✅ **Use webhooks:**

```javascript
// Good: Receive events in real-time
app.post('/webhook', (req, res) => {
  const event = req.body;
  if (event.type === 'post.created') {
    // Process new post
  }
  res.status(200).send('OK');
});
```

### 2. Implement Exponential Backoff

Handle errors gracefully:

```javascript
async function apiCallWithRetry(endpoint, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetch(endpoint);
    } catch (error) {
      if (i === maxRetries - 1) throw error;

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, i) * 1000;
      await sleep(delay);
    }
  }
}
```

### 3. Cache Responses

Reduce API calls by caching:

```javascript
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getCachedUser(userId) {
  const cacheKey = `user:${userId}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const user = await fetch(`/api/users/${userId}`);
  cache.set(cacheKey, {
    data: user,
    timestamp: Date.now()
  });

  return user;
}
```

### 4. Use Pagination

Don't fetch all records at once:

```javascript
async function getAllPosts(spaceId) {
  const posts = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(
      `/api/posts?space_id=${spaceId}&page=${page}&per_page=100`
    );

    posts.push(...response.data);
    hasMore = response.meta.page < response.meta.total_pages;
    page++;

    // Respect rate limits
    if (hasMore) {
      await sleep(100); // Small delay between requests
    }
  }

  return posts;
}
```

### 5. Batch Requests

Combine multiple operations:

```javascript
// Instead of 10 separate requests
for (const userId of userIds) {
  await fetch(`/api/users/${userId}`);
}

// Use batch endpoint (if available)
const users = await fetch('/api/users/batch', {
  method: 'POST',
  body: JSON.stringify({ user_ids: userIds })
});
```

### 6. Monitor Rate Limit Usage

Track your usage:

```javascript
class RateLimitMonitor {
  constructor() {
    this.limit = 0;
    this.remaining = 0;
    this.reset = 0;
  }

  update(headers) {
    this.limit = parseInt(headers.get('X-RateLimit-Limit'));
    this.remaining = parseInt(headers.get('X-RateLimit-Remaining'));
    this.reset = parseInt(headers.get('X-RateLimit-Reset'));
  }

  shouldThrottle() {
    const usage = (this.limit - this.remaining) / this.limit;
    return usage > 0.9; // Slow down at 90% usage
  }

  timeUntilReset() {
    return Math.max(0, this.reset - Math.floor(Date.now() / 1000));
  }
}
```

### 7. Optimize Queries

Request only what you need:

```javascript
// Don't fetch unnecessary data
const response = await fetch(
  '/api/posts?fields=id,content,author&per_page=20'
);

// Instead of
const response = await fetch('/api/posts?per_page=100');
```

### 8. Use Appropriate HTTP Methods

Follow REST conventions:

```javascript
// ✅ Correct
await fetch('/api/posts/123', { method: 'DELETE' });

// ❌ Incorrect
await fetch('/api/posts/delete/123', { method: 'POST' });
```

### 9. Handle Errors Properly

Implement comprehensive error handling:

```javascript
async function safeApiCall(endpoint) {
  try {
    const response = await fetch(endpoint);

    // Check HTTP status
    if (!response.ok) {
      const error = await response.json();

      switch (response.status) {
        case 401:
          // Refresh authentication
          await refreshToken();
          return safeApiCall(endpoint);

        case 429:
          // Wait and retry
          const retryAfter = response.headers.get('Retry-After');
          await sleep(retryAfter * 1000);
          return safeApiCall(endpoint);

        case 500:
          // Log and alert
          console.error('Server error:', error);
          throw new Error('Server error');

        default:
          throw new Error(error.error.message);
      }
    }

    return await response.json();
  } catch (error) {
    // Network errors
    console.error('Network error:', error);
    throw error;
  }
}
```

### 10. Validate Before Sending

Reduce wasted API calls:

```javascript
function createPost(content, spaceId) {
  // Validate locally first
  if (!content || content.length > 5000) {
    throw new Error('Invalid content length');
  }

  if (!spaceId || !spaceId.startsWith('space_')) {
    throw new Error('Invalid space ID');
  }

  // Then make API call
  return fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({ content, space_id: spaceId })
  });
}
```

## Security Best Practices

### 1. Secure API Keys

```javascript
// ✅ Good: Environment variables
const apiKey = process.env.RATEL_API_KEY;

// ❌ Bad: Hardcoded
const apiKey = 'ratel_sk_live_abc123...';
```

### 2. Validate Webhook Signatures

```javascript
const crypto = require('crypto');

function validateWebhook(req) {
  const signature = req.headers['x-ratel-signature'];
  const secret = process.env.WEBHOOK_SECRET;

  const hmac = crypto
    .createHmac('sha256', secret)
    .update(req.rawBody)
    .digest('hex');

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(hmac))) {
    throw new Error('Invalid signature');
  }
}
```

### 3. Use HTTPS Only

```javascript
const RATEL_API = 'https://api.ratel.foundation/v2';

// Never use HTTP in production
// const RATEL_API = 'http://api.ratel.foundation/v2'; ❌
```

### 4. Implement Request Signing

For sensitive operations:

```javascript
function signRequest(method, path, body) {
  const timestamp = Date.now();
  const payload = `${method}:${path}:${timestamp}:${body}`;

  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(payload)
    .digest('hex');

  return {
    'X-Ratel-Timestamp': timestamp,
    'X-Ratel-Signature': signature
  };
}
```

## Performance Tips

### 1. Use Connection Pooling

```javascript
const https = require('https');

const agent = new https.Agent({
  keepAlive: true,
  maxSockets: 50
});

fetch(url, { agent });
```

### 2. Compress Requests

```javascript
const zlib = require('zlib');

const compressed = zlib.gzipSync(JSON.stringify(data));

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Encoding': 'gzip',
    'Content-Type': 'application/json'
  },
  body: compressed
});
```

### 3. Stream Large Responses

```javascript
const response = await fetch('/api/analytics/export');
const reader = response.body.getReader();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  // Process chunk
  processChunk(value);
}
```

## Monitoring

### Track API Performance

```javascript
class APIMonitor {
  constructor() {
    this.metrics = {
      requests: 0,
      errors: 0,
      latency: []
    };
  }

  async track(fn) {
    const start = Date.now();
    this.metrics.requests++;

    try {
      const result = await fn();
      this.metrics.latency.push(Date.now() - start);
      return result;
    } catch (error) {
      this.metrics.errors++;
      throw error;
    }
  }

  getStats() {
    return {
      total_requests: this.metrics.requests,
      error_rate: this.metrics.errors / this.metrics.requests,
      avg_latency: this.metrics.latency.reduce((a, b) => a + b, 0) / this.metrics.latency.length
    };
  }
}
```

---

*See also: [API Overview](./overview) • [Authentication](./auth) • [API Reference](./reference)*
