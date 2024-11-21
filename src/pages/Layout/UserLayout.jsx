import Header from "../../components/common/Header";
import UserFooter from "../../components/common/UserFooter";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <UserFooter />
    </>
  );
};

export default UserLayout;
