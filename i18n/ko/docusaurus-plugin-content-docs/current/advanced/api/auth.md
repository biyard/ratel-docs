---
title: 인증
description: API 인증 방법
sidebar_position: 2
---

# 인증

Ratel API 인증 방법을 알아보세요.

:::info 출시 예정
Ratel API는 **2025년 2분기**에 출시될 예정입니다. 이 문서는 계획된 인증 방법을 설명합니다.
:::

## 인증 방법

Ratel API는 두 가지 인증 방법을 지원합니다:

1. **API 키** - 서버 간 애플리케이션용
2. **OAuth 2.0** - 사용자 승인 애플리케이션용

## API 키

### API 키 생성

1. 설정 → **개발자**로 이동
2. "API 키 생성" 클릭
3. 키 설정 구성:
   - **이름**: 애플리케이션 식별
   - **범위**: 필요한 권한 선택
   - **만료**: 선택적 만료 날짜
4. 키를 안전하게 저장 (한 번만 표시됨)

### API 키 사용

`Authorization` 헤더에 API 키 포함:

```bash
curl -H "Authorization: Bearer ratel_sk_live_abc123..." \
  https://api.ratel.foundation/v2/users/me
```

### API 키 유형

- `ratel_sk_test_*` - 테스트 모드 키 (샌드박스)
- `ratel_sk_live_*` - 프로덕션 키

### 보안 모범 사례

✅ **할 일:**
- 환경 변수에 키 저장
- 각 애플리케이션에 별도의 키 사용
- 정기적으로 키 교체
- 적절한 범위 설정
- 개발 중 테스트 키 사용

❌ **하지 말아야 할 일:**
- 버전 관리에 키 커밋
- 공개적으로 키 공유
- 클라이언트 측 코드에서 프로덕션 키 사용
- 불필요한 권한 부여

### 키 교체

키가 손상된 경우:

1. 새 API 키 생성
2. 애플리케이션 업데이트
3. 이전 키 취소
4. 무단 액세스 모니터링

## OAuth 2.0

### 인증 흐름

사용자를 대신하여 작동하는 애플리케이션의 경우:

```
1. 사용자가 "Ratel과 연결" 클릭
2. 인증 URL로 리디렉션
3. 사용자가 권한 부여
4. 인증 코드 수신
5. 액세스 토큰으로 코드 교환
6. API 호출에 액세스 토큰 사용
```

### 1단계: 인증 요청

사용자를 리디렉션:

```
https://ratel.foundation/oauth/authorize?
  client_id=YOUR_CLIENT_ID&
  redirect_uri=YOUR_REDIRECT_URI&
  response_type=code&
  scope=read:posts write:posts&
  state=random_state_string
```

### 2단계: 콜백 처리

코드와 함께 사용자가 리디렉션됨:

```
https://yourapp.com/callback?
  code=auth_code_abc123&
  state=random_state_string
```

### 3단계: 토큰으로 교환

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

응답:

```json
{
  "access_token": "ratel_at_abc123...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "ratel_rt_xyz789...",
  "scope": "read:posts write:posts"
}
```

### 4단계: API 호출하기

```bash
curl -H "Authorization: Bearer ratel_at_abc123..." \
  https://api.ratel.foundation/v2/posts
```

### 토큰 갱신

액세스 토큰 만료 시:

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

## 범위

세분화된 범위로 API 액세스 제어:

### 사용자 범위
- `read:user` - 사용자 프로필 읽기
- `write:user` - 사용자 설정 업데이트

### 게시물 범위
- `read:posts` - 게시물 및 댓글 읽기
- `write:posts` - 게시물 생성 및 편집
- `delete:posts` - 게시물 삭제

### 스페이스 범위
- `read:spaces` - 스페이스 정보 읽기
- `write:spaces` - 스페이스 관리
- `moderate:spaces` - 중재 작업

### 숙의 범위
- `read:deliberations` - 숙의 보기
- `write:deliberations` - 숙의 생성
- `vote:deliberations` - 투표 제출

### 오라클 범위
- `read:oracle` - 검증 요청 보기
- `write:oracle` - 검증 요청 제출
- `vote:oracle` - 검증에 투표

### 관리자 범위
- `admin:spaces` - 전체 스페이스 관리
- `admin:users` - 사용자 관리

## 속도 제한

인증은 속도 제한에 영향을 줍니다:

- **인증되지 않음**: 시간당 60 요청
- **API 키**: 시간당 5,000 요청
- **OAuth 사용자**: 시간당 1,000 요청
- **프리미엄 계정**: 시간당 10,000 요청

응답의 속도 제한 헤더:

```
X-RateLimit-Limit: 5000
X-RateLimit-Remaining: 4999
X-RateLimit-Reset: 1621350000
```

## 오류 처리

### 잘못된 API 키

```json
{
  "success": false,
  "error": {
    "code": "invalid_api_key",
    "message": "제공된 API 키가 유효하지 않거나 만료되었습니다"
  }
}
```

HTTP 상태: `401 Unauthorized`

### 불충분한 범위

```json
{
  "success": false,
  "error": {
    "code": "insufficient_scope",
    "message": "이 작업에는 'write:posts' 범위가 필요합니다"
  }
}
```

HTTP 상태: `403 Forbidden`

### 만료된 토큰

```json
{
  "success": false,
  "error": {
    "code": "token_expired",
    "message": "액세스 토큰이 만료되었습니다. 갱신 토큰을 사용하여 새 토큰을 얻으세요."
  }
}
```

HTTP 상태: `401 Unauthorized`

## 웹훅

실시간 이벤트 수신 (인증 필요):

1. 개발자 설정에서 웹훅 URL 구성
2. 웹훅 서명 확인
3. 이벤트 페이로드 처리
4. 5초 이내에 200 OK 반환

웹훅 서명 확인:

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

## 테스트

### 샌드박스 환경

샌드박스와 함께 테스트 API 키 사용:

```
https://api-sandbox.ratel.foundation/v2
```

샌드박스 기능:
- 프로덕션과 별도의 데이터
- 속도 제한 없음
- 웹훅 이벤트 테스트
- 제3자 서비스 모의 실험

---

*참고: [API 개요](./overview) • [API 참조](./reference) • [모범 사례](./best-practices)*
