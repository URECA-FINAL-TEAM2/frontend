import { Link } from "react-router-dom";
import { BsShop } from "react-icons/bs";
import { VscSymbolFile } from "react-icons/vsc";

const GroomerList = () => {
  return (
    <div className="border-t-2 border-t-main-200">
      <ul className="mt-6 px-8">
        <Link to="/groomer/mystore">
          <li className="flex items-center border-b-2 border-gray-200 py-4">
            <BsShop className="mr-3" size={20} color="#ff8e8e" />
            <span className="text-lg">매장관리</span>
          </li>
        </Link>
        <Link to="">
          <li className="flex items-center border-b-2 border-gray-200 py-4">
            <VscSymbolFile className="mr-3" size={22} color="#ff8e8e" />
            <span className="text-lg">예약내역</span>
          </li>
        </Link>
        <button className="mx-auto flex py-4 text-sm text-gray-300 underline" onClick={() => console.log("로그아웃")}>
          <li>로그아웃</li>
        </button>
      </ul>
    </div>
  );
};

export default GroomerList;
