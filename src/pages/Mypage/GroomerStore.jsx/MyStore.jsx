import { useEffect, useState } from "react";
import SubHeader from "../../../components/common/SubHeader";
import Summary from "../../../components/common/Summary";
import DefaultStore from "/Icons/DefaultStoreProfile.svg";
import StoreInfo from "../../../components/Mypage/Store/StoreInfo";
import StorePortfolio from "../../../components/Mypage/Store/StorePortfolio";
import NotFoundStore from "./NotFoundStore";
import { useNavigate } from "react-router-dom";
import { getGroomerShop } from "@/queries/shopQuery";

const MyStore = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("info");
  const [storeExists, setStoreExists] = useState(false);
  const [shopInfo, setShopInfo] = useState({});

  useEffect(() => {
    const getShop = async () => {
      const response = await getGroomerShop();
      setShopInfo(response);
    };
    getShop();
  }, []);

  return (
    <>
      <div>
        <SubHeader title="내 매장" />

        {storeExists ? (
          <div className="mt-[75px]">
            <img
              src={shopInfo.shopLogo ? shopInfo.shopLogo : DefaultStore}
              alt="default store img"
              className="img-border mx-auto mb-8 mt-24 aspect-square w-1/3"
            />
            <div className="mx-auto px-6">
              <Summary firstName={"매장 찜 수"} firstValue={40} secondName={"내 매장 리뷰"} secondValue={3} />
            </div>

            <div className="relative mt-14 flex items-center">
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
              {activeComponent === "info" && <StoreInfo shopInfo={shopInfo} />}
              {activeComponent === "portfolio" && <StorePortfolio />}
            </div>

            {activeComponent === "info" && (
              <button
                onClick={() => navigate("/groomer/createstore", { state: { update: true } })}
                className="bottomButtonPink"
              >
                매장정보 수정
              </button>
            )}
            {activeComponent === "portfolio" && <button className="bottomButtonPink">포트폴리오 수정</button>}
          </div>
        ) : (
          <NotFoundStore />
        )}
      </div>
    </>
  );
};

export default MyStore;
