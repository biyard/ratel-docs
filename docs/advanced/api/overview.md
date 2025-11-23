---
title: API Overview
description: Introduction to Ratel API
sidebar_position: 1
---

# API Overview

Get started with the Ratel API for custom integrations.

:::info Coming Soon
The Ratel API is planned for release in **Q2 2025**. This documentation describes the planned functionality.
:::

## What is the Ratel API?

The Ratel API provides programmatic access to platform features, enabling developers to:

- Build custom applications and integrations
- Automate content posting and moderation
- Access analytics and metrics
- Manage Spaces programmatically
- Integrate with third-party services

## API Capabilities

### Core Features

**Content Management**
- Create, read, update, and delete posts
- Manage drafts and scheduled posts
- Upload and manage media
- Handle comments and threads

**Space Management**
- Create and configure Spaces
- Manage members and permissions
- Access Space analytics
- Moderate content

**User Operations**
- Retrieve user profiles
- Manage follows and connections
- Access user activity
- Update preferences

**Deliberation**
- Create deliberation sessions
- Submit surveys and votes
- Access results and analytics
- Export deliberation data

**Oracle System**
- Submit verification requests
- Vote on DID attributes
- Query verification status
- Access attestation records

## API Architecture

### RESTful Design

The API follows REST principles:
- Resource-based URLs
- Standard HTTP methods (GET, POST, PUT, DELETE)
- JSON request/response format
- Stateless authentication

### Base URL

```
https://api.ratel.foundation/v2
```

### Versioning

API versions are specified in the URL path:
- `/v2` - Current version (Q2 2025 launch)
- Breaking changes will increment version number
- Deprecated versions supported for 12 months

## Getting Started

### 1. Obtain API Credentials

1. Go to Settings → **Developer**
2. Click "Create API Key"
3. Name your application
4. Select required scopes
5. Save your API key securely

### 2. Make Your First Request

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.ratel.foundation/v2/users/me
```

### 3. Explore Documentation

- [Authentication](./auth) - Learn about auth methods
- [API Reference](./reference) - Complete endpoint list
- [Best Practices](./best-practices) - Rate limits and guidelines

## Use Cases

### Bot Automation
- Auto-post content on schedules
- Cross-post from other platforms
- Automated moderation
- Notification handling

### Analytics Platforms
- Track Space growth
- Monitor engagement metrics
- Export data for analysis
- Generate custom reports

### Third-Party Integrations
- Connect with Discord, Slack, etc.
- RSS feed generators
- Email digest services
- Archive and backup tools

### Custom Clients
- Build mobile apps
- Create desktop applications
- Develop browser extensions
- Alternative web interfaces

## Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": {
    // Response payload
  },
  "meta": {
    "request_id": "req_abc123",
    "timestamp": "2025-05-15T10:30:00Z"
  }
}
```

Error responses include details:

```json
{
  "success": false,
  "error": {
    "code": "invalid_token",
    "message": "The provided API key is invalid",
    "details": {}
  },
  "meta": {
    "request_id": "req_def456",
    "timestamp": "2025-05-15T10:30:00Z"
  }
}
```

## SDK Libraries

Official SDKs (planned):
- JavaScript/TypeScript
- Python
- Go
- Rust

Community SDKs welcome!

## Support

- **Documentation**: docs.ratel.foundation/advanced/api
- **Email**: api@biyard.co
- **Discord**: #api-support channel
- **Status**: status.ratel.foundation

---

*See also: [Authentication](./auth) • [API Reference](./reference) • [Best Practices](./best-practices)*
