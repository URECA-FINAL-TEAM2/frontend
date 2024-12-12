import { useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useToastAndNavigate = () => {
  const navigate = useNavigate();

  const showToastAndNavigate = useCallback(
    (message, icon = "👏🏻", delay = 1000) => {
      // 토스트를 먼저 보여줍니다.
      toast(message, { icon });

      // 일정 시간 후에 navigate를 실행합니다.
      // setTimeout(() => {
      navigate(-1);
      // }, delay);
    },
    [navigate]
  );

  return showToastAndNavigate;
};

export default useToastAndNavigate;
