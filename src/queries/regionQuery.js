// regionQuery.js

const sidoList = [
  { sidoId: 1, sidoName: "서울특별시" },
  { sidoId: 2, sidoName: "부산광역시" },
  { sidoId: 3, sidoName: "대구광역시" },
  { sidoId: 9, sidoName: "경기도" }
  // ...
];

const sigunguMap = {
  1: [
    // 서울특별시
    { sigunguId: 1, sigunguName: "강남구" },
    { sigunguId: 2, sigunguName: "강동구" },
    { sigunguId: 3, sigunguName: "강북구" }
    // ... 나머지 구들
  ],
  2: [
    // 부산광역시
    { sigunguId: 26, sigunguName: "강서구" },
    { sigunguId: 27, sigunguName: "금정구" },
    { sigunguId: 28, sigunguName: "기장군" }
    // ... 나머지 구들
  ],
  3: [
    // 대구광역시
    { sigunguId: 42, sigunguName: "남구" },
    { sigunguId: 43, sigunguName: "달서구" },
    { sigunguId: 44, sigunguName: "달성군" }
    // ... 나머지 구들
  ],
  9: [
    // 경기도
    { sigunguId: 76, sigunguName: "가평군" },
    { sigunguId: 77, sigunguName: "고양시 덕양구" },
    { sigunguId: 78, sigunguName: "고양시 일산동구" },
    { sigunguId: 79, sigunguName: "고양시 일산서구" },
    { sigunguId: 92, sigunguName: "수원시 권선구" },
    { sigunguId: 93, sigunguName: "수원시 영통구" },
    { sigunguId: 94, sigunguName: "수원시 장안구" },
    { sigunguId: 95, sigunguName: "수원시 팔달구" }
    // ... 나머지 시군구들
  ]
  // ... 나머지 시도들의 시군구 데이터
};

const getSidoList = async () => {
  try {
    return {
      message: "Get Sido Success",
      data: {
        sidoList: sidoList
      },
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19)
    };
  } catch (error) {
    throw new Error("Failed to fetch sido data");
  }
};

const getSigunguList = async (sidoId) => {
  try {
    const sigunguList = sigunguMap[sidoId] || [];
    return {
      message: "Get Sigungu Success",
      data: {
        sigunguList: sigunguList
      },
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19)
    };
  } catch (error) {
    throw new Error("Failed to fetch sigungu data");
  }
};

export { getSidoList, getSigunguList };
