import React, { useState } from "react";

const ToggleButton = () => {
  const [isOn, setisOn] = useState(false);

  const toggleHandler = () => {
    setisOn(!isOn);
  };

  return (
    <div className="relative cursor-pointer" onClick={toggleHandler}>
      {/* Toggle Container */}
      <div className={`h-5 w-12 rounded-full ${isOn ? "bg-main-400" : "bg-main-300"} transition-colors duration-500`} />
      {/* Toggle Circle */}
      <div
        className={`absolute left-1 top-0 h-5 w-7 rounded-full bg-white transition-all duration-500 ${isOn ? "left-6" : "left-0"}`}
      />
    </div>
  );
};

export default ToggleButton;
