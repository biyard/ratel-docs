---
title: Authentication
description: API authentication methods
sidebar_position: 2
---

# Authentication

Learn how to authenticate with the Ratel API.

:::info Coming Soon
The Ratel API is planned for release in **Q2 2025**. This documentation describes the planned authentication methods.
:::

## Authentication Methods

Ratel API supports two authentication methods:

1. **API Keys** - For server-to-server applications
2. **OAuth 2.0** - For user-authorized applications

## API Keys

### Creating an API Key

1. Go to Settings → **Developer**
2. Click "Create API Key"
3. Configure key settings:
   - **Name**: Identify your application
   - **Scopes**: Select required permissions
   - **Expiration**: Optional expiry date
4. Save the key securely (shown once)

### Using API Keys

Include the API key in the `Authorization` header:

```bash
curl -H "Authorization: Bearer ratel_sk_live_abc123..." \
  https://api.ratel.foundation/v2/users/me
```

### API Key Types

- `ratel_sk_test_*` - Test mode keys (sandbox)
- `ratel_sk_live_*` - Production keys

### Security Best Practices

✅ **Do:**
- Store keys in environment variables
- Use separate keys for each application
- Rotate keys regularly
- Set appropriate scopes
- Use test keys during development

❌ **Don't:**
- Commit keys to version control
- Share keys publicly
- Use production keys in client-side code
- Grant unnecessary permissions

### Rotating Keys

If a key is compromised:

1. Generate a new API key
2. Update your applications
3. Revoke the old key
4. Monitor for unauthorized access

## OAuth 2.0

### Authorization Flow

For applications acting on behalf of users:

```
1. User clicks "Connect with Ratel"
2. Redirect to authorization URL
3. User grants permissions
4. Receive authorization code
5. Exchange code for access token
6. Use access token for API calls
```

### Step 1: Authorization Request

Redirect users to:

```
https://ratel.foundation/oauth/authorize?
  client_id=YOUR_CLIENT_ID&
  redirect_uri=YOUR_REDIRECT_URI&
  response_type=code&
  scope=read:posts write:posts&
  state=random_state_string
```

### Step 2: Handle Callback

User redirected back with code:

```
https://yourapp.com/callback?
  code=auth_code_abc123&
  state=random_state_string
```

### Step 3: Exchange for Token

```bash
curl -X POST https://api.ratel.foundation/v2/oauth/token \
  -H "Content-Type: application/json" \
  -d '{
    "grant_type": "authorization_code",
    "code": "auth_code_abc123",
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET",
    "redirect_uri": "YOUR_REDIRECT_URI"
  }'
```

Response:

```json
{
  "access_token": "ratel_at_abc123...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "ratel_rt_xyz789...",
  "scope": "read:posts write:posts"
}
```

### Step 4: Make API Calls

```bash
curl -H "Authorization: Bearer ratel_at_abc123..." \
  https://api.ratel.foundation/v2/posts
```

### Refreshing Tokens

When access token expires:

```bash
curl -X POST https://api.ratel.foundation/v2/oauth/token \
  -H "Content-Type: application/json" \
  -d '{
    "grant_type": "refresh_token",
    "refresh_token": "ratel_rt_xyz789...",
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET"
  }'
```

## Scopes

Control API access with granular scopes:

### User Scopes
- `read:user` - Read user profile
- `write:user` - Update user settings

### Post Scopes
- `read:posts` - Read posts and comments
- `write:posts` - Create and edit posts
- `delete:posts` - Delete posts

### Space Scopes
- `read:spaces` - Read Space information
- `write:spaces` - Manage Spaces
- `moderate:spaces` - Moderation actions

### Deliberation Scopes
- `read:deliberations` - View deliberations
- `write:deliberations` - Create deliberations
- `vote:deliberations` - Submit votes

### Oracle Scopes
- `read:oracle` - View verification requests
- `write:oracle` - Submit verification requests
- `vote:oracle` - Vote on verifications

### Admin Scopes
- `admin:spaces` - Full Space administration
- `admin:users` - User management

## Rate Limiting

Authentication affects rate limits:

- **Unauthenticated**: 60 requests/hour
- **API Key**: 5,000 requests/hour
- **OAuth User**: 1,000 requests/hour
- **Premium Account**: 10,000 requests/hour

Rate limit headers in responses:

```
X-RateLimit-Limit: 5000
X-RateLimit-Remaining: 4999
X-RateLimit-Reset: 1621350000
```

## Error Handling

### Invalid API Key

```json
{
  "success": false,
  "error": {
    "code": "invalid_api_key",
    "message": "The provided API key is invalid or expired"
  }
}
```

HTTP Status: `401 Unauthorized`

### Insufficient Scopes

```json
{
  "success": false,
  "error": {
    "code": "insufficient_scope",
    "message": "This action requires 'write:posts' scope"
  }
}
```

HTTP Status: `403 Forbidden`

### Expired Token

```json
{
  "success": false,
  "error": {
    "code": "token_expired",
    "message": "Access token has expired. Use refresh token to obtain new token."
  }
}
```

HTTP Status: `401 Unauthorized`

## Webhooks

Receive real-time events (requires authentication):

1. Configure webhook URL in developer settings
2. Verify webhook signature
3. Process event payload
4. Return 200 OK within 5 seconds

Webhook signature verification:

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hmac = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(hmac)
  );
}
```

## Testing

### Sandbox Environment

Use test API keys with sandbox:

```
https://api-sandbox.ratel.foundation/v2
```

Sandbox features:
- Separate data from production
- No rate limits
- Test webhook events
- Mock third-party services

---

*See also: [API Overview](./overview) • [API Reference](./reference) • [Best Practices](./best-practices)*
