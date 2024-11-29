import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import googleBtn from "/Main/googleBtn.svg";
import axiosInstance from "../../api/axiosInstance";

const GoogleLoginBtn = () => {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const GoogleLoginButton = () => {
    const signIn = useGoogleLogin({
      onSuccess: (res) => {
        console.log("access_token 백엔드로 전달", res.access_token);
        axiosInstance
          .post("/login/oauth2/code/google", {
            access_token: res.access_token
          })
          .then((response) => {
            // Cookies.set("accessToken", response.data.token);
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      onError: (error) => {
        console.log(error);
      }
    });

    return (
      <div onClick={() => signIn()}>
        <img src={googleBtn} alt="Login with Google" style={{ cursor: "pointer" }} />
      </div>
    );
  };
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleLoginButton />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginBtn;
