import React from "react";
import { VscChevronLeft } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";

const SubHeader = ({ title }) => {
  return (
    <div className="grid h-[75px] grid-cols-3 items-center px-5 text-center">
      <Link to={-1}>
        <VscChevronLeft size={20} />
      </Link>
      {title}
    </div>
  );
};

export default SubHeader;
