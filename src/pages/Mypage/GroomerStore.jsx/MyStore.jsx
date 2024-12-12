import { useEffect, useState } from "react";
import SubHeader from "../../../components/common/SubHeader";
import StorePortfolio from "../../../components/Mypage/Store/StorePortfolio";
import { useNavigate } from "react-router-dom";
import { getGroomerShop } from "@/queries/shopQuery";
import useAuthStore from "@/store/authStore";
import EmptyPage from "@/components/common/EmptyPage";
import EditShop from "@/components/Mypage/Store/EditShop";

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
        {storeExists && (
          <div className="fixed top-[--header-height] flex h-10 w-[400px] border-b bg-white">
            <button
              onClick={() => setActiveComponent("info")}
              className={`flex-1 ${activeComponent === "info" ? "border-b-2 border-solid border-main font-semibold text-black" : "text-gray-300 hover:bg-gray-100"} text-[15px] transition-colors`}
            >
              매장 정보
            </button>
            <button
              onClick={() => setActiveComponent("portfolio")}
              className={`flex-1 ${activeComponent === "portfolio" ? "border-b-2 border-solid border-main font-semibold text-black" : "text-gray-300 hover:bg-gray-100"} text-[15px] transition-colors`}
            >
              포트폴리오
            </button>
          </div>
        )}

        {storeExists ? (
          <div className="mt-[70px]">
            <div>
              {activeComponent === "info" && <EditShop shopInfo={shopInfo} id={id} />}
              {activeComponent === "portfolio" && <StorePortfolio portfolioImg={portfolioImg} />}
            </div>

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
