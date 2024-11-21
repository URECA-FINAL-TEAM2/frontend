import React from 'react';
import PropTypes from 'prop-types';

const BottomButton = ({ type, onClick, children }) => {

    const buttonStyle = type === 'lightPink' ? 
    'bg-main-200 text-main-400 hover:bg-main-100' :
    'bg-main-400 text-white hover:bg-main-300';

    return (
    <button
        onClick={onClick}
        className={`fixed bottom-0
            text-[20px] flex justify-center 
            w-[400px] h-[60px] rounded-t-[10px] 
            flex items-center justify-center
            transition-all duration-300 ease-in-out 
            hover:shadow-md hover:scale-103
            ${buttonStyle}`}>
        {children}
    </button>
    );
};

BottomButton.propTypes = {
    type: PropTypes.oneOf(['lightPink', 'pink']).isRequired,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
};

BottomButton.defaultProps = {
    onClick: () => {},
};


export default BottomButton;