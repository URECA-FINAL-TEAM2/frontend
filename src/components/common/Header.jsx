import logo from "/Logo/logoHori.svg";
import { VscBell } from "react-icons/vsc";

const Header = () => {
  return (
    <div className="flex h-[75px] items-center justify-between bg-white px-5">
      <img src={logo} alt="logo" className="" />
      <VscBell size={28} />
    </div>
  );
};

export default Header;
