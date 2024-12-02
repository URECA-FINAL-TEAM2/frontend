import kakaoBtn from "/Main/kakaoBtn.svg";

const KakaoLoginBtn = () => {
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URL;

  // oauth 요청 URL
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  const onKakaoSocialLogin = () => {
    window.location.href = kakaoAuthUrl;
  };

  return (
    <>
      <button onClick={onKakaoSocialLogin}>
        <img src={kakaoBtn} alt="kakao button" className="mx-auto w-11/12" />
      </button>
    </>
  );
};

export default KakaoLoginBtn;
