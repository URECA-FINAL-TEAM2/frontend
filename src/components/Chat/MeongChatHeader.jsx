import { Link } from "react-router-dom";
import logo from "/Logo/logoBtn.png";
import { VscChevronLeft } from "react-icons/vsc";

const MeongChatHeader = () => {
  return (
    <div className="fixed z-40 flex h-[var(--header-height)] w-[400px] items-center justify-between bg-white px-5">
      <div className="flex items-center">
        <Link to={-1}>
          <VscChevronLeft size={20} />
        </Link>
        <img src={logo} alt="Profile" className="mx-3 h-12 w-12 rounded-full bg-main-300 p-1" />
        <div>
          <h1 className="text-md font-semibold">멍당AI</h1>
          <p className="text-xs text-gray-500">미용멍당 · 이어조</p>
        </div>
      </div>
    </div>
  );
};

export default MeongChatHeader;
