import { Link } from "react-router-dom";
import line from "/Icons/groomerGrayVerticalLine.svg";
import PropTypes from "prop-types";

const Summary = ({ firstName, firstValue, secondName, secondValue, thirdName, thirdValue, navigate }) => {
  return (
    // <article className="mx-auto px-6">
    <article>
      <Link to={navigate} className="justify my-4 flex items-center justify-around text-center">
        <div className="flex w-[33%] flex-col">
          <span>{firstValue}</span>
          <span className="text-sm text-gray-300">{firstName}</span>
        </div>
        <img src={line} alt="grayLine" />
        <div className="flex w-[33%] flex-col">
          <span>{secondValue}</span>
          <span className="text-sm text-gray-300">{secondName}</span>
        </div>
        <img src={line} alt="grayLine" />
        <div className="flex w-[33%] flex-col">
          <span>{thirdValue}</span>
          <span className="text-sm text-gray-300">{thirdName}</span>
        </div>
      </Link>
    </article>
  );
};

Summary.propTypes = {
  firstName: PropTypes.string.isRequired,
  firstValue: PropTypes.number.isRequired,
  secondName: PropTypes.string.isRequired,
  secondValue: PropTypes.number.isRequired,
  thirdName: PropTypes.string.isRequired,
  thirdValue: PropTypes.number.isRequired,
  navigate: PropTypes.number
};

export default Summary;
