import Header from "../../components/common/Header";
import { Outlet } from "react-router-dom";
import StylistFooter from "../../components/common/StylistFooter";

const StylistLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <StylistFooter />
    </>
  );
};

export default StylistLayout;
