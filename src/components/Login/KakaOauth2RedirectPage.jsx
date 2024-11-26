import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import BounceLoader from "react-spinners/BounceLoader";

function KakaoOAuth2RedirectPage() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  const sendCodeToBackend = async (code) => {
    try {
      // GET 요청으로 인가 코드를 쿼리스트링으로 전달
      const response = await axiosInstance.get(`/auth/kakao/login?code=${code}`);

      // 백엔드 연동 후 로직 수정해야 함. -----------------------
      // 1. 백엔드에서 받은 사용자 정보 및 토큰 처리
      const { access_token, role } = response.data;

      // 2. 사용자 정보를 프론트에 저장

      // 3-1. 이미 가입한 회원인지 처음 가입한 회원인지 구분
      // 3-2. 사용자 역할이 고객인지, 미용사인지 구분하여 페이지 이동
      navigate("/selectRole");
    } catch (error) {
      console.error("Error sending code to backend:", error);

      navigate("/selectRole");
    }
  };

  useEffect(() => {
    if (code) {
      sendCodeToBackend(code); // 인가 코드를 백엔드로 전달
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-main-100">
      <BounceLoader color="#FF8E8E" />
      <div className="mt-10 text-xl text-main">로그인 시도중</div>
    </div>
  );
}

export default KakaoOAuth2RedirectPage;
