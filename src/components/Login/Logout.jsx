import { authLogout } from "@/queries/authQuery";
import useAuthStore from "@/store/authStore";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await authLogout();
    if (response === 201) {
      navigate("/");
      logout();
    }
  };

  return (
    <button className="mx-auto flex py-4 text-sm text-gray-300 underline" onClick={handleLogout}>
      <li>로그아웃</li>
    </button>
  );
};

export default Logout;
