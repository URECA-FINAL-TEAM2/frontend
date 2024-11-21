import Header from "../../components/common/Header";
import SubHeader from "../../components/common/SubHeader";
import UserFooter from "../../components/common/UserFooter";
import StylistFooter from "../../components/common/StylistFooter";

const UserHome = () => {
  return (
    <div>
      <Header />
      <SubHeader title={"알림"} />
      <StylistFooter />
      <UserFooter />
    </div>
  );
};

export default UserHome;
