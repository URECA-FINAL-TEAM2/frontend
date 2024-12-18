import { useNavigate } from "react-router-dom";
import { VscChevronLeft } from "react-icons/vsc";
import PropTypes from "prop-types";

const SubHeader = ({ title, navigate = -1 }) => {
  const routerNavigate = useNavigate();

  const handleBackClick = () => {
    // navigate가 함수라면 실행
    if (typeof navigate === "function") {
      navigate();
    } else {
      routerNavigate(navigate);
    }
  };

  return (
    <div className="fixed top-0 z-30 grid h-[var(--header-height)] w-[400px] grid-cols-[1fr_2fr_1fr] items-center bg-white px-5 text-center">
      <button onClick={handleBackClick}>
        <VscChevronLeft size={20} />
      </button>
      <span className="text-lg">{title}</span>
    </div>
  );
};

SubHeader.propTypes = {
  title: PropTypes.string.isRequired,
  navigate: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func])
};

export default SubHeader;
