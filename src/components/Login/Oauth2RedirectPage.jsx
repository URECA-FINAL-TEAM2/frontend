import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import axiosInstance from "../../api/axiosInstance";
import useAuthStore from "../../store/authStore";

function OAuth2RedirectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const code = new URL(window.location.href).searchParams.get("code");
  const socialLogin = location.pathname.includes("kakao") ? "kakao" : "google";
  const { updateId, updateDefaultRole } = useAuthStore();

  const sendCodeToBackend = async (code) => {
    try {
      const response = await axiosInstance.get(`/login/oauth2/code/${socialLogin}`, {
        params: {
          code: code
        }
      });
      console.log("추가정보입력 성공 후 로그인,", response);
      localStorage.setItem("accessToken", response.data.body.data.accessToken);
      const role = response.data.body.data.user.roles;
      if (role === "customer") {
        updateId({ customerId: response.data.body.data.user.id });
        updateDefaultRole(role);
        navigate("/customer/home");
      } else {
        updateId({ groomerId: response.data.body.data.user.id });
        updateDefaultRole(role);
        navigate("/groomer/home");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        console.error("등록되지 않은 회원입니다. 추가 정보를 입력해주세요.");
        const accessToken = error.response.data.body.data.accessToken;
        const email = error.response.data.body.data.email;
        const username = error.response.data.body.data.user.username;
        localStorage.setItem("accessToken", accessToken);
        navigate("/selectRole", { state: { email: email, username: username } });
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
