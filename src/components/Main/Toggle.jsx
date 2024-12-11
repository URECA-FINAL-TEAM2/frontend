import React from "react";

const Toggle = () => {
  return (
    <>
      <label htmlFor="toggle-example" className="relative flex cursor-pointer items-center">
        <input type="checkbox" id="toggle-example" className="sr-only" />
        <div className="toggle-bg h-6 w-11 rounded-full border-2 border-gray-200 bg-gray-200"></div>
        <span className="ml-3 text-sm font-medium text-gray-900">미용사 전환</span>
      </label>

      <label htmlFor="toggle-example-checked" className="relative flex cursor-pointer items-center">
        <input type="checkbox" id="toggle-example-checked" className="sr-only" checked="" />
        <div className="toggle-bg h-6 w-11 rounded-full border-2 border-gray-200 bg-gray-200"></div>
        <span className="ml-3 text-sm font-medium text-gray-900">고객 전환</span>
      </label>
    </>
  );
};

export default Toggle;
