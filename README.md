<div style="display: flex; align-items: center; justify-content: center;">
    <img src="readme/logo.png" alt="Logo" style="width: 30%; margin-right: 20px;">
    <div>
        <h2>미용멍당</h2>
        <h3>반려견 미용을 위한 최적의 장소</h3>
    </div>
</div>

## 💡프로젝트 목적

반려견 미용 시장은 반려견의 다양한 견종과 스타일에 따라 가격이 획일적이지 않고, 보호자가 미용사를 찾기 어렵다는 문제가 있다. 특히, 견종과 스타일에 따라 가격이 다르지만, 표준화된 가격 정보를 제공하는 플랫폼이 부족해 보호자가 미용사를 선택하는 과정에서 많은 불편을 겪고 있다.

이를 해결하고자 보호자가 반려견의 특성에 맞는 미용사를 쉽게 찾고, 합리적인 가격에 원하는 미용 서비스를 받을 수 있도록 다음과 같은 목표를 달성하고자 한다.

- **반려견 맞춤형 견적 요청**
  보호자는 자신의 반려견 정보를 상세히 입력해 미용사에게 맞춤
  견적을 요청할 수 있다. 견적 요청에 따라 미용사가 명확한 가격을
  제시하기 때문에 여러 미용사들의 가격을 투명하게 비교 후
  합리적으로 고를 수 있다.
- **실시간 채팅을 통한 소통 강화**
  견적 요청 전후 고객은 미용사와 실시간 채팅을 통해 직접 소통할
  수 있다. 명확한 커뮤니케이션으로 미용 결과의 품질을 높일 수
  있다.

## 💡프로젝트 구현 기능 개요

- 회원 시스템
  - 프로필 관리
- 결제 시스템
- 예약 시스템
- 미용 견적 입찰 시스템
- 리뷰 시스템
- 채팅 시스템
- 알림 시스템

## 💡프로젝트 개발 환경

프레임워크 : React

패키지매니저 : yarn

빌드 도구 : vite

CSS : Tailwind
형상관리 : Git, GitHub
기타 : Slack, Notion, ERD Cloud

## 💡프로젝트 범위(상세 구현 기능)

**로그인/회원가입**

- 소셜로그인(Kakao, Google)
- 가입 후 고객 혹은 미용사 선택
- 미용사/고객 전환 가능
- 로그아웃

**프로필 관리**

- 사용자는 고객 및 미용사 프로필을 등록/수정/삭제
- 고객은 반려견 프로필을 등록/수정/삭제
- 미용사는 매장 등록/수정/삭제

**결제시스템**

- PG 결제 시스템 적용하여 간편 결제 지원

**예약 시스템**

- 미용 예약 정보 조회/취소 가능
- 미용사는 오늘의 예약 미리보기 조회 가능
- 고객이 견적서를 결제해야만 예약 확정

**미용 견적 입찰 시스템**

- 견적서 요청
  1. 고객은 전체 미용사를 대상으로 견적 공고 게시
  2. 고객은 원하는 미용사를 선택하여 견적서 요청
- 고객은 견적서를 보낸 미용사들의 프로필 확인 가능
- 고객은 원하는 미용사의 견적서를 결제하여 예약 확정 가능
- 미용사는 견적 요청이 들어온 항목들에서 원하는 요청에 견적서
  전달 가능
- 미용사는 고객이 올린 견적 공고 조회 가능
- 미용사는 받은 견적서 요청 건수 미리보기 가능

**리뷰 시스템**

- 반려견 미용 후 리뷰 등록/수정/삭제
- 리뷰 좋아요 기능
- 메인페이지에 Best 후기 (좋아요 많이 받은 순) 게시

**채팅 시스템**

- 고객과 미용사의 실시간 채팅

**알림 시스템**

- 견적 요청/견적서 수신/실시간 채팅/예약 완료 등 알림 확인

## 💡기대 효과

**[시간절약]**

- 매장 방문 없이 온라인으로 견적 확인 가능
- 여러 미용사의 견적을 한 번에 비교 가능
- 근처 미용실 찾기 기능으로 이동시간 절약

**[맞춤형 서비스]**

- 원하는 미용 스타일을 정확히 전달
- 반려견 특성에 맞는 미용사 선택
- 채팅 기능으로 상세한 요구사항 및 질문 가능

**[신뢰성 향상]**

- 고객 리뷰를 통해 정보 교류
- 미용사의 포트폴리오를 통해 정보 확인
- 견적서를 통해 명확하고 다양한 가격 제시

**[운영]**

- 예약 시스템을 통한 효율적인 일정 관리
- 소셜 로그인을 통한 간편한 로그인 기능 이용
- PG 간편 결제 시스템으로 빠른 결제 및 관리 용이

---
---

## 🖤 커밋 메시지 컨벤션

Feat : 새로운 기능 추가 (흐름 단위)

Fix: 버그 고침

Refactor: 코드 리팩토링

Test: 데스트 코드, 리팩토링 테스트 코드 추가

Comment: 필요한 추가 및 변경

Style: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우

Docs: 문서 수정

Rename: 파일명(or 폴더명) 수정한 경우

Remove: 코드(파일)의 삭제

Design: CSS 등 사용자 UI 디자인 변경

Chore: (코드의 수정 없이) 설정 변경

### 🖤 한 커밋에는 한 가지 문제만!

- 추적 가능하게 유지해주기
- 너무 많은 문제를 한 커밋에 담으면 추적하기 어렵다.

<aside>
✅

### 1. 커밋 유형 지정

- 커밋 유형은 영어 대문자로 작성하기
    
    
    | 커밋 유형 | 의미 |
    | --- | --- |
    | `Feat` | 새로운 기능 추가 |
    | `Fix` | 버그 수정 |
    | `Docs` | 문서 수정 |
    | `Style` | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
    | `Refactor` | 코드 리팩토링 |
    | `Test` | 테스트 코드, 리팩토링 테스트 코드 추가 |
    | `Chore` | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore |
    | `Design` | CSS 등 사용자 UI 디자인 변경 |
    | `Comment` | 필요한 주석 추가 및 변경 |
    | `Rename` | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우 |
    | `Remove` | 파일을 삭제하는 작업만 수행한 경우 |
    | `!BREAKING CHANGE` | 커다란 API 변경의 경우 |
    | `!HOTFIX` | 급하게 치명적인 버그를 고쳐야 하는 경우 |

### 2. 제목과 본문을 빈행으로 분리

- 커밋 유형 이후 제목과 본문은 한글로 작성하여 내용이 잘 전달될 수 있도록 할 것
- 본문에는 변경한 내용과 이유 설명 (어떻게보다는 무엇 & 왜를 설명)

### 3. 제목 첫 글자는 대문자로, 끝에는 `.` 금지

### 4. 제목은 영문 기준 50자 이내로 할 것

### 5. 자신의 코드가 직관적으로 바로 파악할 수 있다고 생각하지 말자

### 6. 여러가지 항목이 있다면 글머리 기호를 통해 가독성 높이기

</aside>
