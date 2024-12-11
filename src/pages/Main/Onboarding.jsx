import { useEffect, useState } from "react";
import Logo from "/Logo/onboardingLogo.svg";
import Aos from "aos";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const [showLogo, setShowLogo] = useState(true); // 로고 표시 여부 상태
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init();

    // 3초 후 로고 숨기고 페이지 이동
    const timer = setTimeout(() => {
      setShowLogo(false);
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-main-300 text-white">
      {showLogo && (
        <img
          src={Logo}
          alt="logo"
          data-aos="zoom-in"
          data-aos-duration="800"
          className="transition-opacity duration-1000 ease-in-out"
        />
      )}
    </div>
  );
};

export default Onboarding;
