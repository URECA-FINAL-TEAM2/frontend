import { Link, useNavigate } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { VscChevronLeft } from "react-icons/vsc";
import { useEffect, useState } from "react";

const ChatHeader = ({ addressLink, DefaultRole, shopInfo, groomerInfo, customerInfo }) => {
  const [data, setData] = useState({
    image: "",
    name: "",
    address: "",
    shopName: "",
    shopId: ""
  });

  useEffect(() => {
    if (DefaultRole === "customer") {
      setData({
        image: groomerInfo?.groomerProfileImage,
        name: groomerInfo?.groomerName,
        address: addressLink,
        shopName: shopInfo?.shopName,
        shopId: shopInfo?.shopId
      });
    } else if (DefaultRole === "groomer") {
      setData({
        image: customerInfo?.customerProfileImage,
        name: customerInfo?.customerName,
        address: customerInfo?.address
      });
    }
  }, [DefaultRole, groomerInfo, customerInfo, shopInfo]);

  const navigate = useNavigate();

  return (
    <div className="fixed z-40 flex h-[var(--header-height)] w-[400px] items-center justify-between bg-white px-5">
      <div className="flex items-center">
        <Link to={-1}>
          <VscChevronLeft size={20} />
        </Link>
        <img src={data?.image} alt="Profile" className="mx-3 h-12 w-12 rounded-full" />
        <div>
          <h1 className="text-md font-semibold">{data?.name}</h1>

          <div className="text-xs text-gray-500">
            <span className="font-bold text-main-500">{data?.shopName}</span> {data?.address}
          </div>
        </div>
      </div>
      {DefaultRole === "customer" && (
        <button onClick={() => navigate(`/customer/shop/${data?.shopId}`)} className="flex flex-col items-center">
          <IoIosHome size={25} color="#ff8e8e" />
          <span className="text-[10px]">매장보기</span>
        </button>
      )}
    </div>
  );
};

export default ChatHeader;
