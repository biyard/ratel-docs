---
title: API Reference
description: Complete API endpoint reference
sidebar_position: 3
---

# API Reference

Complete reference for all Ratel API endpoints.

:::info Coming Soon
The Ratel API is planned for release in **Q2 2025**. This documentation describes the planned endpoints.
:::

## Base URL

```
https://api.ratel.foundation/v2
```

## Authentication

All endpoints require authentication unless marked as public. Include your API key or OAuth token in the `Authorization` header:

```
Authorization: Bearer YOUR_TOKEN
```

## Users

### Get Current User

```http
GET /users/me
```

**Response:**

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

### Get User by ID

```http
GET /users/:user_id
```

**Parameters:**
- `user_id` (string) - User ID or username

### Update Current User

```http
PATCH /users/me
```

**Request Body:**

```json
{
  "display_name": "Alice Johnson",
  "bio": "Updated bio",
  "location": "San Francisco, CA"
}
```

## Posts

### List Posts

```http
GET /posts
```

**Query Parameters:**
- `page` (integer) - Page number (default: 1)
- `per_page` (integer) - Items per page (max: 100, default: 20)
- `space_id` (string) - Filter by Space
- `author_id` (string) - Filter by author
- `type` (string) - Filter by type (text, image, poll)

**Response:**

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

### Get Post

```http
GET /posts/:post_id
```

### Create Post

```http
POST /posts
```

**Request Body:**

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

**Response:**

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

### Update Post

```http
PATCH /posts/:post_id
```

### Delete Post

```http
DELETE /posts/:post_id
```

### Like Post

```http
POST /posts/:post_id/like
```

### Unlike Post

```http
DELETE /posts/:post_id/like
```

## Comments

### List Comments

```http
GET /posts/:post_id/comments
```

### Create Comment

```http
POST /posts/:post_id/comments
```

**Request Body:**

```json
{
  "content": "Great post!",
  "parent_id": null
}
```

### Delete Comment

```http
DELETE /comments/:comment_id
```

## Spaces

### List Spaces

```http
GET /spaces
```

**Query Parameters:**
- `page` (integer) - Page number
- `per_page` (integer) - Items per page
- `category` (string) - Filter by category
- `member` (boolean) - Only spaces you're a member of

### Get Space

```http
GET /spaces/:space_id
```

**Response:**

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

### Create Space

```http
POST /spaces
```

**Request Body:**

```json
{
  "name": "My New Space",
  "slug": "my-new-space",
  "description": "A space for discussion",
  "visibility": "public",
  "category": "technology"
}
```

### Update Space

```http
PATCH /spaces/:space_id
```

### Delete Space

```http
DELETE /spaces/:space_id
```

### Join Space

```http
POST /spaces/:space_id/join
```

### Leave Space

```http
DELETE /spaces/:space_id/join
```

## Deliberations

### List Deliberations

```http
GET /deliberations
```

**Query Parameters:**
- `space_id` (string) - Filter by Space
- `status` (string) - Filter by status (draft, pre_survey, discussion, post_survey, completed)

### Get Deliberation

```http
GET /deliberations/:deliberation_id
```

### Create Deliberation

```http
POST /deliberations
```

**Request Body:**

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

### Submit Survey Response

```http
POST /deliberations/:deliberation_id/surveys/:survey_id/responses
```

**Request Body:**

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

### Get Results

```http
GET /deliberations/:deliberation_id/results
```

## Oracle (DID Verification)

### List Verification Requests

```http
GET /oracle/verifications
```

**Query Parameters:**
- `status` (string) - Filter by status (pending, approved, rejected)
- `attribute_type` (string) - Filter by attribute type

### Get Verification Request

```http
GET /oracle/verifications/:verification_id
```

### Submit Verification Request

```http
POST /oracle/verifications
```

**Request Body:**

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

### Vote on Verification

```http
POST /oracle/verifications/:verification_id/votes
```

**Request Body:**

```json
{
  "vote": "approve",
  "comment": "Verified their work on GitHub"
}
```

### Get User Attestations

```http
GET /users/:user_id/attestations
```

## Analytics

### Get Space Analytics

```http
GET /spaces/:space_id/analytics
```

**Query Parameters:**
- `start_date` (string) - ISO 8601 date
- `end_date` (string) - ISO 8601 date
- `metrics` (string[]) - Metrics to include (members, posts, engagement)

**Response:**

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

## Media Upload

### Upload Media

```http
POST /media/upload
```

**Request:**
- Content-Type: `multipart/form-data`
- Field: `file`
- Max size: 10MB

**Response:**

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

## Webhooks

### List Webhooks

```http
GET /webhooks
```

### Create Webhook

```http
POST /webhooks
```

**Request Body:**

```json
{
  "url": "https://yourapp.com/webhook",
  "events": ["post.created", "space.joined", "deliberation.completed"],
  "active": true
}
```

### Test Webhook

```http
POST /webhooks/:webhook_id/test
```

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `invalid_request` | 400 | Malformed request |
| `unauthorized` | 401 | Invalid or missing auth |
| `forbidden` | 403 | Insufficient permissions |
| `not_found` | 404 | Resource not found |
| `conflict` | 409 | Resource already exists |
| `rate_limited` | 429 | Too many requests |
| `server_error` | 500 | Internal server error |

---

*See also: [API Overview](./overview) • [Authentication](./auth) • [Best Practices](./best-practices)*
