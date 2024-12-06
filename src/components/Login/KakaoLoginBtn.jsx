import kakaoBtn from "/Main/kakaoBtn.svg";

const KakaoLoginBtn = () => {
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URL;

  const handleKakaoLogin = () => {
    const kakaoAuthUrl = new URL("https://kauth.kakao.com/oauth/authorize");

    // URLSearchParams로 파라미터 설정
    kakaoAuthUrl.search = new URLSearchParams({
      client_id: KAKAO_REST_API_KEY,
      redirect_uri: KAKAO_REDIRECT_URI,
      response_type: "code"
    }).toString();

    // 생성된 URL을 브라우저로 리디렉션
    window.location.href = kakaoAuthUrl.toString();
  };

  return (
    <button onClick={handleKakaoLogin} className="w-full">
      <img src={kakaoBtn} alt="카카오 로그인" className="mx-auto w-11/12" />
    </button>
  );
};

export default KakaoLoginBtn;
