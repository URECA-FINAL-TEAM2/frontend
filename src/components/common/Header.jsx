import { Link, useLocation } from "react-router-dom";
import logo from "/Logo/logoHori.svg";
import { useEffect, useState } from "react";
import NotiComponents from "../Main/NotiComponents";

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
    <div className="fixed z-40 flex h-[var(--header-height)] w-[400px] items-center justify-between bg-white px-5">
      <Link to={url}>
        <img src={logo} alt="logo" className="" />
      </Link>
      <NotiComponents />
    </div>
  );
};

export default Header;
