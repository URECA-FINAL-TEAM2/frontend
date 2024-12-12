import React from "react";

const ImageModal = ({ isOpen = false, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative rounded-lg bg-white shadow-md">
        <button onClick={onClose} className="absolute right-3 top-3 z-20 mb-5 text-xl font-bold text-gray-600">
          ✕
        </button>

        <div className="flex flex-col items-center justify-between">{children}</div>
      </div>
    </div>
  );
};

export default ImageModal;
