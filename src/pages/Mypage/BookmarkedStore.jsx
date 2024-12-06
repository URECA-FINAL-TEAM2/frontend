import ShopItem from "@/components/CustomerSearch/ShopItem";
import SubHeader from "../../components/common/SubHeader";
import ShopBox from "../../components/Main/ShopBox";
import mockJson from "../../utils/customerHome.json";

const BookmarkedStore = () => {
  return (
    <div className="min-h-screen">
      <SubHeader title={"내 단골샵"} />

      <main className="mx-auto mt-[75px] w-11/12 pb-24 pt-2">
        {mockJson.data.localGroomers.map((shopInfo) => {
          return <ShopItem key={shopInfo.id} shopInfo={shopInfo} />;
        })}
      </main>
    </div>
  );
};

export default BookmarkedStore;
