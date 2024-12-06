import { getShopDetail } from "@/queries/shopQuery";
import { useEffect } from "react";
import { GoThumbsup } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MdThumbUpAlt } from "react-icons/md";

import { GoHeartFill } from "react-icons/go";
import { BsFillHandThumbsUpFill } from "react-icons/bs";

const BestReviewBox = ({ reviewImage, shopName, starScore, timestamp, content, recommendCount }) => {
  const navigate = useNavigate();
  const handleShopDetail = () => {
    console.log("매장 상세 페이지로 이동");
    // navigate("/");
  };

  return (
    <button
      onClick={() => handleShopDetail(2)} // 파라미터에 shopId or groomerId
      className="mx-auto flex w-[360px] cursor-pointer items-center gap-3 rounded-[10px] bg-white px-3 py-3"
    >
      <div>
        <img className="mx-0.5 h-[100px] w-[100px] rounded-[10px] object-cover" src={reviewImage}></img>
      </div>
      <div className="ml-2 grow">
        <div className="text-start text-[15px] font-semibold">{shopName}</div>
        <div className="my-[-1px] flex items-center gap-0.5">
          <div className="flex items-center">
            <MdThumbUpAlt className="h-[12px] fill-blue-400" />
            <p className="w-3 text-[12px] font-normal">{recommendCount}</p>
          </div>
          <div className="flex items-center gap-0.5">
            <FaStar className="h-[12px] fill-yellow-400" />
            <p className="w-18 text-[12px] font-normal">{starScore}</p>
          </div>
        </div>
        <div className="h-[30px] w-[180px] overflow-hidden text-ellipsis text-xs">{content}</div>
      </div>
    </button>
  );
};

export default BestReviewBox;
