import PropTypes from "prop-types";

const Button = ({ styleType, onClick = () => {}, children }) => {
  const buttonStyle =
    styleType === "lightPink"
      ? "bg-main-200 text-main-400 hover:bg-main-100"
      : "bg-main-400 text-white hover:bg-main-300";

  return (
    <button
      onClick={onClick}
      className={`hover:scale-103 flex h-[33px] w-[165px] items-center justify-center rounded-[10px] text-[15px] transition-all duration-300 ease-in-out hover:shadow-md hover:outline-none hover:ring-0 focus:outline-none ${buttonStyle}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  styleType: PropTypes.oneOf(["lightPink", "pink"]).isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
};

export default Button;
