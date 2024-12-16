import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import axiosInstance from "../../api/axiosInstance";
import useAuthStore from "../../store/authStore";
import toast, { Toaster } from "react-hot-toast";
import { useToastStore } from "@/store/toastStore";

function OAuth2RedirectPage() {
  const setToast = useToastStore((state) => state.setToast);
  const navigate = useNavigate();
  const location = useLocation();
  const code = new URL(window.location.href).searchParams.get("code");
  const socialLogin = location.pathname.includes("kakao") ? "kakao" : "google";
  const { updateUserInfoState, updateId, updateDefaultRole, setLoginStatus } = useAuthStore();

  const sendCodeToBackend = async (code) => {
    try {
      const response = await axiosInstance.get(`/login/oauth2/code/${socialLogin}`, {
        params: {
          code: code
        }
      });
      const result = response?.data?.body?.data;
      console.log("추가정보입력 성공 후 로그인,", response);
      localStorage.setItem("accessToken", result?.accessToken);
      setLoginStatus(true);
      const roles = result?.user.roles;
      const customerId = result?.customerId || null;
      const groomerId = result?.groomerId || null;
      const email = result?.email;
      const userName = result?.user.username;
      const nickname = result?.user.nickname;
      const userId = result?.user.id;

      updateUserInfoState({ email: email, userName: userName, nickname: nickname });
      updateId({ customerId: customerId, groomerId: groomerId, userId: userId });

      if (roles.includes("미용사")) {
        updateDefaultRole("groomer");
        setToast(`환영합니다. ${userName} 미용사님!`, "👋🏻");
        navigate("/groomer/home");
      } else {
        updateDefaultRole("customer");
        setToast(`환영합니다. ${userName} 고객님!`, "👋🏻");
        navigate("/customer/home");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        console.error("등록되지 않은 회원입니다. 추가 정보를 입력해주세요.");
        const result = error?.response?.data?.body?.data;
        const accessToken = result?.accessToken;
        const email = result?.email;
        const userName = result?.user.username;
        const userId = result?.user.userId;
        localStorage.setItem("accessToken", accessToken);
        updateUserInfoState({ email: email, userName: userName });
        updateId({ userId: userId });
        navigate("/selectRole", { state: { email: email, userName: userName } });
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
      <Toaster />
    </div>
  );
}

export default OAuth2RedirectPage;
