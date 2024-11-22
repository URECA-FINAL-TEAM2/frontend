import { VscChevronLeft } from "react-icons/vsc";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SubHeader = ({ title }) => {
  return (
    <div className="grid h-[75px] grid-cols-[1fr_2fr_1fr] items-center px-5 text-center">
      <Link to={-1}>
        <VscChevronLeft size={20} />
      </Link>
      <span className="text-lg">{title}</span>
    </div>
  );
};

SubHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default SubHeader;
