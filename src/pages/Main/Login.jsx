import { useEffect } from "react";
import Logo2 from "/Logo/onboardingLogo2.svg";
import line from "/Icons/line.svg";
import Aos from "aos";
import KakaoLoginBtn from "../../components/Login/KakaoLoginBtn";
import GoogleLoginBtn from "../../components/Login/GoogleLoginBtn";
import TypingEffect from "@/utils/TypingEffect";

const Login = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-main-300 text-white">
      <div className="relative flex flex-col items-center justify-center">
        <img
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="500"
          src={Logo2}
          alt="onboardingPage Logo"
          className="w-[230px]"
        />

        <div
          className="titleFont mt-1 text-2xl"
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
          data-aos-offset="0"
        >
          <TypingEffect text="  반려견 미용을 위한 최적의 장소!" speed={150} delay={2000} />
        </div>
      </div>

      <div className="mt-32">
        <div
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1000"
          className="mb-5 flex items-center justify-center"
        >
          <img src={line} alt="line" />
          <div className="mx-3">SNS 계정으로 로그인</div>
          <img src={line} alt="line" />
        </div>

        <div data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1200">
          <KakaoLoginBtn />
        </div>
        <div className="mx-auto mt-2 w-11/12" data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1400">
          <GoogleLoginBtn />
        </div>
      </div>
    </div>
  );
};

export default Login;
