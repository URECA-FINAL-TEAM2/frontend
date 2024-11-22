import Header from "../../components/common/Header";
import { Outlet } from "react-router-dom";
import GroomerBottom from "../../components/common/GroomerBottom";

const GroomerLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <GroomerBottom />
    </>
  );
};

export default GroomerLayout;
