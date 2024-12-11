import { useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useToastAndNavigate = () => {
  const navigate = useNavigate();

  const showToastAndNavigate = useCallback(
    (message, icon = "👏🏻", delay = 1000) => {
      toast(message, { icon });
      setTimeout(() => {
        navigate(-1);
      }, delay);
    },
    [navigate]
  );

  return showToastAndNavigate;
};

export default useToastAndNavigate;
