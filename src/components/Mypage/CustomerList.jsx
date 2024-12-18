import { Link } from "react-router-dom";
import { BsShop } from "react-icons/bs";
import { MdOutlineRateReview } from "react-icons/md";
import Logout from "../Login/Logout";
import { IoCalendarOutline } from "react-icons/io5";

const CustomerList = () => {
  return (
    <div>
      <ul className="mb-24 px-8">
        <Link to="/customer/bookmarkedStore">
          <li className="flex items-center border-b-2 border-gray-200 py-4">
            <BsShop className="mr-3" size={20} color="#ff8e8e" />
            <span className="text-lg">내 단골샵</span>
          </li>
        </Link>
        <Link to="/customer/reservation">
          <li className="flex items-center border-b-2 border-gray-200 py-4">
            <IoCalendarOutline size={22} className="mr-3" color="#ff8e8e" />
            <span className="text-lg">예약내역</span>
          </li>
        </Link>
        <Link to="/customer/myreviews">
          <li className="flex items-center border-b-2 border-gray-200 py-4">
            <MdOutlineRateReview className="mr-3" size={22} color="#ff8e8e" />
            <span className="text-lg">리뷰관리</span>
          </li>
        </Link>
        <Logout />
      </ul>
    </div>
  );
};

export default CustomerList;
