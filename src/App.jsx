import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Notification from "./pages/Notification";
import Onboarding from "./pages/Main/Onboarding";
import Login from "./pages/Main/Login";
import SelectRole from "./pages/Main/SelectRole";
import InfoRequired from "./pages/Main/InfoRequired";
import CustomerLayout from "./pages/Layout/CustomerLayout";
import GroomerLayout from "./pages/Layout/GroomerLayout";
import CustomerHome from "./pages/Customer/CustomerHome";
import CustomerChat from "./pages/Customer/CustomerChat";
import CustomerMypage from "./pages/Customer/CustomerMypage";
import GroomerHome from "./pages/Groomer/GroomerHome";
import GroomerStore from "./pages/Groomer/GroomerStore";
import GroomerChat from "./pages/Groomer/GroomerChat";
import GroomerMypage from "./pages/Groomer/GroomerMypage";
import BestReviews from "./pages/Main/BestReviews";
import PaymentComplete from "./pages/Payment/PaymentComplete";
import OAuth2RedirectPage from "./components/Login/Oauth2RedirectPage";
import UserInfo from "./pages/Mypage/UserInfo";
import BookmarkedStore from "./pages/Mypage/BookmarkedStore";
import MyPet from "./pages/Mypage/CustomerPet/MyPet";
import MyReviews from "./pages/Mypage/Reviews/MyReviews";
import WriteReviews from "./pages/Mypage/Reviews/WriteReviews";
import MyStore from "./pages/Mypage/GroomerStore.jsx/MyStore";
import CreateStore from "./pages/Mypage/GroomerStore.jsx/CreateStore";
import CustomerReservationMain from "./pages/Reservation/Customer/CustomerReservationMain";
import CustomerSearchPage from "./pages/Customer/CustomerSearchPage";
import ShopDetailPage from "./pages/Shop/ShopDetailPage";
import CustomerSearchLayout from "./pages/Layout/CustomerSearchLayout";
import CustomerReservationDetail from "./pages/Reservation/Customer/CustomerReservationDetail";
import NotFound from "./pages/NotFound";
import EditPortfolio from "./components/Mypage/Store/EditPortfolio";
import PaymentCancel from "./pages/Payment/PaymentCancel";
import PaymentTestPage from "./pages/Payment/PaymentTestPage";
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

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/testpage" element={<PaymentTestPage />} />
          <Route path="/" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/oauth2/code/kakao" element={<OAuth2RedirectPage />} />
          <Route path="/login/oauth2/code/google" element={<OAuth2RedirectPage />} />

          <Route path="/selectRole" element={<SelectRole />} />
          <Route path="/infoRequired" element={<InfoRequired />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/bestReviews" element={<BestReviews />} />

          {/* customer/ -layout */}
          <Route path="/customer" element={<CustomerLayout />}>
            <Route path="home" element={<CustomerHome />} />
            <Route path="chat" element={<CustomerChat />} />
          </Route>

          {/* customer/ -none */}
          <Route path="/customer">
            <Route path="quotes" element={<CustomerQuote />} />
            <Route path="shop" element={<CustomerSearchLayout />}>
              <Route index element={<CustomerSearchPage />} />
              <Route path=":shopId" element={<ShopDetailPage />} />
            </Route>
            <Route path="quotes/detail/:quotesId" element={<CustomerQuoteDetailPage />} />
            <Route path="quotes/request" element={<TotalQuoteRequestPage />} />
            <Route path="quotes/request/:groomerId" element={<ShopQuoteRequestPage />} />
            <Route path="quotes/request/detail/:requestId" element={<QuoteRequestDetailPage />} />
            <Route path="mypage" element={<CustomerMypage />} />
            <Route path="info" element={<UserInfo />} />
            <Route path="bookmarkedStore" element={<BookmarkedStore />} />

            <Route path="myPet" element={<MyPet />} />
            <Route path="myPet/:id" element={<MyPet />} />
            <Route path="myReviews" element={<MyReviews />} />
            <Route path="writeReviews" element={<WriteReviews />} />
            <Route path="reservation" element={<CustomerReservationMain />} />
            <Route path="reservation/detail" element={<CustomerReservationDetail />} />
            <Route path="payment/complete" element={<PaymentComplete />} />
            <Route path="payment/cancel" element={<PaymentCancel />} />
          </Route>

          {/* groomer/ -layout */}
          <Route path="/groomer" element={<GroomerLayout />}>
            <Route path="home" element={<GroomerHome />} />
            <Route path="store" element={<GroomerStore />} />
            <Route path="chat" element={<GroomerChat />} />
          </Route>

          {/* groomer/ -none */}
          <Route path="/groomer">
            <Route path="quotes" element={<GroomerQuote />} />
            <Route path="quotes/request/detail/:requestId" element={<GroomerQuoteRequestPage />} />
            <Route path="quotes/detail/:requestId" element={<GroomerQuoteDetailPage />} />
            <Route path="mypage" element={<GroomerMypage />} />
            <Route path="info" element={<UserInfo />} />
            <Route path="mystore" element={<MyStore />} />
            <Route path="createstore" element={<CreateStore />} />
            <Route path="editportfolio" element={<EditPortfolio />} />
            <Route path="reservation" element={<GroomerReservationMain />} />
            <Route path="reservation/detail" element={<GroomerReservationDetail />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
