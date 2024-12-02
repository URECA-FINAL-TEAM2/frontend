import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, onConfirm, children, closeText, confirmText }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 mx-auto flex w-[400px] items-center justify-center bg-black bg-opacity-30">
      <div className="flex h-[170px] w-[360px] flex-col items-center justify-between rounded-lg bg-white p-5 shadow-md">
        <div></div>
        <div className="mb-3 text-center">{children}</div>
        <div className="flex gap-4">
          <button className="h-[35px] w-[152px] rounded-md bg-gray-100" onClick={onClose}>
            {closeText}
          </button>
          <button className="h-[35px] w-[152px] rounded-md bg-main-300 text-white" onClick={onConfirm}>
            {confirmText}
          </button>
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
  confirmText: PropTypes.string
};

Modal.defaultProps = {
  children: "모달 내용",
  closeText: "닫기",
  confirmText: "확인"
};

export default Modal;
