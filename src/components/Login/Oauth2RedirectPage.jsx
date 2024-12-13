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
  const { updateUserInfo, updateId, updateDefaultRole, setLoginStatus } = useAuthStore();

  const sendCodeToBackend = async (code) => {
    try {
      const response = await axiosInstance.get(`/login/oauth2/code/${socialLogin}`, {
        params: {
          code: code
        }
      });
      console.log("추가정보입력 성공 후 로그인,", response);
      localStorage.setItem("accessToken", response.data.body.data.accessToken);
      setLoginStatus(true);
      const roles = response.data.body.data.user.roles;
      const customerId = response.data.body.data?.customerId || null;
      const groomerId = response.data.body.data?.groomerId || null;
      const email = response.data.body.data.email;
      const username = response.data.body.data.user.username;
      const nickName = response.data.body.data.user.nickname;
      const userId = response.data.body.data.user.id;

      updateUserInfo({ email: email, username: username, nickName: nickName });
      updateId({ customerId: customerId, groomerId: groomerId, userId: userId });

      if (roles.includes("미용사")) {
        updateDefaultRole("groomer");
        navigate("/groomer/home");
      } else {
        updateDefaultRole("customer");
        navigate("/customer/home");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        console.error("등록되지 않은 회원입니다. 추가 정보를 입력해주세요.");
        const accessToken = error.response.data.body.data.accessToken;
        const email = error.response.data.body.data.email;
        const username = error.response.data.body.data.user.username;
        const userId = error.response.data.body.data.user.userId;
        localStorage.setItem("accessToken", accessToken);
        updateUserInfo({ email: email, username: username });
        updateId({ userId: userId });
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
