import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type, onClick, children }) => {

    const buttonStyle = type === 'lightPink' ? 
    'bg-main-200 text-main-400 hover:bg-main-100' : 
    'bg-main-400 text-white hover:bg-main-300';

    return (
    <button
        onClick={onClick}
        className={`w-[165px] h-[33px] rounded-[10px] text-[15px] 
        flex items-center justify-center 
        focus:outline-none 
        hover:ring-0 hover:outline-none 
        transition-all duration-300 ease-in-out 
        hover:shadow-md hover:scale-103
        ${buttonStyle}`}>
        {children}
    </button>
    );
};

Button.propTypes = {
    type: PropTypes.oneOf(['lightPink', 'pink']).isRequired,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
};

Button.defaultProps = {
    onClick: () => {},
};

export default Button;
