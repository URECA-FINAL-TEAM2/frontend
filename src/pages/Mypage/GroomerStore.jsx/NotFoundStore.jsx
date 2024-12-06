import { useNavigate } from "react-router-dom";

const NotFoundStore = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-[75px] flex min-h-screen">
      <div className="flex grow flex-col items-center justify-center">
        <iframe src="https://lottie.host/embed/4036b827-9242-4de4-bc9a-ce95772f5e7e/Ab8zxxnCr9.lottie"></iframe>
        <div className="mb-[200px]">등록된 매장이 없습니다.</div>
      </div>

      <button
        onClick={() => navigate("/groomer/createstore", { state: { update: false } })}
        className="bottomButtonPink"
      >
        매장 등록하기
      </button>
    </div>
  );
};

export default NotFoundStore;
