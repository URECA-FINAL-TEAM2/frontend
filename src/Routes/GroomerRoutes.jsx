import EditPortfolio from "@/components/Mypage/Store/EditPortfolio";
import GroomerChat from "@/pages/Groomer/GroomerChat";
import GroomerHome from "@/pages/Groomer/GroomerHome";
import GroomerQuote from "@/pages/Groomer/GroomerQuote";
import GroomerStore from "@/pages/Groomer/GroomerStore";
import GroomerLayout from "@/pages/Layout/GroomerLayout";
import CreateStore from "@/pages/Mypage/GroomerStore.jsx/CreateStore";
import MyStore from "@/pages/Mypage/GroomerStore.jsx/MyStore";
import UserInfo from "@/pages/Mypage/UserInfo";
import MypageBoth from "@/pages/MypageBoth";
import GroomerQuoteDetailPage from "@/pages/Quote/Groomer/GroomerQuoteDetailPage";
import GroomerQuoteRequestPage from "@/pages/Quote/Groomer/GroomerQuoteRequestPage";
import GroomerReservationDetail from "@/pages/Reservation/Groomer/GroomerReservationDetail";
import GroomerReservationMain from "@/pages/Reservation/Groomer/GroomerReservationMain";
import { Route, Routes } from "react-router-dom";

const GroomerRoutes = () => {
  return (
    <Routes>
      <Route element={<GroomerLayout />}>
        <Route path="home" element={<GroomerHome />} />
        <Route path="store" element={<GroomerStore />} />
        <Route path="chat" element={<GroomerChat />} />
      </Route>

      <Route path="quotes" element={<GroomerQuote />} />
      <Route path="quotes/request/detail/:requestId" element={<GroomerQuoteRequestPage />} />
      <Route path="quotes/detail/:requestId" element={<GroomerQuoteDetailPage />} />
      <Route path="mypage" element={<MypageBoth />} />
      <Route path="info" element={<UserInfo />} />
      <Route path="mystore" element={<MyStore />} />
      <Route path="createstore" element={<CreateStore />} />
      <Route path="editportfolio" element={<EditPortfolio />} />
      <Route path="reservation" element={<GroomerReservationMain />} />
      <Route path="reservation/detail" element={<GroomerReservationDetail />} />
    </Routes>
  );
};

export default GroomerRoutes;
