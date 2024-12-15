import { useNavigate } from "react-router-dom";
import logoBtn from "/Logo/logoBtn.png";

const GPTBtn = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 z-20 w-[400px] px-2">
      <button
        onClick={() => navigate("/MeongAI")}
        className="absolute bottom-24 right-5 flex h-[50px] w-[50px] transform flex-col items-center rounded-[50%] bg-main shadow-2xl transition-transform hover:scale-105 hover:shadow-[0_5px_10px_rgba(0,0,0,0.3)]"
      >
        <img src={logoBtn} alt="" className="w-[30px]" />
        <span className="titleFont text-xs text-white">멍AI</span>
      </button>
    </div>
  );
};

export default GPTBtn;
