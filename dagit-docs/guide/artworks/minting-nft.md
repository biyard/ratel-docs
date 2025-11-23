---
title: NFT 발행하기
description: Digital Art Twin NFT 발행 및 페어링 가이드
sidebar_position: 2
---

# NFT 발행하기

실물 미술품과 연동된 NFT를 발행하고 Digital Art Twin을 생성하는 방법을 안내합니다.

## Digital Art Twin이란?

**Digital Art Twin**은 실물 미술품과 1:1로 페어링된 NFT로, 실물 소유권과 디지털 소유권을 동기화합니다.

### 주요 특징

- **1:1 페어링**: 하나의 실물 = 하나의 NFT
- **소유권 동기화**: 실물 이전 시 NFT도 함께 이전
- **블록체인 인증**: 소유권 및 거래 이력의 불변 증명
- **메타데이터 저장**: S3/IPFS에 영구 저장

## NFT 발행 전 확인사항

### 필수 조건
- ✓ 실물 미술품이 d.AGIT에 등록되어 있어야 함
- ✓ 지갑 연결 완료 (MetaMask 또는 Internet Identity)
- ✓ 가스비용 충분 (약 0.01 ETH 또는 0.1 ICP)

### 권장 사항
- ✓ 진품 검증 완료 (신뢰도 향상)
- ✓ 고품질 이미지 업로드 완료
- ✓ EAR 기록 추가 (가치 상승)

## NFT 발행 프로세스

### 1단계: NFT 발행 시작

```
1. 등록된 실물 미술품 목록에서 작품 선택
2. 작품 상세 페이지 이동
3. "NFT 발행" 버튼 클릭
```

![NFT 발행 버튼](/img/screenshots/mint-nft-button.png)

:::caution 발행 전 확인
NFT 발행 후에는 다음 정보를 변경할 수 없습니다:
- 작품 제목
- 작가명
- 크기
- 재료
- 제작 연도

발행 전 정보를 다시 한 번 확인하세요!
:::

### 2단계: 컨트랙트 설정

#### 컨트랙트 주소 선택

```
기본 컨트랙트 (권장):
  - d.AGIT 공식 NFT Canister
  - 주소: 0x... (자동 입력)
  - 수수료: 무료
  - 검증 완료

커스텀 컨트랙트:
  - 본인 소유 컨트랙트 주소 입력
  - EIP-721 호환 필수
  - 수수료: 가스비만 부담
```

:::tip 컨트랙트 선택 가이드
- **처음 사용하시나요?** → 기본 컨트랙트 권장
- **갤러리 전용 컨트랙트가 있나요?** → 커스텀 입력
- **대량 발행 예정인가요?** → 커스텀 권장
:::

### 3단계: 메타데이터 확인

시스템이 자동으로 생성한 메타데이터를 확인합니다:

```json
{
  "name": "봄날의 풍경",
  "description": "따뜻한 햇살과 바람에 흔들리는 유채꽃밭...",
  "image": "https://s3.amazonaws.com/dagit/artworks/12345.jpg",
  "attributes": [
    {
      "trait_type": "Artist",
      "value": "김철수"
    },
    {
      "trait_type": "Category",
      "value": "회화"
    },
    {
      "trait_type": "Material",
      "value": "캔버스에 유화"
    },
    {
      "trait_type": "Width",
      "value": "100cm"
    },
    {
      "trait_type": "Height",
      "value": "80cm"
    },
    {
      "trait_type": "Year",
      "value": "2024"
    },
    {
      "trait_type": "Physical Artwork ID",
      "value": "physical_artwork_12345"
    },
    {
      "trait_type": "QR Code",
      "value": "ART-20250123-A1B2C3"
    },
    {
      "trait_type": "Certification Status",
      "value": "Verified"
    }
  ]
}
```

**확인 항목**:
- ✓ 작품명 정확한지
- ✓ 이미지 URL 로딩되는지
- ✓ 모든 속성 정확한지

### 4단계: NFT 발행 실행

```
1. 메타데이터 확인 체크박스 선택
2. "발행" 버튼 클릭
3. 지갑 팝업에서 거래 내용 확인
4. "승인" 클릭
```

**트랜잭션 정보**:
```
To: 0x... (NFT Canister)
Function: mint(address, tokenURI)
Gas Fee: ~0.005 ETH
Estimated Time: 30-60초
```

![메타마스크 승인](/img/screenshots/metamask-approval.png)

### 5단계: 발행 완료 확인

```
트랜잭션 진행 중...
├─ 메타데이터 S3 업로드 ✓
├─ NFT Canister 호출 ✓
├─ 토큰 ID 발급 ✓
├─ TwinPairing 생성 ✓
└─ 소유권 등록 ✓

발행 완료! 🎉
```

**발행 결과**:
```
NFT ID: digital_artwork_67890
Token ID: 1001
Contract: 0x...
Metadata URI: https://s3.amazonaws.com/dagit/metadata/67890.json
Transaction Hash: 0x...
Pairing Status: Active
```

### 6단계: NFT 확인

발행된 NFT를 확인합니다:

```
1. 작품 상세 페이지에서 "Digital Twin" 탭 클릭
2. NFT 정보 확인:
   - Token ID
   - Contract Address
   - Metadata URI
   - Owner Address
   - Pairing Status
3. OpenSea에서 보기 (선택)
```

![NFT 상세 정보](/img/screenshots/nft-details.png)

## Digital Art Twin 페어링

### 페어링 상태

NFT 발행 시 자동으로 페어링이 생성됩니다:

```
Pairing Information:
├─ Physical Artwork: physical_artwork_12345
├─ Digital Artwork: digital_artwork_67890
├─ Status: Active
├─ Verification: QR Code Scan
├─ Created At: 2025-01-23 14:30:00
└─ Verified By: system
```

### 페어링 검증

실물과 NFT가 올바르게 페어링되었는지 확인:

```
1. 실물 작품의 QR 코드 스캔
2. 자동으로 NFT 정보 표시
3. Token ID 일치 확인
4. Owner Address 일치 확인
5. 페어링 상태 "Active" 확인
```

:::tip QR 코드 검증
구매자에게 QR 코드를 스캔하여 NFT 정보를 확인하도록 안내하세요. 이를 통해 진품 여부를 즉시 확인할 수 있습니다.
:::

### 페어링 해제 (주의)

특별한 경우에만 페어링을 해제할 수 있습니다:

```
해제 가능한 경우:
- 실물 작품 분실
- 실물 작품 훼손 (복원 불가)
- 오류로 잘못 페어링된 경우

해제 절차:
1. "페어링 해제 요청" 클릭
2. 사유 선택 및 증거 제출
3. 오라클 검증 (최소 3명)
4. 과반 승인 시 해제
```

:::danger 페어링 해제 주의
페어링 해제 시 NFT의 가치가 크게 하락할 수 있습니다. 신중하게 결정하세요.
:::

## 소유권 이전

### 실물 + NFT 동시 이전

d.AGIT 마켓플레이스에서 판매 시 자동 처리됩니다:

```
판매 프로세스:
1. 구매자 결제 (에스크로)
2. 판매자 실물 배송
3. 구매자 수령 확인
4. NFT 자동 이전 (구매자 지갑으로)
5. PhysicalArtwork 소유자 업데이트
6. TwinPairing 검증자 업데이트
7. EAR 거래 이력 자동 기록
```

### NFT만 이전 (외부 플랫폼)

OpenSea 등 외부 플랫폼에서 NFT만 이전한 경우:

```
경고: 페어링 해제됨
- 실물 소유자: 김철수
- NFT 소유자: 이영희
- 상태: Broken Pairing

재페어링 필요:
1. 실물 이전 증명 제출
2. 양측 합의서 제출
3. 오라클 검증
4. 재페어링 승인
```

:::caution 외부 거래 주의
NFT를 외부 플랫폼에서 거래하면 페어링이 해제됩니다. 가능하면 d.AGIT 마켓플레이스를 이용하세요.
:::

## NFT 관리

### 메타데이터 업데이트

일부 정보는 NFT 발행 후에도 업데이트 가능합니다:

```
업데이트 가능:
- 작품 설명 (description)
- 추가 이미지 (additional_images)
- 전시 이력 (exhibition_history)
- 검증 상태 (certification_status)

업데이트 불가:
- 작품명 (name)
- 작가 (artist)
- 크기 (dimensions)
- 재료 (material)
```

**업데이트 절차**:
```
1. 작품 상세 페이지에서 "메타데이터 업데이트" 클릭
2. 변경할 정보 입력
3. "업데이트" 클릭
4. 새 메타데이터 S3 업로드
5. NFT Canister에 URI 업데이트
```

### NFT 소각 (Burn)

NFT를 영구적으로 삭제할 수 있습니다:

```
소각 사유:
- 실물 작품 영구 분실
- 실물 작품 완전 훼손
- 법적 요구 (저작권 침해 등)

소각 절차:
1. "NFT 소각" 메뉴 선택
2. 소각 사유 입력 및 증거 제출
3. 오라클 검증 (최소 5명)
4. 과반 승인 시 소각 실행
5. 블록체인에 영구 기록
```

:::danger NFT 소각 경고
소각된 NFT는 복구할 수 없습니다. 매우 신중하게 결정하세요.
:::

## 문제 해결

### NFT 발행 실패

**원인**:
- 가스비 부족
- 네트워크 혼잡
- 지갑 연결 해제
- 이미 NFT가 발행된 작품

**해결책**:
```
1. 지갑 잔액 확인 및 충전
2. 가스비 설정 조정 (Priority Fee 증가)
3. 지갑 재연결
4. 작품 상태 확인 (NFT 발행 여부)
```

### 메타데이터 로딩 실패

**원인**:
- S3 업로드 실패
- 네트워크 오류
- 파일 크기 초과

**해결책**:
```
1. "메타데이터 재생성" 버튼 클릭
2. 이미지 크기 확인 (50MB 이하)
3. 네트워크 연결 확인
4. 문제 지속 시 support@dagit.io 문의
```

### 페어링 상태 오류

**원인**:
- 실물 작품 정보 변경
- NFT 소유자 불일치
- 시스템 동기화 오류

**해결책**:
```
1. 작품 상세 페이지에서 "동기화" 버튼 클릭
2. QR 코드 재스캔
3. 소유권 정보 확인
4. 문제 지속 시 재페어링 요청
```

## FAQ

**Q: NFT 발행 비용은 얼마인가요?**

A: 기본 컨트랙트 사용 시 가스비만 부담합니다 (약 0.005-0.01 ETH). 플랫폼 수수료는 없습니다.

**Q: NFT를 OpenSea에서 볼 수 있나요?**

A: 네, d.AGIT NFT는 EIP-721 표준을 따르므로 OpenSea, Rarible 등에서 확인 가능합니다.

**Q: 실물 없이 NFT만 발행할 수 있나요?**

A: 아니요, d.AGIT은 실물-디지털 연동을 핵심으로 하므로 실물 미술품 등록이 필수입니다.

**Q: NFT를 여러 개 발행할 수 있나요?**

A: 하나의 실물 미술품당 하나의 NFT만 발행 가능합니다 (1:1 페어링 원칙).

## 다음 단계

NFT 발행을 완료했다면:

1. **[진품 검증 요청하기](../verification/requesting)** - 오라클 검증으로 신뢰도 향상
2. **[EAR 기록 추가하기](../ear/creating-records)** - 작품 가치 상승
3. **[마켓플레이스에 등록하기](../marketplace/listing)** - 판매 시작

---

**도움이 더 필요하신가요?** [지원팀 문의](mailto:support@dagit.io) 또는 [Discord 커뮤니티](https://discord.gg/dagit)
