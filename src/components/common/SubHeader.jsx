import React from "react";
import { VscChevronLeft } from "react-icons/vsc";

const SubHeader = ({ title }) => {
  return (
    <div className="grid h-[75px] grid-cols-3 items-center px-5 text-center">
      <VscChevronLeft size={20} />
      {title}
    </div>
  );
};

export default SubHeader;
