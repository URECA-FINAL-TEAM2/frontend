import PropTypes from "prop-types";
import { GoThumbsup } from "react-icons/go";

const BestReviewBox = ({ reviewImage, shopName, starScore, timestamp, content, recommendCount }) => {
  return (
    <article className="my-4 flex items-center justify-between rounded-xl bg-white py-2">
      <img src={reviewImage} alt="storeLogo" className="h-[120px] w-[120px] rounded-xl bg-white" />
      <div className="ml-2 grow">
        <div className="flex items-center justify-between text-lg">
          {shopName}
          <div className="mr-4 flex items-center justify-center text-main">
            <GoThumbsup size={15} className="mr-1" />
            <span className="text-[10px]">{recommendCount}</span>
          </div>
        </div>
        <div className="flex items-center text-sm">
          <div className="mr-2">⭐️ {starScore}</div>
          <div className="text-xs">{timestamp}</div>
        </div>
        <div className="h-[30px] w-[180px] overflow-hidden text-ellipsis text-xs">{content}</div>
      </div>
    </article>
  );
};

BestReviewBox.propTypes = {
  reviewImage: PropTypes.string.isRequired,
  shopName: PropTypes.string.isRequired,
  starScore: PropTypes.number.isRequired,
  timestamp: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  recommendCount: PropTypes.number.isRequired
};

export default BestReviewBox;
