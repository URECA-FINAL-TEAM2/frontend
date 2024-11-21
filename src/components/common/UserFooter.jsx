import { PiUserCircleLight } from "react-icons/pi";
import { VscSymbolFile } from "react-icons/vsc";
import { TfiHome } from "react-icons/tfi";
import { PiChatCircle } from "react-icons/pi";
import { TbPawFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

const UserFooter = () => {
  return (
    <div className="fixed bottom-0 h-[75px] w-[400px] bg-white px-2">
      <div className="grid h-full grid-cols-5 items-center justify-items-center">
        <Link to="/">
          <div className="footer">
            <TfiHome size={25} />
            <span className="mt-1 text-xs">홈</span>
          </div>
        </Link>
        <Link to="/">
          <div className="footer">
            <VscSymbolFile size={25} />
            <span className="mt-1 text-xs">견적서</span>
          </div>
        </Link>
        <Link to="/">
          <div className="footer">
            <TbPawFilled size={30} />
            <span className="mt-1 text-xs">미용사 찾기</span>
          </div>{" "}
        </Link>
        <Link to="/">
          <div className="footer">
            <PiChatCircle size={27} />
            <span className="mt-1 text-xs">채팅</span>
          </div>{" "}
        </Link>
        <Link to="/">
          <div className="footer">
            <PiUserCircleLight size={30} />
            <span className="mt-1 text-xs">마이</span>
          </div>{" "}
        </Link>
      </div>
    </div>
  );
};

export default UserFooter;
