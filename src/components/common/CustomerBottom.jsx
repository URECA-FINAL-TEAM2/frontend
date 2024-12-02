import { PiUserCircleLight } from "react-icons/pi";
import { VscSymbolFile } from "react-icons/vsc";
import { TfiHome } from "react-icons/tfi";
import { PiChatCircle } from "react-icons/pi";
import { TbPawFilled } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const CustomerBottom = () => {
  const location = useLocation();
  const [active, setActive] = useState("");

  const routes = [
    { path: "/customer/home", name: "home" },
    { path: "/customer/docs", name: "docs" },
    { path: "/customer/search", name: "search" },
    { path: "/customer/chat", name: "chat" },
    { path: "/customer/mypage", name: "mypage" }
  ];

  // 경로 리스트를 돌면서 현재 URL과 매칭되는 경로 찾기
  useEffect(() => {
    const match = routes.find((route) => location.pathname.includes(route.path));
    setActive(match ? match.name : "/customer/home");
  }, [location.pathname]);

  return (
    <div className="fixed bottom-0 h-[var(--bottom-bar-height)] w-[400px] bg-white px-2">
      <div className="grid h-full grid-cols-5 items-center justify-items-center">
        <Link to="/customer/home">
          <div className={`bottom ${active === "home" && "bottom-active"}`}>
            <TfiHome size={25} />
            <span className="mt-1 text-xs">홈</span>
          </div>
        </Link>
        <Link to="/customer/docs">
          <div className={`bottom ${active === "docs" && "bottom-active"}`}>
            <VscSymbolFile size={25} />
            <span className="mt-1 text-xs">견적서</span>
          </div>
        </Link>
        <Link to="/customer/search">
          <div className={`bottom ${active === "search" && "bottom-active"}`}>
            <TbPawFilled size={30} />
            <span className="mt-1 text-xs">미용사 찾기</span>
          </div>
        </Link>
        <Link to="/customer/chat">
          <div className={`bottom ${active === "chat" && "bottom-active"}`}>
            <PiChatCircle size={27} />
            <span className="mt-1 text-xs">채팅</span>
          </div>
        </Link>
        <Link to="/customer/mypage">
          <div className={`bottom ${active === "mypage" && "bottom-active"}`}>
            <PiUserCircleLight size={30} />
            <span className="mt-1 text-xs">마이</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CustomerBottom;
