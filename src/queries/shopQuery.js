const shopDetail = {
  groomerId: 2,
  shopId: 2,
  shopLogo: "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/매장+로고+이미지/멍브라운.jpg",
  shopName: "멍브라운",
  starScore: 0,
  starCount: 0,
  address: "서울특별시 강남구 선릉로 162길",
  businessTime: "09:00-19:00",
  skills: "애견 미용, 목욕 서비스",
  latitude: 37.523265,
  longitude: 127.033964,
  favorite: 3,
  isFavorite: false,
  description: "10년 경력 수석 미용사가 직접 케어해드립니다.",
  shopImage: null,
  groomerPortfolioImages: [
    "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%AF%B8%EC%9A%A9%EC%82%AC+%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4+%EC%9D%B4%EB%AF%B8%EC%A7%80/5-1.jpg",
    "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%AF%B8%EC%9A%A9%EC%82%AC+%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4+%EC%9D%B4%EB%AF%B8%EC%A7%80/5-2.jpg",
    "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%AF%B8%EC%9A%A9%EC%82%AC+%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4+%EC%9D%B4%EB%AF%B8%EC%A7%80/5-3.jpg",
    "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%AF%B8%EC%9A%A9%EC%82%AC+%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4+%EC%9D%B4%EB%AF%B8%EC%A7%80/5-4.jpg",
    "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%AF%B8%EC%9A%A9%EC%82%AC+%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4+%EC%9D%B4%EB%AF%B8%EC%A7%80/5-5.jpg"
  ],
  groomerUsername: "도리도림",
  groomerProfileImage: "profile2.jpg",
  reviews: []
};

const shopList = [
  {
    groomerId: 2,
    shopId: 2,
    shopLogo: "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/매장+로고+이미지/멍브라운.jpg",
    shopName: "멍브라운",
    starScoreAvg: 0,
    reviewCount: 0,
    address: "서울특별시 강남구 선릉로 162길",
    businessTime: "09:00-19:00",
    skills: "애견 미용, 목욕 서비스",
    latitude: 37.523265,
    longitude: 127.033964,
    favorite: 3
  },
  {
    groomerId: 3,
    shopId: 3,
    shopLogo: "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/매장+로고+이미지/포도독.jpg",
    shopName: "포도독",
    starScoreAvg: 0,
    reviewCount: 0,
    address: "서울특별시 강남구 압구정로 232",
    businessTime: "11:00-21:00",
    skills: "털 다듬기, 위생 미용",
    latitude: 37.538912,
    longitude: 127.049578,
    favorite: 3
  },
  {
    groomerId: 4,
    shopId: 4,
    shopLogo: "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/매장+로고+이미지/두루몽실.jpg",
    shopName: "두루몽실",
    starScoreAvg: 0,
    reviewCount: 0,
    address: "서울특별시 강남구 언주로 123",
    businessTime: "10:30-20:30",
    skills: "전체 미용, 샴푸 서비스",
    latitude: 37.542634,
    longitude: 127.057932,
    favorite: 3
  },
  {
    groomerId: 5,
    shopId: 5,
    shopLogo: "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/매장+로고+이미지/도도한몽이네.jpg",
    shopName: "도도한몽이네",
    starScoreAvg: 0,
    reviewCount: 0,
    address: "서울특별시 강남구 삼성로 456",
    businessTime: "09:30-19:30",
    skills: "발톱 손질, 귀 청소",
    latitude: 37.513189,
    longitude: 127.062276,
    favorite: 2
  }
];

export const getShopList = async () => {
  try {
    return shopList;
    // const response = await axiosInstance.get("/profile/groomer/shop/");
    // return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch shop list data");
  }
};

export const getShopDetail = async (shopId) => {
  const customerId = 14;
  try {
    return shopDetail;
    // const response = await axiosInstance.get("/profile/groomer/shop/detail", {
    //   params: { shopId, customerId }
    // });
    // return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch shop detail data");
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

export const insertGroomerPortfolio = async (images, groomerId) => {
  const formData = new FormData();
  const jsonData = { groomerId: groomerId };
  formData.append("requestDto", JSON.stringify(jsonData));

  images.forEach((image, index) => {
    formData.append(`images`, image);
  });

  try {
    const response = await axiosInstance.put("/profile/groomer/portfolio", formData);
    console.log(response);
  } catch (error) {
    throw new Error("Failed to delete shop data");
  }
};
