import { useEffect } from "react";
import Logo2 from "/Logo/onboardingLogo2.svg";
import line from "/Icons/line.svg";
import Aos from "aos";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-main-300 text-white">
      <div className="flex flex-col items-center justify-center">
        <img
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="500"
          src={Logo2}
          alt="onboardingPage Logo"
          className="w-10/12"
        />
        <div
          className="titleFont mt-1 text-2xl"
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="800"
          data-aos-offset="0"
        >
          반려견 미용을 위한 최적의 장소
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
        <button
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1200"
          className="my-2 w-full rounded-lg bg-white p-3 text-main"
          onClick={() => navigate("/selectRole")}
        >
          카카오톡 로그인 btn{" "}
        </button>
        <button
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1400"
          className="my-2 w-full rounded-lg bg-white p-3 text-main"
          onClick={() => navigate("/selectRole")}
        >
          구글 로그인 btn
        </button>
      </div>
    </div>
  );
};

export default Login;
