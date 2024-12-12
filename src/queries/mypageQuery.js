import axiosInstance from "@/api/axiosInstance";

export const getUserMypage = async (role, id) => {
  console.log("요청", role, id);
  const endpoint = role === "customer" ? `/mypage/customer/${id.customerId}` : `/mypage/groomer/${id.groomerId}`;

  try {
    const response = await axiosInstance.get(endpoint);
    console.log(response);
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch customer mypage data");
  }
};
