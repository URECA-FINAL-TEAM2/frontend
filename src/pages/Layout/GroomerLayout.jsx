import Header from "../../components/common/Header";
import { Outlet } from "react-router-dom";
import GroomerBottom from "../../components/common/GroomerBottom";

const GroomerLayout = () => {
  return (
    <>
      <Header />
      <main className="mt-[75px]">
        <Outlet />
      </main>
      <GroomerBottom />
    </>
  );
};

export default GroomerLayout;
