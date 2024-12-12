import { useEffect, useState } from "react";
import SubHeader from "../../../components/common/SubHeader";
import DefaultStore from "/Icons/DefaultStoreProfile.svg";
import StoreInfo from "../../../components/Mypage/Store/StoreInfo";
import StorePortfolio from "../../../components/Mypage/Store/StorePortfolio";
import { useNavigate } from "react-router-dom";
import { getGroomerShop } from "@/queries/shopQuery";
import { MdOutlineRateReview } from "react-icons/md";
import { GoHeartFill } from "react-icons/go";
import useAuthStore from "@/store/authStore";
import EmptyPage from "@/components/common/EmptyPage";

const MyStore = () => {
  const { id } = useAuthStore();
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("info");
  const [storeExists, setStoreExists] = useState(true);
  const [shopInfo, setShopInfo] = useState({});
  const [portfolioImg, setPortfolioImg] = useState([]);

  useEffect(() => {
    const getShop = async () => {
      try {
        const response = await getGroomerShop(id);

        setPortfolioImg(response.data.groomerPortfolioImages);
        setShopInfo(response.data);
      } catch (error) {
        setStoreExists(false);
      }
    };
    getShop();
  }, []);

  return (
    <>
      <div>
        <SubHeader title="내 매장" />

        {storeExists ? (
          <div className="mt-[75px]">
            <div className="flex items-center justify-evenly">
              <div className="w-[30%]">
                <img
                  src={shopInfo.shopLogo ? shopInfo.shopLogo : DefaultStore}
                  alt="default store img"
                  className="img-border aspect-square w-full"
                />
              </div>
              <div>
                <p className="flex">
                  <span className="mr-5 flex items-center">
                    <GoHeartFill color="#ff8e8e" className="mr-1" /> 매장 찜
                  </span>
                  <span className="grow text-end text-main">{shopInfo.favoriteCount}</span>
                </p>
                <p className="flex justify-between">
                  <span className="mr-5 flex items-center">
                    <MdOutlineRateReview color="#ff8e8e" className="mr-1" /> 매장 리뷰
                  </span>
                  <span className="text-end text-main">{shopInfo.reviewCount}</span>
                </p>
              </div>
            </div>

            <div className="relative mt-7 flex items-center">
              <button
                onClick={() => setActiveComponent("info")}
                className={`w-1/2 border-b border-b-main px-14 py-2 text-lg ${
                  activeComponent === "info" ? "font-bold text-main" : "text-gray-400"
                } transition duration-300`}
              >
                매장 정보
              </button>

              {/* 중앙에 위치한 선 */}
              <div className="absolute left-1/2 h-1/2 w-[1px] -translate-x-1/2 transform bg-main"></div>

              <button
                onClick={() => setActiveComponent("portfolio")}
                className={`w-1/2 border-b border-b-main px-14 py-2 text-lg ${
                  activeComponent === "portfolio" ? "font-bold text-main" : "text-gray-400"
                } transition duration-300`}
              >
                포트폴리오
              </button>
            </div>

            <div>
              {activeComponent === "info" && <StoreInfo shopInfo={shopInfo} id={id} />}
              {activeComponent === "portfolio" && <StorePortfolio portfolioImg={portfolioImg} />}
            </div>

            {activeComponent === "info" && (
              <button
                onClick={() => navigate("/groomer/createstore", { state: { update: true } })}
                className="bottomButtonPink"
              >
                매장정보 수정
              </button>
            )}
            {activeComponent === "portfolio" && (
              <button
                onClick={() => navigate("/groomer/editportfolio", { state: { portfolioImg: portfolioImg } })}
                className="bottomButtonPink"
              >
                포트폴리오 수정
              </button>
            )}
          </div>
        ) : (
          <div>
            <EmptyPage content={"등록된 매장이 없습니다."} />
            <button
              onClick={() => navigate("/groomer/createstore", { state: { update: false } })}
              className="bottomButtonPink"
            >
              매장 등록하기
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MyStore;
