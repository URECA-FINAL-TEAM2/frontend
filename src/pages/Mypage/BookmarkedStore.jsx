import ShopItem from "@/components/CustomerSearch/ShopItem";
import SubHeader from "../../components/common/SubHeader";
import { useEffect, useState } from "react";
import { getFavoriteShop } from "@/queries/userQuery";
import useAuthStore from "@/store/authStore";
import EmptyPage from "@/components/common/EmptyPage";

const BookmarkedStore = () => {
  const { id } = useAuthStore();
  const [shopInfo, setShopInfo] = useState([]);

  useEffect(() => {
    const getShop = async () => {
      const response = await getFavoriteShop(id);
      console.log("내단골샵", response);
      setShopInfo(response);
    };
    getShop();
  }, []);

  return (
    <div className="min-h-screen">
      <SubHeader title={"내 단골샵"} />

      {shopInfo.length ? (
        <main className="mx-auto mt-[75px] w-11/12 pb-24 pt-2">
          {shopInfo.map((Info) => {
            return <ShopItem key={Info.shopId} shopInfo={Info} />;
          })}
        </main>
      ) : (
        <EmptyPage content={"찜한 매장이 없습니다."} />
      )}
    </div>
  );
};

export default BookmarkedStore;
