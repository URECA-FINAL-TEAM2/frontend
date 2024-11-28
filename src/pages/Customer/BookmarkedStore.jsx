import SubHeader from "../../components/common/SubHeader";
import ShopBox from "../../components/Main/ShopBox";
import mockJson from "../../utils/customerHome.json";

const BookmarkedStore = () => {
  return (
    <div className="min-h-screen bg-main-100">
      <SubHeader title={"내 단골샵"} />

      <main className="mx-auto mt-[75px] w-11/12 bg-main-100 pb-24 pt-2">
        {mockJson.data.localGroomers.map((items) => {
          return (
            <ShopBox
              key={items.shopId}
              shopLogo={items.shopLogo}
              shopName={items.shopName}
              starScore={items.starScore}
              starCount={items.starCount}
              address={items.address}
              skill={items.skill}
              businessTime={items.businessTime}
            />
          );
        })}
      </main>
    </div>
  );
};

export default BookmarkedStore;
