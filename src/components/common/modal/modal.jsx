import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, onConfirm, children, closeText, confirmText }) => {
    if (!isOpen) return null;

    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="w-[360px] h-[170px] bg-white rounded-lg shadow-md flex flex-col items-center justify-center p-5">
        <div className="mb-5 text-center">{children}</div>
        <div className="flex gap-4">
            <button className="w-[152px] h-[35px] bg-gray-100 rounded-md" onClick={onClose}>{closeText}</button>
            <button className="w-[152px] h-[35px] bg-main-300 text-white rounded-md" onClick={onConfirm}>{confirmText}</button>
        </div>
        </div>
    </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    children: PropTypes.node,
    closeText: PropTypes.string,
    confirmText: PropTypes.string,
};

Modal.defaultProps = {
    children: '모달 내용',
    closeText: '닫기',
    confirmText: '확인',
};

export default Modal;