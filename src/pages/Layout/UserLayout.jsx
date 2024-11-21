import Header from "../../components/common/Header";
import UserBottom from "../../components/common/UserBottom";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <UserBottom />
    </>
  );
};

export default UserLayout;
