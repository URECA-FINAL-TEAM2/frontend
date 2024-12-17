import { VscChevronLeft } from "react-icons/vsc";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SubHeader = ({ title, navigate = -1 }) => {
  return (
    // <div className="fixed flex h-[var(--header-height)] w-[400px] items-center justify-between bg-white px-5">
    <div className="fixed top-0 z-30 grid h-[var(--header-height)] w-[400px] grid-cols-[1fr_2fr_1fr] items-center bg-white px-5 text-center">
      <Link to={navigate}>
        <VscChevronLeft size={20} />
      </Link>
      <span className="text-lg">{title}</span>
    </div>
  );
};

SubHeader.propTypes = {
  title: PropTypes.string.isRequired,
  navigate: PropTypes.string
};

export default SubHeader;
