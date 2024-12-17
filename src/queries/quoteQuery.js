import axiosInstance from "@/api/axiosInstance";

const insertQuote = async (quoteData) => {
  console.log(quoteData);
  try {
    const response = await axiosInstance.post(`/quotes`, quoteData, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    console.error("Error inserting quote:", error);
    throw error;
  }
};

const getQuotesAll = async (customerId) => {
  try {
    const response = await axiosInstance.get("/quotes/requests/my/all", {
      params: {
        customerId: customerId
      }
    });
    return response.data.data;
  } catch (error) {
    console.error("Error inserting quote:", error);
    throw error;
  }
};

const getQuotesGroomer = async (customerId) => {
  // 고객 화면
  try {
    const response = await axiosInstance.get("/quotes/requests/my/groomer", {
      params: {
        customerId: customerId
      }
    });
    return response.data.data;
  } catch (error) {
    console.error("Error inserting quote:", error);
    throw error;
  }
};

const getCustomerQuoteDetail = async (customerId, quotesId) => {
  try {
    const response = await axiosInstance.get(`/quotes/detail/${quotesId}`, {
      params: {
        customerId: customerId
      }
    });
    return response.data.data;
  } catch (error) {
    console.error("Error inserting quote:", error);
    throw error;
  }
};

const getGroomerQuoteDetail = async (groomerId, requestId) => {
  try {
    const response = await axiosInstance.get(`/quotes/groomer/detail/${requestId}/${groomerId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error inserting quote:", error);
    throw error;
  }
};

export { getCustomerQuoteDetail, getGroomerQuoteDetail, getQuotesGroomer, insertQuote, getQuotesAll };
