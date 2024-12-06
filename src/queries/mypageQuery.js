const customerData = [
  // 고객일 때
  {
    message: "Get Customer MyPage Success",
    data: {
      customerId: "1",
      nickname: "홍길동",
      email: "email@kakao.com",
      phoneNumber: "010-1111-1111",
      profileImage: "https://example.com/profile.jpg",
      counts: {
        completedServices: 10, // 미용완료 건수
        confirmedReservations: 5, // 확정된 예약 건수
        myReviews: 25 // 내 매장 리뷰 수
      },
      MyPet: {
        dogId: "1",
        dogname: "멍당이",
        profileImage: "https://example.com/profile.jpg"
      }
    },
    timestamp: "2024-10-17 00:00:00"
  }
];

const groomerData = [
  // 미용사일 때
  {
    message: "Get Goomer MyPage Success",
    data: {
      GroomerId: "1",
      nickname: "묭묭사",
      email: "email@kakao.com",
      phoneNumber: "010-1111-1111",
      profileImage: "https://example.com/profile.jpg",
      counts: {
        completedServices: 120, // 미용완료 건수
        confirmedReservations: 5, // 확정된 예약 건수
        myReviews: 252 // 내 매장 리뷰 수
      }
    },
    timestamp: "2024-10-17 00:00:00"
  }
];

export const getCustomerMypage = async () => {
  try {
    return customerData;
  } catch (error) {
    throw new Error("Failed to fetch customer mypage data");
  }
};

export const getGroomerMypage = async () => {
  try {
    return groomerData;
  } catch (error) {
    throw new Error("Failed to fetch customer mypage data");
  }
};
