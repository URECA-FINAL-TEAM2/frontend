import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MdThumbUpAlt } from "react-icons/md";

const BestReviewBox = ({ bestReview }) => {
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
        <img className="mx-0.5 h-[100px] w-[100px] rounded-[10px] object-cover" src={bestReview.reviewImage}></img>
      </div>
      <div className="ml-2 grow">
        <div className="text-start text-[15px] font-semibold">{bestReview.shopName}</div>
        <div className="my-[-1px] flex items-center gap-0.5">
          <div className="flex items-center">
            <MdThumbUpAlt className="h-[12px] fill-blue-400" />
            <p className="w-3 text-[12px] font-normal">{bestReview.recommendCount}</p>
          </div>
          <div className="flex items-center gap-0.5">
            <FaStar className="h-[12px] fill-yellow-400" />
            <p className="w-18 text-[12px] font-normal">{bestReview.starScore}</p>
          </div>
        </div>
        <div className="my-[-1px] flex items-center gap-0.5">
          <p className="w-18 text-[12px] font-normal text-gray-300">{bestReview.createdAt}</p>
        </div>
        <div className="h-[30px] w-[180px] overflow-hidden text-ellipsis text-start text-xs">{bestReview.content}</div>
      </div>
    </button>
  );
};

export default BestReviewBox;
