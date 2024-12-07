import axiosInstance from "@/api/axiosInstance";

const customerData = [
  {
    message: "메인페이지 조회 성공",
    data: {
      bestReviews: [
        {
          reviewId: 1,
          reviewImage:
            "https://peton.me/data/file/addPlace/%EC%9D%B4%EB%AA%A8%EB%84%A4_%EA%B0%95%EC%95%84%EC%A7%80_37_1.webp",
          shopName: "댕댕뷰티샵",
          content:
            "컷이 이쁘고 청결해서 마음에 들고 청결해서 마음에 들고 왈가 컷이 이쁘고 청결해서 마음에 들고 청결해서 마음에  가 컷이 이쁘고 청결해서 마음에 들고 청결해서 마음에 ",
          starScore: 5.0,
          recommendCount: 54
        },
        {
          reviewId: 2,
          reviewImage:
            "https://mblogthumb-phinf.pstatic.net/MjAyMDAzMjdfMTc2/MDAxNTg1Mjk5NjEzMTY1.STUOO8GjSdlwrJrF_R4zIzwAqbvecBVdfGQK9pmQGNUg.8fsUNOI1k4wxM6vaJs9CywudKP-EZY6XA7pZatJ16Okg.JPEG.axv1356/1585299613861.jpg?type=w800",
          shopName: "펫살롱뷰티",
          content:
            "컷이 이쁘고 청결해서 마음에 들고 청결해서 마음에 들고 왈가 컷이 이쁘고 청결해서 마음에 들고 청결해서 마음에  가 컷이 이쁘고 청결해서 마음에 들고 청결해서 마음에 ",
          starScore: 2.3,
          recommendCount: 25
        }
      ],
      localGroomers: [
        {
          groomerId: 1,
          shopId: 1,
          shopLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4H4xghBFXpveNNXl-tl7oa8TrcSxoOoCIXg&s",
          shopName: "댕댕살롱",
          favorite: 30,
          starScore: 4.8,
          starCount: 30,
          address: "서울시 영등포구 여의대로 15-1",
          businessTime: "10:00-19:00",
          skills: "소형견, 중형견, 비숑"
        },
        {
          groomerId: 2,
          shopId: 2,
          shopLogo:
            "https://dnvefa72aowie.cloudfront.net/origin/smb/202004/3856AB3B68B2F601F9477CA8EFA0CFAD94E26F8F4F7A7A1A4D5BB92795EE40E0.jpg?q=95&s=1440x1440&t=inside",
          shopName: "럭셔리펫",
          favorite: 30,
          starScore: 4.8,
          starCount: 30,
          address: "서울시 영등포구 여의대로 15-1",
          businessTime: "10:00-19:00",
          skills: "소형견, 중형견, 비숑"
        }
      ]
    },
    timestamp: "2024-10-17 00:00:00"
  }
];

const groomerData = [
  // example
  {
    code: 200,
    message: "Get MainGroomer Success",
    data: {
      todayReservation: 1,
      totalDirectRequest: 5,
      todayRequest: 2,
      unsentQuote: 3,
      totalRequest: [
        {
          requestId: 7,
          profileImage: "/profile-user.png",
          nickname: "미용멍당",
          closingDate: "2024-12-03T15:00:00",
          beautyDate: "2024-12-03T15:00:00",
          breed: "비숑",
          dogWeight: "5.6",
          dogGender: "FEMALE",
          requestContent: "(공지) 미용하고 싶어요4"
        },
        {
          requestId: 9,
          profileImage: "/profile-user.png",
          nickname: "미용멍당",
          closingDate: "2024-12-03T15:00:00",
          beautyDate: "2024-12-03T15:00:00",
          breed: "비숑",
          dogWeight: "5.6",
          dogGender: "FEMALE",
          requestContent: "(공지) 미용하고 싶어요6"
        },
        {
          requestId: 6,
          profileImage: "/profile-user.png",
          nickname: "미용멍당",
          closingDate: "2024-11-28T15:00:00",
          beautyDate: "2024-12-03T15:00:00",
          breed: "비숑",
          dogWeight: "5.6",
          dogGender: "FEMALE",
          requestContent: "(공지) 미용하고 싶어요3"
        }
      ]
    },
    timestamp: "2024-12-01T22:47:13.625586"
  }
];

export const getCustomerMain = async () => {
  try {
    const customerId = 1;
    const response = await axiosInstance.get("/main/customer", {
      params: { customerId }
    });
    return response.data.data;
  } catch (error) {
    console.error("고객 정보 등록 실패:", error);
    throw error;
  }
};

export const getGroomerMain = async (id) => {
  try {
    const response = await axiosInstance.get(`/main/groomer/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch customer main data");
  }
};

export const formatDate = (input) => {
  const date = new Date(input);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1 필요
  const day = date.getDate();

  let hours = date.getHours();
  const ampm = hours >= 12 ? "오후" : "오전";
  hours = hours % 12 || 12; // 12시간제로 변환

  return `${year}년 ${month}월 ${day}일 ${ampm} ${hours}시`;
};
