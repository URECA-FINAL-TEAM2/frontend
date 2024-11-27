import { Link, useLocation } from "react-router-dom";
import logo from "/Logo/logoHori.svg";
import { VscBell } from "react-icons/vsc";
import { useEffect, useState } from "react";

const Header = () => {
  const location = useLocation();
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (location.pathname.includes("customer")) {
      setUrl("/customer/home");
    } else {
      setUrl("/groomer/home");
    }
  }, [location.pathname]);

  return (
    <div className="fixed flex h-[75px] w-[400px] items-center justify-between bg-white px-5">
      <Link to={url}>
        <img src={logo} alt="logo" className="" />
      </Link>
      <Link to="/notification">
        <VscBell size={28} />
      </Link>
    </div>
  );
};

export default Header;
