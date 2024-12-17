import React from "react";

const ImageModal = ({ isOpen = false, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 mx-auto flex w-full max-w-[400px] items-center justify-center bg-black bg-opacity-30">
      <div className="relative rounded-lg bg-transparent shadow-md">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 z-20 mb-5 rounded-full bg-gray-200 bg-opacity-50 px-1.5 text-xl font-bold text-white"
        >
          ✕
        </button>

        <div className="flex flex-col items-center justify-between">{children}</div>
      </div>
    </div>
  );
};

export default ImageModal;
