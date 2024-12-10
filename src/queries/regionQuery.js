// regionQuery.js

import axiosInstance from "@/api/axiosInstance";

const getSidoList = async () => {
  try {
    const response = await axiosInstance.get("/addresses");
    return response.data.data.sidoList;
  } catch (error) {
    throw new Error("Failed to fetch sido data");
  }
};

const getSigunguList = async (sidoId) => {
  try {
    const response = await axiosInstance.get(`/addresses/${sidoId}`);
    return response.data.data.sigunguList;
  } catch (error) {
    throw new Error("Failed to fetch sigungu data");
  }
};

export { getSidoList, getSigunguList };
