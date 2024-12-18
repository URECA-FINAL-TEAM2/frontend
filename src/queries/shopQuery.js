import axiosInstance from "@/api/axiosInstance";

export const getShopList = async (customerId) => {
  try {
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
    const response = await axiosInstance.get("/profile/groomer/shop/detail/groomer", {
      params: { groomerId }
    });
    return response.data.data;
  } catch (error) {
    // 만약 NOT_FOUND 상태인 경우
    if (error.response && error.response.data.status === "NOT_FOUND") {
      // null이나 특정 객체를 반환하여 컴포넌트에서 처리할 수 있도록 함
      return null;
    }
    // 다른 종류의 에러는 throw
    throw error;
  }
};

// 미용사 매장 조회
export const getGroomerShop = async (id) => {
  try {
    const groomerId = id.groomerId;
    const response = await axiosInstance.get(`/profile/groomer/shop`, {
      params: { groomerId }
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch shop data");
  }
};

// 미용사 매장 수정
export const updateGroomerShop = async (id, data, isUpdate) => {
  const groomerId = id.groomerId;
  const { profileImage, shopId, ...jsonData } = data;
  const formData = new FormData();

  formData.append("requestDto", JSON.stringify(jsonData));
  if (profileImage) {
    formData.append("shopLogo", profileImage);
  }

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

export const deleteGroomerShop = async (shopId, id) => {
  try {
    const groomerId = id.groomerId;
    const response = await axiosInstance.put(
      `/profile/groomer/shop/${shopId}/delete`,
      {},
      {
        params: { groomerId }
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error("Failed to delete shop data");
  }
};

// 미용사 포트폴리오 이미지 추가
export const insertGroomerPortfolio = async (images, id) => {
  console.log(images);
  const groomerId = id.groomerId;
  const formData = new FormData();

  const imageUrls = images.filter((image) => typeof image === "string");
  const jsonData = {
    groomerId,
    images: imageUrls
  };
  const jsonBlob = new Blob([JSON.stringify(jsonData)], { type: "application/json" });
  formData.append("requestDto", jsonBlob);

  // 파일 객체만 추출하여 FormData에 추가
  images
    .filter((image) => image instanceof File)
    .forEach((file) => {
      formData.append("images", file);
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
    return response.status;
  } catch (error) {
    console.error("요청 실패:", error);
    return null; // 실패 시 null 반환
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
    return response.status;
  } catch (error) {
    console.error("요청 실패:", error);
    return null; // 실패 시 null 반환
  }
};

export const parseAddress = (fullAddress) => {
  if (!fullAddress || typeof fullAddress !== "string") {
    return { address: "", detailAddress: "" }; // 유효하지 않은 입력 처리
  }

  const [address, ...detailParts] = fullAddress.split(",");
  const detailAddress = detailParts.join(",").trim(); // 배열을 문자열로 합치고 공백 제거

  return {
    address: address.trim(), // 앞뒤 공백 제거
    detailAddress: detailAddress || "" // 상세 주소 없으면 빈 문자열 반환
  };
};
