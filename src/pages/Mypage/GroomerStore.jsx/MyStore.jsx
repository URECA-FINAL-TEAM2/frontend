import { useEffect, useState } from "react";
import SubHeader from "../../../components/common/SubHeader";
import StorePortfolio from "../../../components/Mypage/Store/StorePortfolio";
import { useNavigate } from "react-router-dom";
import { getGroomerShop } from "@/queries/shopQuery";
import useAuthStore from "@/store/authStore";
import EmptyPage from "@/components/common/EmptyPage";
import EditShop from "@/components/Mypage/Store/EditShop";
import CreateStore from "./CreateStore";

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
      {storeExists ? (
        <div>
          <SubHeader title="내 매장" />
          <div className="mt-[90px]">
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
        </div>
      ) : (
        <CreateStore />
      )}
    </>
  );
};

export default MyStore;
