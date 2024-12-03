import { getShopDetail } from "@/queries/shopQuery";
import { useEffect } from "react";
import { GoThumbsup } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const BestReviewBox = ({ reviewImage, shopName, starScore, timestamp, content, recommendCount }) => {
  const navigate = useNavigate();
  const handleShopDetail = () => {
    console.log("매장 상세 페이지로 이동");
    // navigate("/");
  };

  return (
    <button
      onClick={() => handleShopDetail(2)} // 파라미터에 shopId or groomerId
      className="my-4 flex w-full items-center justify-between rounded-xl bg-white py-2"
    >
      <img src={reviewImage} alt="storeLogo" className="h-[120px] w-[120px] rounded-xl bg-white" />
      <div className="ml-2 grow">
        <div className="flex items-center justify-between text-lg">
          {shopName}
          <div className="mr-4 flex items-center justify-center text-main">
            <GoThumbsup size={15} className="mr-1" />
            <span className="text-[10px]">{recommendCount}</span>
          </div>
        </div>
        <div className="flex items-center text-sm">
          <div className="mr-2">⭐️ {starScore}</div>
          <div className="text-xs">{timestamp}</div>
        </div>
        <div className="h-[30px] w-[180px] overflow-hidden text-ellipsis text-xs">{content}</div>
      </div>
    </button>
  );
};

export default BestReviewBox;
