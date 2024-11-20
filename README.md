![logo.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/d8702674-2456-45b7-b94d-62552ab26abf/69f83b73-2ddf-4643-a0a7-ca5f228fc67c/logo.png)

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
