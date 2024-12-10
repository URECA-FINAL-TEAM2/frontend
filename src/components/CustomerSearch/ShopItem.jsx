import { FaStar } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import useShopStore from "../../store/shopStore";
import { useEffect, useState } from "react";

const ShopItem = ({ shopInfo }) => {
  const setSelectedShop = useShopStore((state) => state.setSelectedShop);
  const [favorite, setFavoraite] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    setSelectedShop({ shopId: shopInfo.shopId, latitude: shopInfo.latitude, longitude: shopInfo.longitude });
    navigate(`/customer/shop/${shopInfo.shopId}`);
  };
  useEffect(() => {
    if (location.pathname.includes("bookmarkedStore")) {
      setFavoraite(true);
    }
  }, [location.pathname]);

  return (
    <div className="mx-auto flex w-[360px] cursor-pointer items-center gap-3 rounded-[10px] bg-white px-3 py-3">
      <div onClick={handleClick}>
        <img className="mx-0.5 h-[100px] w-[100px] rounded-[10px] object-cover" src={shopInfo.shopLogo}></img>
      </div>
      <div onClick={handleClick} className="grow">
        <p className="text-[15px] font-semibold">{shopInfo.shopName}</p>

        <div className="my-[-1px] flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            <GoHeartFill className="h-[12px] fill-main" />
            <p className="w-3 text-[12px] font-normal">{shopInfo.favoriteCount}</p>
          </div>
          <div className="flex items-center gap-0.5">
            <FaStar className="h-[12px] fill-yellow-400" />
            <p className="w-18 text-[12px] font-normal">
              {shopInfo.starScoreAvg} ({shopInfo.reviewCount})
            </p>
          </div>
        </div>

        <p className="text-[13px] font-normal">{shopInfo.address}</p>
        <p className="mb-[-4px] mt-[-1px] text-[13px] font-normal text-gray-300">{shopInfo.skills}</p>
        <p className="inline-block rounded-[5px] bg-gray-200 px-1 text-[11px] font-normal">{shopInfo.businessTime}</p>
      </div>
      {favorite && (
        <button onClick={() => console.log("ㅎㅎ")} className="flex flex-col items-center justify-center">
          <GoHeartFill className="h-[20px] fill-main" />
          <span className="text-[10px]">삭제</span>
        </button>
      )}
    </div>
  );
};

export default ShopItem;
