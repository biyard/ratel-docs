---
title: 텍스트 편집기
description: 리치 텍스트 편집기 사용
sidebar_position: 4
---

# 텍스트 편집기

Ratel의 텍스트 편집기는 게시물을 돋보이게 하는 리치 서식을 지원합니다.

## 기본 서식

### 키보드 단축키
- **굵게**: Ctrl/Cmd + B
- *기울임꼴*: Ctrl/Cmd + I
- ~~취소선~~: Ctrl/Cmd + Shift + X
- `코드`: Ctrl/Cmd + E

### 제목
```
# 제목 1
## 제목 2
### 제목 3
```

### 목록
```
- 글머리 기호
- 다른 글머리 기호

1. 번호 항목
2. 다른 번호
```

### 인용
```
> 이것은 인용입니다
> 여러 줄도 작동합니다
```

## 고급 기능

### 멘션
`@`를 입력하여 사용자 멘션:
- @username이 알림 트리거
- 사용자가 멘션 알림 받음
- 프로필로 클릭 가능한 링크 생성

### 해시태그
주제에 `#` 사용:
- #technology #web3 #discussion
- 게시물 검색 가능하게 만들기
- 주제 페이지 생성

### 링크
자동 미리보기를 위해 URL 붙여넣기:
- YouTube 비디오 임베드
- Twitter 게시물 임베드
- 이미지 미리보기 표시

### 코드 블록
삼중 백틱 사용:
```
```javascript
function hello() {
  console.log("Hello Ratel!");
}
```
```

## 마크다운 지원

Ratel은 고급 사용자를 위한 CommonMark 마크다운을 지원합니다. 자세한 내용은 [CommonMark 사양](https://commonmark.org/)을 참조하세요.

---

*관련 항목: [게시물 작성](./creating-posts) • [미디어](./media)*
