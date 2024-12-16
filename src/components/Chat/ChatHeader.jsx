import { Link } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { VscChevronLeft } from "react-icons/vsc";

const ChatHeader = ({ headerData }) => {
  return (
    <div className="fixed z-40 flex h-[var(--header-height)] w-[400px] items-center justify-between bg-white px-5">
      <div className="flex items-center">
        <Link to={-1}>
          <VscChevronLeft size={20} />
        </Link>
        <img src={headerData.profileImage} alt="Profile" className="mx-3 h-12 w-12 rounded-full" />
        <div>
          <h1 className="text-md font-semibold">{headerData.groomerName}</h1>
          <p className="text-xs text-gray-500">
            {headerData.shopName} · {headerData.shopAddress}
          </p>
        </div>
      </div>
      <button className="flex flex-col items-center">
        <IoIosHome size={25} color="#ff8e8e" />
        <span className="text-[10px]">매장보기</span>
      </button>
    </div>
  );
};

export default ChatHeader;
