---
title: 속도 제한 및 모범 사례
description: API 사용 모범 사례
sidebar_position: 4
---

# 속도 제한 및 모범 사례

API 속도 제한 및 모범 사례를 알아보세요.

:::info 출시 예정
Ratel API는 **2025년 2분기**에 출시될 예정입니다. 이 문서는 계획된 속도 제한 및 가이드라인을 설명합니다.
:::

## 속도 제한

### 기본 제한

| 인증 유형 | 시간당 요청 | 버스트 제한 |
|-----------|---------------|-------------|
| 인증되지 않음 | 60 | 분당 10 |
| API 키 (무료) | 5,000 | 분당 100 |
| OAuth 사용자 | 1,000 | 분당 50 |
| 프리미엄 계정 | 10,000 | 분당 200 |
| 엔터프라이즈 | 사용자 지정 | 사용자 지정 |

### 속도 제한 헤더

모든 API 응답에는 속도 제한 정보가 포함됩니다:

```http
HTTP/1.1 200 OK
X-RateLimit-Limit: 5000
X-RateLimit-Remaining: 4999
X-RateLimit-Reset: 1621350000
X-RateLimit-Used: 1
```

**헤더:**
- `X-RateLimit-Limit` - 창당 허용된 총 요청
- `X-RateLimit-Remaining` - 현재 창에 남은 요청
- `X-RateLimit-Reset` - 제한이 재설정되는 Unix 타임스탬프
- `X-RateLimit-Used` - 현재 창에서 사용된 요청

### 속도 제한 처리

속도 제한을 초과하면:

```json
{
  "success": false,
  "error": {
    "code": "rate_limit_exceeded",
    "message": "속도 제한을 초과했습니다",
    "retry_after": 600
  }
}
```

HTTP 상태: `429 Too Many Requests`

**모범 사례:**

```javascript
async function apiCall(endpoint) {
  const response = await fetch(endpoint);

  if (response.status === 429) {
    const retryAfter = response.headers.get('Retry-After');
    await sleep(retryAfter * 1000);
    return apiCall(endpoint); // 재시도
  }

  return response.json();
}
```

### 엔드포인트별 제한

일부 엔드포인트에는 추가 제한이 있습니다:

| 엔드포인트 | 제한 | 이유 |
|----------|-------|--------|
| POST /posts | 시간당 100 | 스팸 방지 |
| POST /media/upload | 시간당 50 | 저장 비용 |
| POST /deliberations | 일당 10 | 품질 관리 |
| POST /oracle/verifications | 일당 5 | 남용 방지 |

## 모범 사례

### 1. 폴링 대신 웹훅 사용

❌ **폴링하지 마세요:**

```javascript
// 나쁨: 10초마다 폴링
setInterval(async () => {
  const posts = await fetch('/api/posts?since=' + lastCheck);
  // 게시물 처리
}, 10000);
```

✅ **웹훅 사용:**

```javascript
// 좋음: 실시간으로 이벤트 수신
app.post('/webhook', (req, res) => {
  const event = req.body;
  if (event.type === 'post.created') {
    // 새 게시물 처리
  }
  res.status(200).send('OK');
});
```

### 2. 지수 백오프 구현

오류를 우아하게 처리:

```javascript
async function apiCallWithRetry(endpoint, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetch(endpoint);
    } catch (error) {
      if (i === maxRetries - 1) throw error;

      // 지수 백오프: 1초, 2초, 4초
      const delay = Math.pow(2, i) * 1000;
      await sleep(delay);
    }
  }
}
```

### 3. 응답 캐시

캐싱으로 API 호출 감소:

```javascript
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5분

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

### 4. 페이지네이션 사용

한 번에 모든 레코드를 가져오지 마세요:

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

    // 속도 제한 준수
    if (hasMore) {
      await sleep(100); // 요청 간 작은 지연
    }
  }

  return posts;
}
```

### 5. 요청 일괄 처리

여러 작업 결합:

```javascript
// 10개의 개별 요청 대신
for (const userId of userIds) {
  await fetch(`/api/users/${userId}`);
}

// 일괄 엔드포인트 사용 (사용 가능한 경우)
const users = await fetch('/api/users/batch', {
  method: 'POST',
  body: JSON.stringify({ user_ids: userIds })
});
```

### 6. 속도 제한 사용량 모니터링

사용량 추적:

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
    return usage > 0.9; // 90% 사용률에서 속도 조절
  }

  timeUntilReset() {
    return Math.max(0, this.reset - Math.floor(Date.now() / 1000));
  }
}
```

### 7. 쿼리 최적화

필요한 것만 요청:

```javascript
// 불필요한 데이터를 가져오지 마세요
const response = await fetch(
  '/api/posts?fields=id,content,author&per_page=20'
);

// 대신
const response = await fetch('/api/posts?per_page=100');
```

### 8. 적절한 HTTP 메서드 사용

REST 규칙 따르기:

```javascript
// ✅ 올바름
await fetch('/api/posts/123', { method: 'DELETE' });

// ❌ 잘못됨
await fetch('/api/posts/delete/123', { method: 'POST' });
```

### 9. 오류를 적절히 처리

포괄적인 오류 처리 구현:

```javascript
async function safeApiCall(endpoint) {
  try {
    const response = await fetch(endpoint);

    // HTTP 상태 확인
    if (!response.ok) {
      const error = await response.json();

      switch (response.status) {
        case 401:
          // 인증 갱신
          await refreshToken();
          return safeApiCall(endpoint);

        case 429:
          // 대기 후 재시도
          const retryAfter = response.headers.get('Retry-After');
          await sleep(retryAfter * 1000);
          return safeApiCall(endpoint);

        case 500:
          // 로그 및 알림
          console.error('Server error:', error);
          throw new Error('Server error');

        default:
          throw new Error(error.error.message);
      }
    }

    return await response.json();
  } catch (error) {
    // 네트워크 오류
    console.error('Network error:', error);
    throw error;
  }
}
```

### 10. 전송 전 검증

낭비되는 API 호출 감소:

```javascript
function createPost(content, spaceId) {
  // 먼저 로컬에서 검증
  if (!content || content.length > 5000) {
    throw new Error('Invalid content length');
  }

  if (!spaceId || !spaceId.startsWith('space_')) {
    throw new Error('Invalid space ID');
  }

  // 그런 다음 API 호출
  return fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({ content, space_id: spaceId })
  });
}
```

## 보안 모범 사례

### 1. API 키 보안

```javascript
// ✅ 좋음: 환경 변수
const apiKey = process.env.RATEL_API_KEY;

// ❌ 나쁨: 하드코딩
const apiKey = 'ratel_sk_live_abc123...';
```

### 2. 웹훅 서명 검증

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

### 3. HTTPS만 사용

```javascript
const RATEL_API = 'https://api.ratel.foundation/v2';

// 프로덕션에서 HTTP 사용 금지
// const RATEL_API = 'http://api.ratel.foundation/v2'; ❌
```

### 4. 요청 서명 구현

민감한 작업의 경우:

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

## 성능 팁

### 1. 연결 풀링 사용

```javascript
const https = require('https');

const agent = new https.Agent({
  keepAlive: true,
  maxSockets: 50
});

fetch(url, { agent });
```

### 2. 요청 압축

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

### 3. 대용량 응답 스트리밍

```javascript
const response = await fetch('/api/analytics/export');
const reader = response.body.getReader();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  // 청크 처리
  processChunk(value);
}
```

## 모니터링

### API 성능 추적

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

*참고: [API 개요](./overview) • [인증](./auth) • [API 참조](./reference)*
