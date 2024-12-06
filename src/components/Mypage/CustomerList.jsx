import { Link } from "react-router-dom";
import { BsShop } from "react-icons/bs";
import { VscSymbolFile } from "react-icons/vsc";
import { MdOutlineRateReview } from "react-icons/md";

const CustomerList = () => {
  return (
    <div>
      <ul className="mb-24 mt-6 px-8">
        <Link to="/customer/bookmarkedStore">
          <li className="flex items-center border-b-2 border-gray-200 py-4">
            <BsShop className="mr-3" size={20} color="#ff8e8e" />
            <span className="text-lg">내 단골샵</span>
          </li>
        </Link>
        <Link to="/customer/reservation">
          <li className="flex items-center border-b-2 border-gray-200 py-4">
            <VscSymbolFile className="mr-3" size={22} color="#ff8e8e" />
            <span className="text-lg">예약내역</span>
          </li>
        </Link>
        <Link to="/customer/myreviews">
          <li className="flex items-center border-b-2 border-gray-200 py-4">
            <MdOutlineRateReview className="mr-3" size={22} color="#ff8e8e" />
            <span className="text-lg">리뷰관리</span>
          </li>
        </Link>
        <button className="mx-auto flex py-4 text-sm text-gray-300 underline" onClick={() => console.log("로그아웃")}>
          <li>로그아웃</li>
        </button>
      </ul>
    </div>
  );
};

export default CustomerList;
