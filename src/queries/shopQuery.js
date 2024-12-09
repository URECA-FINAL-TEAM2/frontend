import axiosInstance from "@/api/axiosInstance";

const shopDetail = {
  groomerId: 1,
  shopId: 1,
  shopLogo:
    "https://marketplace.canva.com/EAGB4IFoJRg/5/0/1600w/canva-%EA%B0%88%EC%83%89-%EC%8B%AC%ED%94%8C%ED%95%9C-%EA%B0%95%EC%95%84%EC%A7%80-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EC%95%A0%EA%B2%AC%EB%AF%B8%EC%9A%A9%EC%8B%A4-%EB%A1%9C%EA%B3%A0-qyvbshjRWdM.jpg",
  shopName: "위드뮤",
  starScore: 4.4,
  starCount: 305,
  address: "경기 수원시 영통구 영통동 222-2",
  businessTime: "10:00-18:00 매주 수요일 휴무",
  skills: "소형견, 중형견, 대형견",
  latitude: 37.2567,
  longitude: 127.0218,
  favorite: 14,
  isFavorite: false,
  description: '위드뮤의 모토는 "모든 아이들은 별과 같이 소중한 존재고, 반짝일 가치가 있다."입니다.',
  groomerPortfolioImages: [
    {
      imageUrl: "https://picsum.photos/200"
    },
    {
      imageUrl: "https://picsum.photos/200"
    }
  ],
  groomerUsername: "문정",
  groomerProfileImage: "https://picsum.photos/200",
  reviews: [
    {
      reviewId: 1,
      customerNickname: "강아지맘",
      starScore: 4.5,
      content: "강아지가 편안해하고 미용도 꼼꼼하게 해주셨어요.",
      recommendCount: 5,
      reviewsImage: ["review-image1.jpg", "review-image2.jpg", "review-image3.jpg"],
      createdAt: "2024-11-19 10:00:00",
      isRecommended: false
    },
    {
      reviewId: 2,
      customerNickname: "고양이주인",
      starScore: 4.0,
      content: "서비스가 좋아요, 강아지 미용도 깔끔했어요.",
      recommendCount: 3,
      reviewsImage: ["review-image4.jpg", "review-image5.jpg"],
      createdAt: "2024-11-19 11:30:00",
      isRecommended: true
    }
  ]
};

// favorite 내림차순으로 정렬된 shopList
const shopList = [
  {
    groomerId: 19,
    shopId: 19,
    shopLogo: "https://peton.me/data/file/addPlace/%EC%9D%B4%EB%AA%A8%EB%84%A4_%EA%B0%95%EC%95%84%EC%A7%80_37_1.webp",
    shopName: "댕댕뷰티샵",
    starScore: 4.4,
    starCount: 189,
    address: "경기 수원시 영통구 하동 201-20",
    businessTime: "10:00-20:00 매주 월요일 휴무",
    skills: "소형견, 중형견, 특수미용",
    latitude: 37.2877,
    longitude: 127.0267,
    favorite: 20
  },
  {
    groomerId: 3,
    shopId: 3,
    shopLogo:
      "https://peton.me/data/file/addPlace/%EB%AA%BD%EC%8B%A4%EB%AA%BD%EC%8B%A4_%EC%9D%8D%EB%82%B46%EA%B8%B8_8.webp",
    shopName: "럭키독",
    starScore: 4.2,
    starCount: 89,
    address: "경기 수원시 권선구 세류동 444-4",
    businessTime: "10:30-19:30 매주 화요일 휴무",
    skills: "소형견, 대형견, 스파서비스",
    latitude: 37.2654,
    longitude: 127.0156,
    favorite: 19
  },
  {
    groomerId: 2,
    shopId: 2,
    shopLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4H4xghBFXpveNNXl-tl7oa8TrcSxoOoCIXg&s",
    shopName: "댕댕살롱",
    starScore: 4.7,
    starCount: 156,
    address: "경기 수원시 팔달구 우만동 333-3",
    businessTime: "09:00-20:00 매주 일요일 휴무",
    skills: "소형견, 중형견, 고양이",
    latitude: 37.2772,
    longitude: 126.9891,
    favorite: 14
  },
  {
    groomerId: 1,
    shopId: 1,
    shopLogo:
      "https://marketplace.canva.com/EAGB4IFoJRg/5/0/1600w/canva-%EA%B0%88%EC%83%89-%EC%8B%AC%ED%94%8C%ED%95%9C-%EA%B0%95%EC%95%84%EC%A7%80-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EC%95%A0%EA%B2%AC%EB%AF%B8%EC%9A%A9%EC%8B%A4-%EB%A1%9C%EA%B3%A0-qyvbshjRWdM.jpg",
    shopName: "위드뮤",
    starScore: 4.4,
    starCount: 305,
    address: "경기 수원시 영통구 영통동 222-2",
    businessTime: "10:00-18:00 매주 수요일 휴무",
    skills: "소형견, 중형견, 대형견",
    latitude: 37.2567,
    longitude: 127.0218,
    favorite: 14
  },
  {
    groomerId: 4,
    shopId: 4,
    shopLogo: "https://d2v80xjmx68n4w.cloudfront.net/members/portfolios/W59Ak1719811850.jpg",
    shopName: "펫스타일",
    starScore: 4.6,
    starCount: 267,
    address: "경기 수원시 영통구 매탄동 555-5",
    businessTime: "09:30-18:30 매주 월요일 휴무",
    skills: "소형견, 중형견, 트리밍",
    latitude: 37.2811,
    longitude: 126.9912,
    favorite: 13
  },
  {
    groomerId: 18,
    shopId: 18,
    shopLogo:
      "https://dnvefa72aowie.cloudfront.net/origin/smb/202004/3856AB3B68B2F601F9477CA8EFA0CFAD94E26F8F4F7A7A1A4D5BB92795EE40E0.jpg?q=95&s=1440x1440&t=inside",
    shopName: "럭셔리펫",
    starScore: 4.7,
    starCount: 312,
    address: "경기 수원시 팔달구 고등동 191-19",
    businessTime: "09:00-19:00 매주 목요일 휴무",
    skills: "소형견, 중형견, 스파서비스",
    latitude: 37.2712,
    longitude: 127.0195,
    favorite: 12
  },
  {
    groomerId: 5,
    shopId: 5,
    shopLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpKI3C5tvWQ7DXqB9eUsfNMnBIUOdVhsKoapnYej501yo-Hm5YSG58C5Ni7J-MZToG4Xk&usqp=CAU",
    shopName: "해피테일",
    starScore: 4.3,
    starCount: 198,
    address: "경기 수원시 장안구 조원동 666-6",
    businessTime: "10:00-19:00 매주 목요일 휴무",
    skills: "소형견, 중형견, 수제간식",
    latitude: 37.2983,
    longitude: 126.9973,
    favorite: 12
  },
  {
    groomerId: 6,
    shopId: 6,
    shopLogo:
      "https://cdn-dantats.stunning.kr/prod/portfolios/a478ac3c-3512-4ef9-ac08-6ac617f08db3/contents/VJBinw5PAJpMenG4.%E1%84%91%E1%85%A9%E1%84%85%E1%85%A6%E1%84%86%E1%85%A5%E1%86%BC%20%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.png.small?q=80&f=webp&t=crop&s=3508x2481",
    shopName: "멍멍클리닉",
    starScore: 4.8,
    starCount: 412,
    address: "경기 수원시 팔달구 인계동 777-7",
    businessTime: "09:00-18:00 매주 수요일 휴무",
    skills: "전견종, 스포팅독, 전문미용",
    latitude: 37.2634,
    longitude: 127.0285,
    favorite: 11
  },
  {
    groomerId: 7,
    shopId: 7,
    shopLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7VFfa0oFEtIlJJ0VsQCLqa7OtfQACeYX21-S18QmCt3c0XEkUnRC29NwjC2u0-PTm7Fo&usqp=CAU",
    shopName: "프리미엄펫살롱",
    starScore: 4.5,
    starCount: 167,
    address: "경기 수원시 영통구 원천동 888-8",
    businessTime: "10:00-20:00 매주 화요일 휴무",
    skills: "소형견, 중형견, 특수미용",
    latitude: 37.2734,
    longitude: 127.0044,
    favorite: 10
  },
  {
    groomerId: 17,
    shopId: 17,
    shopLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR2XT_93F90gSHiyOhj_-ItIhhL3bwzO9-x-0Qt4RJ-eCPQUS2QPEjjp_LNI_IQIT3DsU&usqp=CAU",
    shopName: "퍼피스타일",
    starScore: 4.5,
    starCount: 278,
    address: "경기 수원시 장안구 천천동 181-18",
    businessTime: "10:30-18:30 매주 수요일 휴무",
    skills: "소형견, 중형견, 대형견",
    latitude: 37.2967,
    longitude: 126.9823,
    favorite: 10
  },
  {
    groomerId: 8,
    shopId: 8,
    shopLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtrKetVTO_Ycqd7GsqoyzbXhpNpz4OfSMqcC3QekiObUibCN3Ws88srwogTh12vJsB43k&usqp=CAU",
    shopName: "강아지스타일",
    starScore: 4.4,
    starCount: 234,
    address: "경기 수원시 권선구 구운동 999-9",
    businessTime: "09:30-19:30 매주 일요일 휴무",
    skills: "소형견, 중형견, 대형견",
    latitude: 37.2912,
    longitude: 126.9856,
    favorite: 9
  },
  {
    groomerId: 9,
    shopId: 9,
    shopLogo:
      "https://mblogthumb-phinf.pstatic.net/MjAyMDAzMjdfMTc2/MDAxNTg1Mjk5NjEzMTY1.STUOO8GjSdlwrJrF_R4zIzwAqbvecBVdfGQK9pmQGNUg.8fsUNOI1k4wxM6vaJs9CywudKP-EZY6XA7pZatJ16Okg.JPEG.axv1356/1585299613861.jpg?type=w800",
    shopName: "펫살롱뷰티",
    starScore: 4.6,
    starCount: 178,
    address: "경기 수원시 장안구 율전동 101-10",
    businessTime: "10:00-18:00 매주 월요일 휴무",
    skills: "소형견, 중형견, 가위컷전문",
    latitude: 37.2865,
    longitude: 126.9789,
    favorite: 8
  },
  {
    groomerId: 10,
    shopId: 10,
    shopLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfNgZfbMUGfQJPgvdTxUPVuuMzluh_A4IKFW-ddo2vm2Qp_0Obq_j_oD7p-GgykvXkOc&usqp=CAU",
    shopName: "도그스타일",
    starScore: 4.3,
    starCount: 145,
    address: "경기 수원시 팔달구 화서동 111-11",
    businessTime: "09:00-19:00 매주 수요일 휴무",
    skills: "소형견, 중형견, 클리핑",
    latitude: 37.2947,
    longitude: 127.0167,
    favorite: 7
  },
  {
    groomerId: 11,
    shopId: 11,
    shopLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsPrlGlTmKnpDwkz1Lag8HvoHarkYR4UQzBNe2g2eGZDwIc0ClzhZ3UDl5Y8SzT_qp01M&usqp=CAU",
    shopName: "펫미용실",
    starScore: 4.7,
    starCount: 289,
    address: "경기 수원시 영통구 광교동 121-12",
    businessTime: "10:30-19:30 매주 화요일 휴무",
    skills: "소형견, 중형견, 수제간식",
    latitude: 37.2788,
    longitude: 127.0302,
    favorite: 6
  },
  {
    groomerId: 12,
    shopId: 12,
    shopLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBg3SVIsn-KWAXriZjbloltgBfbicaVGAGgR5PRBeyQGouvPRT_wEX6zRWZ-btAReiW-Y&usqp=CAU",
    shopName: "멍멍살롱",
    starScore: 4.5,
    starCount: 201,
    address: "경기 수원시 권선구 금곡동 131-13",
    businessTime: "09:30-18:30 매주 목요일 휴무",
    skills: "소형견, 대형견, 스파서비스",
    latitude: 37.2698,
    longitude: 126.9934,
    favorite: 5
  },
  {
    groomerId: 13,
    shopId: 13,
    shopLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfrTBSm4QA7WFYdURdTi5vdd0HQZ18KdMUf34RkAA4BkpJYY9bTwkQ9RsFsdiwlIvH6A&usqp=CAU",
    shopName: "반려동물미용",
    starScore: 4.4,
    starCount: 167,
    address: "경기 수원시 장안구 연무동 141-14",
    businessTime: "10:00-19:00 매주 수요일 휴무",
    skills: "소형견, 중형견, 특수미용",
    latitude: 37.3015,
    longitude: 127.0082,
    favorite: 4
  },
  {
    groomerId: 14,
    shopId: 14,
    shopLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp4hkpmsiHvGjVv9Ml67ue9bMnwhLkpjudJsnVDOCbx5j1gRjUpz92_lfGl-mb2HZYYPU&usqp=CAU",
    shopName: "펫하우스",
    starScore: 4.8,
    starCount: 345,
    address: "경기 수원시 팔달구 매산동 151-15",
    businessTime: "09:00-20:00 매주 월요일 휴무",
    skills: "전견종, 고양이, 전문미용",
    latitude: 37.2845,
    longitude: 126.9967,
    favorite: 3
  },
  {
    groomerId: 15,
    shopId: 15,
    shopLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZlbPl1Vr9vj51rBNL5e4vLdEK-hO-rG_IYw&s",
    shopName: "강아지천국",
    starScore: 4.6,
    starCount: 223,
    address: "경기 수원시 영통구 이의동 161-16",
    businessTime: "10:00-18:00 매주 일요일 휴무",
    skills: "소형견, 중형견, 트리밍",
    latitude: 37.2932,
    longitude: 127.0248,
    favorite: 2
  },
  {
    groomerId: 16,
    shopId: 16,
    shopLogo: "https://cdn.imweb.me/thumbnail/20230323/0420b4bad17e0.png",
    shopName: "펫살롱클래식",
    starScore: 4.3,
    starCount: 156,
    address: "경기 수원시 권선구 곡선동 171-17",
    businessTime: "09:30-19:30 매주 화요일 휴무",
    skills: "소형견, 중형견, 가위컷전문",
    latitude: 37.2589,
    longitude: 127.0013,
    favorite: 1
  }
];

export const getShopList = async () => {
  try {
    return shopList;
  } catch (error) {
    throw new Error("Failed to fetch shop data");
  }
};

export const getShopDetail = async (shopId) => {
  try {
    return shopDetail;
  } catch (error) {
    throw new Error("Failed to fetch shop data");
  }
};

export const getGroomerShop = async (shopId) => {
  try {
    const shopId = 1;
    const groomerId = 1;
    const response = await axiosInstance.get(`/profile/groomer/shop/${shopId}`, {
      params: { groomerId }
    });

    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch shop data");
  }
};

export const updateGroomerShop = async (data, isUpdate) => {
  const { profileImage, ...jsonData } = data;
  const formData = new FormData();

  delete jsonData.shopId;

  formData.append("requestDto", JSON.stringify(jsonData));
  if (profileImage) {
    formData.append("shopLogo", profileImage);
  }

  const shopId = 1; // Shop ID
  const groomerId = 3; // Groomer ID

  const method = isUpdate ? "put" : "post";
  const endpoint = isUpdate ? `/profile/groomer/shop/${shopId}` : `/profile/groomer/shop`;

  try {
    const response = await axiosInstance({
      method,
      url: endpoint,
      data: formData,
      params: { groomerId }
    });
    console.log("응답 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("API 요청 에러:", error);
    throw error;
  }
};

export const deleteGroomerShop = async (shopId) => {
  try {
    const groomerId = 3;
    const response = await axiosInstance.put(
      `/profile/groomer/shop/${shopId}/delete`,
      {},
      {
        params: { groomerId }
      }
    );

    console.log("매장삭제", response);

    return response.data.data;
  } catch (error) {
    throw new Error("Failed to delete shop data");
  }
};
