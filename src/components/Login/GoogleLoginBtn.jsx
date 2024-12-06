import { GoogleOAuthProvider } from "@react-oauth/google";
import googleBtn from "/Main/googleBtn.svg";

const GoogleLoginBtn = () => {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URL;

  const handleGoogleLogin = () => {
    const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");

    // URLSearchParams로 파라미터 설정
    googleAuthUrl.search = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: "email profile" // 필요한 권한 설정
    }).toString();

    window.location.href = googleAuthUrl.toString();
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div onClick={handleGoogleLogin} style={{ cursor: "pointer" }}>
        <img src={googleBtn} alt="Login with Google" />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginBtn;
