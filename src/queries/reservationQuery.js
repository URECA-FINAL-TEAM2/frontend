// import axios from "axios";

const reservationList = [
  {
    selectedQuoteId: 1,
    quoteId: 1,
    profileImage: "test_image.jpg",
    shopName: "미용멍당",
    groomerName: "Test User",
    beautyDate: "2024-12-01T10:00:00",
    dogName: "Test Dog",
    status: "010"
  },
  {
    selectedQuoteId: 2,
    quoteId: 2,
    profileImage: "test_image.jpg",
    shopName: "댕댕",
    groomerName: "Test User",
    beautyDate: "2024-12-01T10:00:00",
    dogName: "Test Dog",
    status: "020"
  },
  {
    selectedQuoteId: 3,
    quoteId: 3,
    profileImage: "test_image.jpg",
    shopName: "왈왈",
    groomerName: "Test User",
    beautyDate: "2024-12-01T10:00:00",
    dogName: "Test Dog",
    status: "030"
  }
];

// 예약 목록 조회 함수
export const getReservationList = async () => {
  try {
    return {
      code: 200,
      message: "고객 예약 목록 조회 성공",
      data: reservationList,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    throw new Error("Failed to fetch reservation data");
  }
};

// export const getReservationList = async () => {
//     try {
//       const response = await axios.get("/api/selected-quotes/customer", {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`, // accessToken 설정
//         },
//       });
//       return response.data;
//     } catch (error) {
//       throw new Error("Failed to fetch reservation data");
//     }
//   };

///////////////////////////////////////////

const reservationDetail = {
  customerName: "Test customer",
  groomerName: "Test groomer",
  shopName: "미용멍당",
  address: "address",
  phone: "010-1234-5678",
  dogName: "Test Dog",
  profileImage: "test_image.jpg",
  dogBreed: "Labrador",
  dogWeight: "20kg",
  dogAge: 3,
  dogGender: "MALE",
  neutering: true,
  experience: true,
  significant: "Friendly dog",
  quoteId: 1,
  beautyDate: "2024-12-01T10:00:00",
  requestContent: "Test Request Content",
  quoteContent: "Test Quote Content",
  requestImage: ["test1.jpg", "test2.jpg", "test3.jpg"],
  cost: 30000
};

// 예약 상세 조회 함수
export const getReservationDetail = async (selectedQuoteId) => {
  try {
    // selectedQuoteId와 매칭
    if (selectedQuoteId === 1) {
      return {
        code: 200,
        message: "예약 상세 조회 성공",
        data: reservationDetail,
        timestamp: new Date().toISOString()
      };
    } else {
      throw new Error("잘못된 예약 아이디입니다.");
    }
  } catch (error) {
    return {
      code: 400,
      message: "잘못된 예약 아이디입니다. 확인 후 다시 시도해주세요."
    };
  }
};

// export const getReservationList = async () => {
//     try {
//       const response = await axios.get("/api/selected-quotes/{selectedQuoteId}", {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`, // accessToken 설정
//         },
//       });
//       return response.data;
//     } catch (error) {
//       throw new Error("Failed to fetch reservation data");
//     }
//   };
