import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BounceLoader from "react-spinners/BounceLoader";
import axios from "axios";

function OAuth2RedirectPage() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    console.log(code);
  }, [code]);

  const sendCodeToBackend = async (code) => {
    console.log("요청 시도");
    try {
      // GET 요청으로 인가 코드를 쿼리스트링으로 전달
      // const response = await axiosInstance.get(`/auth/kakao/login?code=${code}`);
      const response = await axios.get(`https://beautymeongdang.duckdns.org/oauth/kakao/login?code=${code}`);
      console.log(response);
      // 백엔드 연동 후 로직 수정해야 함. -----------------------
      // 1. 백엔드에서 받은 사용자 정보 및 토큰 처리
      const { access_token, role, isRegistered } = response.data;

      // 2. 사용자 정보를 프론트에 저장

      // 3-1. 이미 가입한 회원인지 처음 가입한 회원인지 구분
      // 3-2. 사용자 역할이 고객인지, 미용사인지 구분하여 페이지 이동
      navigate("/selectRole");
    } catch (error) {
      console.error("Error sending code to backend:", error);
    }
  };

  useEffect(() => {
    if (code) {
      // 백엔드에 인가코드 전달하는
      sendCodeToBackend();
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-main-100">
      <BounceLoader color="#FF8E8E" />
      <div className="mt-10 text-xl text-main">로그인 시도중</div>
    </div>
  );
}

export default OAuth2RedirectPage;
