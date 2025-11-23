---
title: API 개요
description: Ratel API 소개
sidebar_position: 1
---

# API 개요

사용자 지정 통합을 위한 Ratel API를 시작하세요.

:::info 출시 예정
Ratel API는 **2025년 2분기**에 출시될 예정입니다. 이 문서는 계획된 기능을 설명합니다.
:::

## Ratel API란?

Ratel API는 플랫폼 기능에 대한 프로그래밍 방식 액세스를 제공하여 개발자가 다음을 수행할 수 있도록 합니다:

- 사용자 지정 애플리케이션 및 통합 구축
- 콘텐츠 게시 및 중재 자동화
- 분석 및 지표 액세스
- 프로그래밍 방식으로 스페이스 관리
- 제3자 서비스와 통합

## API 기능

### 핵심 기능

**콘텐츠 관리**
- 게시물 생성, 읽기, 업데이트 및 삭제
- 초안 및 예약된 게시물 관리
- 미디어 업로드 및 관리
- 댓글 및 스레드 처리

**스페이스 관리**
- 스페이스 생성 및 구성
- 멤버 및 권한 관리
- 스페이스 분석 액세스
- 콘텐츠 중재

**사용자 작업**
- 사용자 프로필 검색
- 팔로우 및 연결 관리
- 사용자 활동 액세스
- 기본 설정 업데이트

**숙의**
- 숙의 세션 생성
- 설문 및 투표 제출
- 결과 및 분석 액세스
- 숙의 데이터 내보내기

**오라클 시스템**
- 검증 요청 제출
- DID 속성에 투표
- 검증 상태 조회
- 증명 기록 액세스

## API 아키텍처

### RESTful 설계

API는 REST 원칙을 따릅니다:
- 리소스 기반 URL
- 표준 HTTP 메서드 (GET, POST, PUT, DELETE)
- JSON 요청/응답 형식
- 무상태 인증

### 기본 URL

```
https://api.ratel.foundation/v2
```

### 버전 관리

API 버전은 URL 경로에 지정됩니다:
- `/v2` - 현재 버전 (2025년 2분기 출시)
- 주요 변경 사항은 버전 번호를 증가시킵니다
- 사용 중단된 버전은 12개월 동안 지원됩니다

## 시작하기

### 1. API 자격 증명 얻기

1. 설정 → **개발자**로 이동
2. "API 키 생성" 클릭
3. 애플리케이션 이름 지정
4. 필요한 범위 선택
5. API 키를 안전하게 저장

### 2. 첫 번째 요청하기

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.ratel.foundation/v2/users/me
```

### 3. 문서 탐색

- [인증](./auth) - 인증 방법 알아보기
- [API 참조](./reference) - 전체 엔드포인트 목록
- [모범 사례](./best-practices) - 속도 제한 및 가이드라인

## 사용 사례

### 봇 자동화
- 일정에 따라 콘텐츠 자동 게시
- 다른 플랫폼에서 교차 게시
- 자동 중재
- 알림 처리

### 분석 플랫폼
- 스페이스 성장 추적
- 참여 지표 모니터링
- 분석용 데이터 내보내기
- 사용자 지정 보고서 생성

### 제3자 통합
- Discord, Slack 등과 연결
- RSS 피드 생성기
- 이메일 다이제스트 서비스
- 아카이브 및 백업 도구

### 사용자 지정 클라이언트
- 모바일 앱 구축
- 데스크톱 애플리케이션 생성
- 브라우저 확장 개발
- 대체 웹 인터페이스

## 응답 형식

모든 API 응답은 일관된 형식을 따릅니다:

```json
{
  "success": true,
  "data": {
    // 응답 페이로드
  },
  "meta": {
    "request_id": "req_abc123",
    "timestamp": "2025-05-15T10:30:00Z"
  }
}
```

오류 응답에는 세부 정보가 포함됩니다:

```json
{
  "success": false,
  "error": {
    "code": "invalid_token",
    "message": "제공된 API 키가 유효하지 않습니다",
    "details": {}
  },
  "meta": {
    "request_id": "req_def456",
    "timestamp": "2025-05-15T10:30:00Z"
  }
}
```

## SDK 라이브러리

공식 SDK (계획됨):
- JavaScript/TypeScript
- Python
- Go
- Rust

커뮤니티 SDK 환영합니다!

## 지원

- **문서**: docs.ratel.foundation/advanced/api
- **이메일**: api@biyard.co
- **Discord**: #api-support 채널
- **상태**: status.ratel.foundation

---

*참고: [인증](./auth) • [API 참조](./reference) • [모범 사례](./best-practices)*
