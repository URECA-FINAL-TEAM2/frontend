import StarRating from "@/utils/StarRating";

const ShopIntro = ({ shopDetail }) => {
  if (!shopDetail) return <div>Loading...</div>;

  return (
    <div className="mb-3 justify-items-center">
      <img className="aspect-[16/9] w-full object-cover" src={shopDetail.shopLogo} alt="Shop" />
      <div className="my-6 flex w-full flex-col items-center">
        <p className="text-[24px] font-bold">{shopDetail.shopName}</p>
        <p className="mx-10 my-1 text-center text-[12px] font-normal text-gray-400">{shopDetail.description}</p>
        <div className="mt-[-2px] flex p-1 text-[18px]">
          <StarRating starScore={Number(shopDetail.starScoreAvg)} />
        </div>
      </div>
    </div>
  );
};

export default ShopIntro;
