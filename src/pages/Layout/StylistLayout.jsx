import Header from "../../components/common/Header";
import { Outlet } from "react-router-dom";
import StylistBottom from "../../components/common/StylistBottom";

const StylistLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <StylistBottom />
    </>
  );
};

export default StylistLayout;
