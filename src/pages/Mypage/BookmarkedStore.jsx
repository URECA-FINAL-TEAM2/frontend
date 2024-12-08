import ShopItem from "@/components/CustomerSearch/ShopItem";
import SubHeader from "../../components/common/SubHeader";
import ShopBox from "../../components/Main/ShopBox";
import mockJson from "../../utils/customerHome.json";
import { useEffect, useState } from "react";
import { getFavoriteShop } from "@/queries/userQuery";

const BookmarkedStore = () => {
  const [shopInfo, setShopInfo] = useState([]);

  useEffect(() => {
    const getShop = async () => {
      const response = await getFavoriteShop();
      console.log("내단골샵", response);
      setShopInfo(response);
    };
    getShop();
  }, []);

  return (
    <div className="min-h-screen">
      <SubHeader title={"내 단골샵"} />

      <main className="mx-auto mt-[75px] w-11/12 pb-24 pt-2">
        {shopInfo.map((Info) => {
          return <ShopItem key={Info.shopId} shopInfo={Info} />;
        })}
      </main>
    </div>
  );
};

export default BookmarkedStore;
