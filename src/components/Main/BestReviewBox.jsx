import PropTypes from "prop-types";
import { GoThumbsup } from "react-icons/go";

const BestReviewBox = ({ shopLogo, shopName, starScore, timestamp, content, recommendCount }) => {
  return (
    <article className="my-4 flex items-center justify-between rounded-xl bg-white py-2">
      <img src={shopLogo} alt="storeLogo" className="h-[120px] w-[120px] rounded-xl bg-white" />
      <div className="ml-2 grow">
        <div className="text-lg">{shopName}</div>
        <div className="flex text-sm">
          <div>⭐️⭐️⭐️⭐️⭐️ {starScore}</div>
          <div>{timestamp}</div>
        </div>
        <div className="h-[50px] w-[180px] overflow-hidden text-ellipsis text-xs">{content}</div>
      </div>
      <div className="mb-12 mr-5 flex flex-col items-center justify-center">
        <GoThumbsup size={20} />
        <span className="mt-1 text-xs">{recommendCount}</span>
      </div>
    </article>
  );
};

BestReviewBox.propTypes = {
  shopLogo: PropTypes.string.isRequired,
  shopName: PropTypes.string.isRequired,
  starScore: PropTypes.number.isRequired,
  timestamp: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  recommendCount: PropTypes.number.isRequired
};

export default BestReviewBox;
