import { Link } from "react-router-dom";
import line from "/Icons/groomerGrayVerticalLine.svg";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Summary = ({ firstName, firstValue, secondName, secondValue, thirdName, thirdValue, navigate }) => {
  const [half, setHalf] = useState(false);

  useEffect(() => {
    if (thirdName == undefined) {
      setHalf(true);
    }
  }, []);

  return (
    // <article className="mx-auto px-6">
    <article>
      <Link to={navigate} className="justify my-4 flex items-center justify-around text-center">
        <div className={`flex ${half ? "w-1/2" : "w-1/3"} flex-col`}>
          <span className="text-main">{firstValue}</span>
          <span className="text-sm text-gray-300">{firstName}</span>
        </div>
        <img src={line} alt="grayLine" />
        <div className={`flex ${half ? "w-1/2" : "w-1/3"} flex-col`}>
          <span className="text-main">{secondValue}</span>
          <span className="text-sm text-gray-300">{secondName}</span>
        </div>
        {!half && (
          <>
            <img src={line} alt="grayLine" />
            <div className={`flex ${thirdName === undefined ? "w-1/2" : "w-1/3"} flex-col`}>
              <span className="text-main">{thirdValue}</span>
              <span className="text-sm text-gray-300">{thirdName}</span>
            </div>
          </>
        )}
      </Link>
    </article>
  );
};

Summary.propTypes = {
  firstName: PropTypes.string.isRequired,
  firstValue: PropTypes.number.isRequired,
  secondName: PropTypes.string.isRequired,
  secondValue: PropTypes.number.isRequired,
  thirdName: PropTypes.string,
  thirdValue: PropTypes.number,
  navigate: PropTypes.number
};

export default Summary;
