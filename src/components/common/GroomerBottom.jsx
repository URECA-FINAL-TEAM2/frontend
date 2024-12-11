import { PiUserCircleFill } from "react-icons/pi";
import { BsShop } from "react-icons/bs";
import { VscSymbolFile } from "react-icons/vsc";
import { PiChatCircle } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { IoHomeSharp } from "react-icons/io5";
const GroomerBottom = () => {
  const location = useLocation();
  const [active, setActive] = useState("");

  const routes = [
    { path: "/groomer/home", name: "home" },
    { path: "/groomer/quotes", name: "quotes" },
    { path: "/groomer/store", name: "store" },
    { path: "/groomer/chat", name: "chat" },
    { path: "/groomer/mypage", name: "mypage" }
  ];

  // 경로 리스트를 돌면서 현재 URL과 매칭되는 경로 찾기
  useEffect(() => {
    const match = routes.find((route) => location.pathname.includes(route.path));
    setActive(match ? match.name : "/groomer/home");
  }, [location.pathname]);

  return (
    <div className="fixed bottom-0 z-20 h-[var(--bottom-bar-height)] w-[400px] bg-white px-2">
      <div className="grid h-full grid-cols-5 items-center justify-items-center">
        <Link to="/groomer/home">
          <div className={`bottom ${active === "home" && "bottom-active"}`}>
            <IoHomeSharp size={25} />
            <span className="mt-1 text-xs">홈</span>
          </div>
        </Link>
        <Link to="/groomer/quotes">
          <div className={`bottom ${active === "quotes" && "bottom-active"}`}>
            <VscSymbolFile size={25} />
            <span className="mt-1 text-xs">견적 요청</span>
          </div>
        </Link>
        <Link to="/groomer/store">
          <div className={`bottom ${active === "store" && "bottom-active"}`}>
            <BsShop size={25} />
            <span className="mt-1 text-xs">내 매장</span>
          </div>
        </Link>
        <Link to="/groomer/chat">
          <div className={`bottom ${active === "chat" && "bottom-active"}`}>
            <PiChatCircle size={27} />
            <span className="mt-1 text-xs">채팅</span>
          </div>
        </Link>
        <Link to="/groomer/mypage">
          <div className={`bottom ${active === "mypage" && "bottom-active"}`}>
            <PiUserCircleFill size={30} />
            <span className="mt-1 text-xs">마이</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default GroomerBottom;
