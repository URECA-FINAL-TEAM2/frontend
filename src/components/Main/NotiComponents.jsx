import { useNotificationStore } from "@/store/notificationStore";
import { VscBell } from "react-icons/vsc";
import { Link } from "react-router-dom";

const NotiComponents = () => {
  const { unreadCount } = useNotificationStore();

  return (
    <>
      {unreadCount ? (
        <Link to="/notification" className="relative">
          <VscBell size={28} />
          <div className="absolute -right-0 -top-1 rounded-2xl bg-[#ff8e8e] px-[0.4em] py-[0.1px] text-[10px] text-white">
            {unreadCount}
          </div>
        </Link>
      ) : (
        <Link to="/notification">
          <VscBell size={28} />
        </Link>
      )}
    </>
  );
};

export default NotiComponents;
