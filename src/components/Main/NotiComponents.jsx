import { VscBell } from "react-icons/vsc";
import { Link } from "react-router-dom";

const NotiComponents = () => {
  return (
    <>
      <Link to="/notification">
        <VscBell size={28} />
      </Link>

      <Link to="/notification" className="relative">
        <VscBell size={28} />
        <div className="absolute -right-0 -top-1 rounded-2xl bg-[red] px-[0.4em] py-[0.1px] text-[10px] text-white">
          8
        </div>
      </Link>
    </>
  );
};

export default NotiComponents;
