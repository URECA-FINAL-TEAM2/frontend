import { useLocation, useNavigate } from "react-router-dom";
import Aos from "aos";
import { useEffect } from "react";
import { GoArrowRight } from "react-icons/go";

const SelectRole2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, username } = location.state || {};

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-main-300 text-white">
      <div className="w-10/12 text-start">
        <div data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="1000" className="mb-2 text-2xl">
          가입 유형을
          <br />
          선택해 주세요.
        </div>

        {/* <Typed strings={["환영합니다."]} /> */}
      </div>

      <div className="flex w-full flex-col">
        <button
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
          onClick={() => navigate("/infoRequired", { state: { role: "customer", email: email, username: username } })}
          className="hover:scale-102 mx-5 my-2 rounded-xl bg-white p-4 text-start hover:border hover:border-main hover:shadow-2xl"
        >
          <div className="mb-1 mt-1 flex items-center justify-between text-xl font-bold text-black">
            고객
            <GoArrowRight />
          </div>
          <div className="text-sm text-black">
            반려견 정보를 등록하고 맞춤 미용 견적을 받아보세요.
            <br /> 쉽고 합리적인 서비스를 이용할 수 있습니다! 😊
          </div>
        </button>
        <button
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="3000"
          onClick={() => navigate("/infoRequired", { state: { role: "groomer", email: email, username: username } })}
          className="hover:scale-102 mx-5 my-2 rounded-xl bg-white p-4 text-start hover:border hover:border-main hover:shadow-2xl"
        >
          <div className="mb-1 mt-1 flex items-center justify-between text-xl font-bold text-black">
            미용사
            <GoArrowRight />
          </div>
          <div className="text-sm text-black">
            프로필로 전문성을 어필하고 맞춤 견적을 제공하세요. <br />
            고객과 소통하며 신뢰를 쌓아보세요! 🙌
          </div>
        </button>
      </div>
    </div>
  );
};

export default SelectRole2;
