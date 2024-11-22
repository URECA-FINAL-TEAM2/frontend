import CustomerBottom from "../../components/common/CustomerBottom";
import Header from "../../components/common/Header";

import { Outlet } from "react-router-dom";

const CustomerLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <CustomerBottom />
    </>
  );
};

export default CustomerLayout;
