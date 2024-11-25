import PropTypes from "prop-types";

const ShopBox = ({ shopLogo, shopName, starScore, starCount, address, skill, businessTime }) => {
  return (
    <article className="my-4 flex items-center justify-between rounded-xl bg-white py-2">
      <img src={shopLogo} alt="storeLogo" className="h-[120px] w-[120px] rounded-xl bg-white" />
      <div className="ml-2 grow">
        <div className="text-lg">{shopName}</div>
        <div className="flex text-xs">
          <div>⭐️ {starScore} </div>
          <div> ({starCount})</div>
        </div>
        <div className="py-[0.7px] text-xs">{address}</div>
        <div className="py-[0.7px] text-xs">{skill}</div>
        <div className="py-[0.7px] text-xs">{businessTime}</div>
      </div>
    </article>
  );
};

ShopBox.propTypes = {
  shopLogo: PropTypes.string.isRequired,
  shopName: PropTypes.string.isRequired,
  starScore: PropTypes.number.isRequired,
  starCount: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  skill: PropTypes.string.isRequired,
  businessTime: PropTypes.string.isRequired
};

export default ShopBox;
