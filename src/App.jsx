import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicRoutes from "./Routes/PublicRoutes";
import useAuthStore from "./store/authStore";
import CustomerRoutes from "./Routes/CustomerRoutes";
import GroomerRoutes from "./Routes/GroomerRoutes";
import NotFound from "./pages/NotFound";
import EditPortfolio from "./components/Mypage/Store/EditPortfolio";
import PaymentCancel from "./pages/Payment/PaymentCancel";
import PostReview from "./pages/Mypage/Reviews/PostReview";
import CustomerQuote from "./pages/Customer/CustomerQuote";
import CustomerQuoteDetailPage from "./pages/Quote/Customer/CustomerQuoteDetailPage";
import TotalQuoteRequestPage from "./pages/Quote/Customer/TotalQuoteRequestPage";
import ShopQuoteRequestPage from "./pages/Quote/Customer/ShopQuoteRequestPage";
import QuoteRequestDetailPage from "./pages/Quote/Customer/QuoteRequestDetailPage";
import GroomerQuote from "./pages/Groomer/GroomerQuote";
import GroomerQuoteDetailPage from "./pages/Quote/Groomer/GroomerQuoteDetailPage";
import GroomerQuoteRequestPage from "./pages/Quote/Groomer/GroomerQuoteRequestPage";
import GroomerReservationMain from "./pages/Reservation/Groomer/GroomerReservationMain";
import GroomerReservationDetail from "./pages/Reservation/Groomer/GroomerReservationDetail";
import TestPage from "./pages/TestPage";
import MypageBoth from "./pages/MypageBoth";
import ChatClient from "./pages/Chat/ChatClient";

function App() {
  const { isLoggedIn } = useAuthStore();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={<PublicRoutes />} />
          <Route path="/customer/*" element={<CustomerRoutes />} />
          <Route path="/groomer/*" element={<GroomerRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
