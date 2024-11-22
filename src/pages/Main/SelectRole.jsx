import customer from "/Main/customer.svg";
import groomer from "/Main/groomer.svg";
import { useNavigate } from "react-router-dom";

const SelectRole = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-main-300 text-white">
      <div className="mb-5 text-2xl">어떤 서비스를 원하시나요?</div>

      <div>
        <button onClick={() => navigate("/infoRequired")} className="m-3 rounded-xl bg-white p-3">
          <img src={customer} alt="select customer img" />
          <div className="mt-1 text-xl font-bold text-main-300">고객</div>
        </button>
        <button onClick={() => navigate("/infoRequired")} className="m-3 rounded-xl bg-white p-3">
          <img src={groomer} alt="select groomer img" />
          <div className="mt-1 text-xl font-bold text-main-300">미용사</div>
        </button>
      </div>
    </div>
  );
};

export default SelectRole;
