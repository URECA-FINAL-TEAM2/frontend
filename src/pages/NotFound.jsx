import Lottie from "lottie-react";
import NotFoundAnimation from "./NotFoundAnimation.json";
import SubHeader from "@/components/common/SubHeader";

const NotFound = () => {
  return (
    <div className="my-6 mt-60 flex flex-col items-center">
      <SubHeader title="404 ERROR" />
      <Lottie animationData={NotFoundAnimation} loop style={{ height: "300px", width: "300px" }} />
      <p className="mt-30 text-center text-xl font-bold">잘못된 주소입니다.</p>
    </div>
  );
};

export default NotFound;
