import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useToastAndNavigate = () => {
  const navigate = useNavigate();

  const showToastAndNavigate = (message, icon = "👏🏻", delay = 1000) => {
    toast(message, { icon });

    navigate(-1);
  };

  return showToastAndNavigate;
};

export default useToastAndNavigate;
