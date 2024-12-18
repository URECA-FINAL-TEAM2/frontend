import { useNavigate } from "react-router-dom";
import logoBtn from "/Logo/logoBtn.png";

const GPTBtn = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 z-20 w-[400px] px-2">
      <button
        onClick={() => navigate("/MeongAI")}
        className="absolute bottom-24 right-5 flex h-[48px] w-[48px] transform flex-col items-center rounded-[50%] bg-main shadow-lg transition-colors duration-300 hover:bg-main-300"
      >
        <img src={logoBtn} alt="" className="w-[30px]" />
        <span className="titleFont text-xs text-white">멍AI</span>
      </button>
    </div>
  );
};

export default GPTBtn;
