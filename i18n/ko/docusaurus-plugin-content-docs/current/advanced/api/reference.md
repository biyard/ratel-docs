---
title: API 참조
description: 전체 API 엔드포인트 참조
sidebar_position: 3
---

# API 참조

모든 Ratel API 엔드포인트에 대한 전체 참조입니다.

:::info 출시 예정
Ratel API는 **2025년 2분기**에 출시될 예정입니다. 이 문서는 계획된 엔드포인트를 설명합니다.
:::

## 기본 URL

```
https://api.ratel.foundation/v2
```

## 인증

공개로 표시되지 않은 모든 엔드포인트는 인증이 필요합니다. `Authorization` 헤더에 API 키 또는 OAuth 토큰을 포함하세요:

```
Authorization: Bearer YOUR_TOKEN
```

## 사용자

### 현재 사용자 가져오기

```http
GET /users/me
```

**응답:**

```json
{
  "success": true,
  "data": {
    "id": "user_abc123",
    "username": "alice",
    "display_name": "Alice Smith",
    "bio": "Web3 enthusiast",
    "avatar_url": "https://cdn.ratel.foundation/avatars/alice.jpg",
    "verified": true,
    "created_at": "2025-01-15T10:00:00Z",
    "stats": {
      "posts": 142,
      "followers": 523,
      "following": 89
    }
  }
}
```

### ID로 사용자 가져오기

```http
GET /users/:user_id
```

**매개변수:**
- `user_id` (문자열) - 사용자 ID 또는 사용자 이름

### 현재 사용자 업데이트

```http
PATCH /users/me
```

**요청 본문:**

```json
{
  "display_name": "Alice Johnson",
  "bio": "Updated bio",
  "location": "San Francisco, CA"
}
```

## 게시물

### 게시물 목록

```http
GET /posts
```

**쿼리 매개변수:**
- `page` (정수) - 페이지 번호 (기본값: 1)
- `per_page` (정수) - 페이지당 항목 (최대: 100, 기본값: 20)
- `space_id` (문자열) - 스페이스별 필터
- `author_id` (문자열) - 작성자별 필터
- `type` (문자열) - 유형별 필터 (텍스트, 이미지, 투표)

**응답:**

```json
{
  "success": true,
  "data": [
    {
      "id": "post_xyz789",
      "author": {
        "id": "user_abc123",
        "username": "alice",
        "display_name": "Alice Smith"
      },
      "content": "Hello Ratel!",
      "type": "text",
      "space_id": "space_def456",
      "created_at": "2025-03-20T14:30:00Z",
      "stats": {
        "likes": 42,
        "comments": 8,
        "shares": 3
      }
    }
  ],
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 150,
    "total_pages": 8
  }
}
```

### 게시물 가져오기

```http
GET /posts/:post_id
```

### 게시물 생성

```http
POST /posts
```

**요청 본문:**

```json
{
  "content": "My new post content",
  "type": "text",
  "space_id": "space_def456",
  "media": [
    {
      "url": "https://example.com/image.jpg",
      "type": "image"
    }
  ],
  "visibility": "public"
}
```

**응답:**

```json
{
  "success": true,
  "data": {
    "id": "post_new123",
    "content": "My new post content",
    "created_at": "2025-03-21T10:00:00Z"
  }
}
```

### 게시물 업데이트

```http
PATCH /posts/:post_id
```

### 게시물 삭제

```http
DELETE /posts/:post_id
```

### 게시물 좋아요

```http
POST /posts/:post_id/like
```

### 게시물 좋아요 취소

```http
DELETE /posts/:post_id/like
```

## 댓글

### 댓글 목록

```http
GET /posts/:post_id/comments
```

### 댓글 생성

```http
POST /posts/:post_id/comments
```

**요청 본문:**

```json
{
  "content": "Great post!",
  "parent_id": null
}
```

### 댓글 삭제

```http
DELETE /comments/:comment_id
```

## 스페이스

### 스페이스 목록

```http
GET /spaces
```

**쿼리 매개변수:**
- `page` (정수) - 페이지 번호
- `per_page` (정수) - 페이지당 항목
- `category` (문자열) - 카테고리별 필터
- `member` (부울) - 멤버인 스페이스만

### 스페이스 가져오기

```http
GET /spaces/:space_id
```

**응답:**

```json
{
  "success": true,
  "data": {
    "id": "space_abc123",
    "name": "Crypto Policy",
    "slug": "crypto-policy",
    "description": "Discuss crypto regulations",
    "visibility": "public",
    "created_at": "2025-01-10T12:00:00Z",
    "stats": {
      "members": 1523,
      "posts": 842,
      "deliberations": 23
    },
    "settings": {
      "allow_posts": true,
      "moderation": "community",
      "allow_deliberations": true
    }
  }
}
```

### 스페이스 생성

```http
POST /spaces
```

**요청 본문:**

```json
{
  "name": "My New Space",
  "slug": "my-new-space",
  "description": "A space for discussion",
  "visibility": "public",
  "category": "technology"
}
```

### 스페이스 업데이트

```http
PATCH /spaces/:space_id
```

### 스페이스 삭제

```http
DELETE /spaces/:space_id
```

### 스페이스 가입

```http
POST /spaces/:space_id/join
```

### 스페이스 탈퇴

```http
DELETE /spaces/:space_id/join
```

## 숙의

### 숙의 목록

```http
GET /deliberations
```

**쿼리 매개변수:**
- `space_id` (문자열) - 스페이스별 필터
- `status` (문자열) - 상태별 필터 (초안, 사전_설문, 토론, 사후_설문, 완료됨)

### 숙의 가져오기

```http
GET /deliberations/:deliberation_id
```

### 숙의 생성

```http
POST /deliberations
```

**요청 본문:**

```json
{
  "space_id": "space_abc123",
  "title": "Should we implement feature X?",
  "description": "Let's discuss...",
  "pre_survey": {
    "questions": [
      {
        "text": "What's your initial opinion?",
        "type": "multiple_choice",
        "options": ["Strongly support", "Support", "Neutral", "Oppose", "Strongly oppose"]
      }
    ]
  },
  "duration_days": 7
}
```

### 설문 응답 제출

```http
POST /deliberations/:deliberation_id/surveys/:survey_id/responses
```

**요청 본문:**

```json
{
  "answers": [
    {
      "question_id": "q1",
      "answer": "Support"
    }
  ]
}
```

### 결과 가져오기

```http
GET /deliberations/:deliberation_id/results
```

## 오라클 (DID 검증)

### 검증 요청 목록

```http
GET /oracle/verifications
```

**쿼리 매개변수:**
- `status` (문자열) - 상태별 필터 (대기 중, 승인됨, 거부됨)
- `attribute_type` (문자열) - 속성 유형별 필터

### 검증 요청 가져오기

```http
GET /oracle/verifications/:verification_id
```

### 검증 요청 제출

```http
POST /oracle/verifications
```

**요청 본문:**

```json
{
  "attribute_type": "professional_skill",
  "attribute_value": "Rust Developer",
  "evidence": [
    {
      "type": "github",
      "url": "https://github.com/alice/rust-projects"
    }
  ],
  "description": "5+ years of Rust development"
}
```

### 검증에 투표

```http
POST /oracle/verifications/:verification_id/votes
```

**요청 본문:**

```json
{
  "vote": "approve",
  "comment": "Verified their work on GitHub"
}
```

### 사용자 증명 가져오기

```http
GET /users/:user_id/attestations
```

## 분석

### 스페이스 분석 가져오기

```http
GET /spaces/:space_id/analytics
```

**쿼리 매개변수:**
- `start_date` (문자열) - ISO 8601 날짜
- `end_date` (문자열) - ISO 8601 날짜
- `metrics` (문자열[]) - 포함할 지표 (멤버, 게시물, 참여)

**응답:**

```json
{
  "success": true,
  "data": {
    "period": {
      "start": "2025-03-01T00:00:00Z",
      "end": "2025-03-31T23:59:59Z"
    },
    "metrics": {
      "new_members": 142,
      "total_posts": 523,
      "average_engagement": 0.42,
      "daily_active_users": 89
    },
    "timeline": [
      {
        "date": "2025-03-01",
        "members": 1234,
        "posts": 42
      }
    ]
  }
}
```

## 미디어 업로드

### 미디어 업로드

```http
POST /media/upload
```

**요청:**
- Content-Type: `multipart/form-data`
- 필드: `file`
- 최대 크기: 10MB

**응답:**

```json
{
  "success": true,
  "data": {
    "id": "media_abc123",
    "url": "https://cdn.ratel.foundation/media/abc123.jpg",
    "type": "image",
    "size": 245678,
    "created_at": "2025-03-21T10:00:00Z"
  }
}
```

## 웹훅

### 웹훅 목록

```http
GET /webhooks
```

### 웹훅 생성

```http
POST /webhooks
```

**요청 본문:**

```json
{
  "url": "https://yourapp.com/webhook",
  "events": ["post.created", "space.joined", "deliberation.completed"],
  "active": true
}
```

### 웹훅 테스트

```http
POST /webhooks/:webhook_id/test
```

## 오류 코드

| 코드 | HTTP 상태 | 설명 |
|------|-------------|-------------|
| `invalid_request` | 400 | 잘못된 요청 |
| `unauthorized` | 401 | 유효하지 않거나 누락된 인증 |
| `forbidden` | 403 | 권한 부족 |
| `not_found` | 404 | 리소스를 찾을 수 없음 |
| `conflict` | 409 | 리소스가 이미 존재함 |
| `rate_limited` | 429 | 요청이 너무 많음 |
| `server_error` | 500 | 내부 서버 오류 |

---

*참고: [API 개요](./overview) • [인증](./auth) • [모범 사례](./best-practices)*
