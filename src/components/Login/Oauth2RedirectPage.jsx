import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BounceLoader from "react-spinners/BounceLoader";
import axiosInstance from "../../api/axiosInstance";
import useAuthStore from "../../store/authStore";

function OAuth2RedirectPage() {
  const { setAccessToken, setUser, setDefaultRole } = useAuthStore();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  const sendCodeToBackend = async (code) => {
    console.log("요청 시도: ", code);
    try {
      const response = await axiosInstance.get(`/login/oauth2/code/kakao`, {
        params: {
          code: code
        }
      });
      console.log(response);
      const { accessToken, role, user } = response.data; // 응답 값

      localStorage.setItem("accessToken", accessToken);
      setUser(user);
      setDefaultRole(role);
      // 그럼 이때 id도 줘야겠네(customerId, groomerId)

      if (role === "customer") {
        navigate("/customer/home");
      } else {
        navigate("/groomer/home");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        console.error("등록되지 않은 회원입니다. 추가 정보를 입력해주세요.");
        const accessToken = error.response.data.body.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        navigate("/selectRole");
      } else {
        console.error("Error sending code to backend:", error);
      }
    }
  };

  useEffect(() => {
    if (code) {
      sendCodeToBackend(code);
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
