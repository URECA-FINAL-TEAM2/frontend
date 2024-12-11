import axiosInstance from "@/api/axiosInstance";

// const shopDetail = {
//   groomerId: 2,
//   shopId: 2,
//   shopLogo: "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/매장+로고+이미지/멍브라운.jpg",
//   shopName: "멍브라운",
//   starScoreAvg: 0,
//   starCount: 0,
//   address: "서울특별시 강남구 선릉로 162길",
//   businessTime: "09:00-19:00",
//   skills: "애견 미용, 목욕 서비스",
//   latitude: 37.523265,
//   longitude: 127.033964,
//   favoriteCount: 3,
//   isFavorite: false,
//   description: "10년 경력 수석 미용사가 직접 케어해드립니다.",
//   groomerPortfolioImages: [
//     "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%AF%B8%EC%9A%A9%EC%82%AC+%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4+%EC%9D%B4%EB%AF%B8%EC%A7%80/5-1.jpg",
//     "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%AF%B8%EC%9A%A9%EC%82%AC+%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4+%EC%9D%B4%EB%AF%B8%EC%A7%80/5-2.jpg",
//     "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%AF%B8%EC%9A%A9%EC%82%AC+%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4+%EC%9D%B4%EB%AF%B8%EC%A7%80/5-3.jpg",
//     "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%AF%B8%EC%9A%A9%EC%82%AC+%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4+%EC%9D%B4%EB%AF%B8%EC%A7%80/5-4.jpg",
//     "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%AF%B8%EC%9A%A9%EC%82%AC+%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4+%EC%9D%B4%EB%AF%B8%EC%A7%80/5-5.jpg"
//   ],
//   groomerUsername: "도리도림",
//   groomerProfileImage: "profile2.jpg",
//   reviews: [
//     {
//       reviewId: 0,
//       customerNickname: "string",
//       starScore: 0,
//       content: "string",
//       recommendCount: 0,
//       reviewsImage: ["string"],
//       createdAt: "2024-12-11T05:12:11.773Z",
//       isRecommended: true
//     }
//   ]
// };

const myShopDetail = {
  groomerId: 2,
  shopId: 2,
  shopLogo: "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/매장+로고+이미지/멍브라운.jpg",
  shopName: "멍브라운",
  starScoreAvg: 0,
  starCount: 0,
  address: "서울특별시 강남구 선릉로 162길",
  businessTime: "09:00-19:00",
  skills: "애견 미용, 목욕 서비스",
  latitude: 37.523265,
  longitude: 127.033964,
  favoriteCount: 3,
  // isFavorite: false,
  description: "10년 경력 수석 미용사가 직접 케어해드립니다.",
  groomerPortfolioImages: [
    "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%AF%B8%EC%9A%A9%EC%82%AC+%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4+%EC%9D%B4%EB%AF%B8%EC%A7%80/5-1.jpg",
    "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%AF%B8%EC%9A%A9%EC%82%AC+%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4+%EC%9D%B4%EB%AF%B8%EC%A7%80/5-2.jpg",
    "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%AF%B8%EC%9A%A9%EC%82%AC+%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4+%EC%9D%B4%EB%AF%B8%EC%A7%80/5-3.jpg",
    "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%AF%B8%EC%9A%A9%EC%82%AC+%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4+%EC%9D%B4%EB%AF%B8%EC%A7%80/5-4.jpg",
    "https://s3-beauty-meongdang.s3.ap-northeast-2.amazonaws.com/%EB%AF%B8%EC%9A%A9%EC%82%AC+%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4+%EC%9D%B4%EB%AF%B8%EC%A7%80/5-5.jpg"
  ],
  groomerUsername: "도리도림",
  groomerProfileImage: "profile2.jpg",
  reviews: [
    {
      reviewId: 0,
      customerNickname: "string",
      starScore: 0,
      content: "string",
      recommendCount: 0,
      reviewsImage: ["string"],
      createdAt: "2024-12-11T05:12:11.773Z"
      // isRecommended: true
    }
  ]
};

export const getShopList = async (customerId) => {
  try {
    // return shopList;
    const response = await axiosInstance.get("/profile/groomer/shop/list", {
      params: { customerId }
    });
    return response.data.data.shopLists;
  } catch (error) {
    throw new Error("Failed to fetch shop list data");
  }
};

export const getShopDetail = async (shopId, customerId) => {
  try {
    // return shopDetail;
    const response = await axiosInstance.get("/profile/groomer/shop/detail/customer", {
      params: { shopId, customerId }
    });
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch shop detail data");
  }
};

export const getMyShopDetail = async (groomerId) => {
  try {
    return myShopDetail;
    // const response = await axiosInstance.get("/profile/groomer/shop/detail/groomer", {
    //   params: { groomerId }
    // });
    // return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch shop detail data");
  }
};

// 미용사 매장 조회
export const getGroomerShop = async (shopId) => {
  try {
    const shopId = 20;
    const groomerId = 11;
    const response = await axiosInstance.get(`/profile/groomer/shop/${shopId}`, {
      params: { groomerId }
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch shop data");
  }
};

// 미용사 매장 수정
export const updateGroomerShop = async (data, isUpdate) => {
  const { profileImage, shopId, ...jsonData } = data;
  const formData = new FormData();

  formData.append("requestDto", JSON.stringify(jsonData));
  if (profileImage) {
    formData.append("shopLogo", profileImage);
  }

  const groomerId = 11; // Groomer ID

  const method = isUpdate ? "put" : "post";
  const endpoint = isUpdate ? `/profile/groomer/shop/${shopId}` : `/profile/groomer/shop`;

  try {
    const response = await axiosInstance({
      method,
      url: endpoint,
      data: formData,
      params: { groomerId }
    });
    console.log("미용사 매장 등록/수정:", response.data);
    return response.data;
  } catch (error) {
    console.error("API 요청 에러:", error);
    throw error;
  }
};

export const deleteGroomerShop = async (shopId) => {
  try {
    const groomerId = 11;
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

// 미용사 포트폴리오 이미지 추가
export const insertGroomerPortfolio = async (images, groomerId) => {
  const formData = new FormData();
  const jsonData = { groomerId: 11 };
  formData.append("requestDto", JSON.stringify(jsonData));

  // 이미지 배열 추가
  images.forEach((image) => {
    formData.append("images", image); // 키 이름을 배열 형태로 지정
  });

  try {
    const response = await axiosInstance.put("/profile/groomer/portfolio", formData);
    console.log(response);
  } catch (error) {
    throw new Error("Failed to insert shop data");
  }
};

export const postFavorite = async (customerId, shopId) => {
  try {
    const response = await axiosInstance.post("/profile/groomer/shop/favorite", {
      shopId,
      customerId
    });

    console.log(response.status === 200 ? "요청 성공" : `요청 실패: ${response.status}`);
  } catch (error) {
    console.error("요청 실패:", error);
  }
};

export const deleteFavorite = async (customerId, shopId) => {
  try {
    const response = await axiosInstance.delete("/profile/groomer/shop/favorite", {
      params: {
        customerId,
        shopId
      }
    });

    console.log(response.status === 200 ? "요청 성공" : `요청 실패: ${response.status}`);
  } catch (error) {
    console.error("요청 실패:", error);
  }
};
