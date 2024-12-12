import useAuthStore from "@/store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Toggle = ({ isChecked, setIsChecked }) => {
  const navigate = useNavigate();
  const { updateDefaultRole } = useAuthStore();
  const handleChange = () => {
    setIsChecked((prev) => !prev);
    console.log(isChecked ? "고객으로 전환" : "미용사로 전환");
  };

  useEffect(() => {
    // 토글 변경시 DefaultRole 변경
    updateDefaultRole(isChecked ? "customer" : "groomer");
    navigate(isChecked ? "/customer/mypage" : "/groomer/mypage");
  }, [isChecked]);

  return (
    <label className="inline-flex cursor-pointer items-center py-3">
      <span className="mr-3 ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {isChecked ? "미용사로 전환" : "고객으로 전환"}
      </span>
      <input type="checkbox" value="" className="peer sr-only" checked={isChecked} onChange={handleChange} />
      <div className="peer relative h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-main peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-main-100 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
    </label>
  );
};

export default Toggle;
