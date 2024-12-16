import { Link } from "react-router-dom";
import { BsShop } from "react-icons/bs";
import Logout from "../Login/Logout";
import { PiImagesSquareLight } from "react-icons/pi";
import { IoCalendarOutline } from "react-icons/io5";

const GroomerList = () => {
  return (
    <div className="mb-24 border-t-2 border-t-main-200">
      <ul className="mt-6 px-8">
        <Link to="/groomer/mystore">
          <li className="flex items-center border-b-2 border-gray-200 py-4">
            <BsShop className="mr-3" size={20} color="#ff8e8e" />
            <span className="text-lg">매장관리</span>
          </li>
        </Link>
        <Link to="/groomer/editportfolio">
          <li className="flex items-center border-b-2 border-gray-200 py-4">
            <PiImagesSquareLight className="mr-3" size={25} color="#ff8e8e" />
            <span className="text-lg">포트폴리오 관리</span>
          </li>
        </Link>
        <Link to="/groomer/reservation">
          <li className="flex items-center border-b-2 border-gray-200 py-4">
            <IoCalendarOutline size={22} className="mr-2" color="#ff8e8e" />
            <span className="text-lg">예약내역</span>
          </li>
        </Link>
        <Logout />
      </ul>
    </div>
  );
};

export default GroomerList;
