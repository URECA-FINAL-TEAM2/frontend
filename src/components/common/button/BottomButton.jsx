import PropTypes from "prop-types";

const BottomButton = ({ styleType, onClick = () => {}, children }) => {
  const buttonStyle =
    styleType === "lightPink"
      ? "bg-main-200 text-main-400 hover:bg-main-100"
      : "bg-main-400 text-white hover:bg-main-300";

  return (
    <button
      onClick={onClick}
      className={`hover:scale-103 fixed bottom-0 flex h-[60px] w-[400px] items-center justify-center rounded-t-[10px] text-[20px] transition-all duration-300 ease-in-out hover:shadow-md ${buttonStyle}`}
    >
      {children}
    </button>
  );
};

BottomButton.propTypes = {
  styleType: PropTypes.oneOf(["lightPink", "pink"]).isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
};

export default BottomButton;
