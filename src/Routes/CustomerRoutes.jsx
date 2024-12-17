import ChatRoomList from "@/pages/Chat/ChatRoomList";
import CustomerChat from "@/pages/Customer/CustomerChat";
import CustomerHome from "@/pages/Customer/CustomerHome";
import CustomerQuote from "@/pages/Customer/CustomerQuote";
import CustomerSearchPage from "@/pages/Customer/CustomerSearchPage";
import CustomerLayout from "@/pages/Layout/CustomerLayout";
import CustomerSearchLayout from "@/pages/Layout/CustomerSearchLayout";
import BookmarkedStore from "@/pages/Mypage/BookmarkedStore";
import MyPet from "@/pages/Mypage/CustomerPet/MyPet";
import MyReviews from "@/pages/Mypage/Reviews/MyReviews";
import PostReview from "@/pages/Mypage/Reviews/PostReview";
import WriteReviews from "@/pages/Mypage/Reviews/WriteReviews";
import UserInfo from "@/pages/Mypage/UserInfo";
import MypageBoth from "@/pages/MypageBoth";
import NotFound from "@/pages/NotFound";
import PaymentCancel from "@/pages/Payment/PaymentCancel";
import PaymentComplete from "@/pages/Payment/PaymentComplete";
import CustomerQuoteDetailPage from "@/pages/Quote/Customer/CustomerQuoteDetailPage";
import QuoteRequestDetailPage from "@/pages/Quote/Customer/QuoteRequestDetailPage";
import ShopQuoteRequestPage from "@/pages/Quote/Customer/ShopQuoteRequestPage";
import TotalQuoteRequestPage from "@/pages/Quote/Customer/TotalQuoteRequestPage";
import CustomerReservationDetail from "@/pages/Reservation/Customer/CustomerReservationDetail";
import CustomerReservationMain from "@/pages/Reservation/Customer/CustomerReservationMain";
import ShopDetailPage from "@/pages/Shop/ShopDetailPage";
import { Route, Routes } from "react-router-dom";

const CustomerRoutes = () => {
  return (
    <Routes>
      {/* customer/ -layout */}
      <Route element={<CustomerLayout />}>
        <Route path="home" element={<CustomerHome />} />
        <Route path="chat" element={<ChatRoomList />} />
      </Route>

      {/* customer/ -none */}
      <Route path="quotes" element={<CustomerQuote />} />
      <Route path="shop" element={<CustomerSearchLayout />}>
        <Route index element={<CustomerSearchPage />} />
        <Route path=":shopId" element={<ShopDetailPage />} />
      </Route>
      <Route path="quotes/detail/:quotesId" element={<CustomerQuoteDetailPage />} />
      <Route path="quotes/request" element={<TotalQuoteRequestPage />} />
      <Route path="quotes/request/:groomerId" element={<ShopQuoteRequestPage />} />
      <Route path="quotes/request/detail/:requestId" element={<QuoteRequestDetailPage />} />
      {/* <Route path="mypage" element={<MypageBoth />} /> */}
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
      <Route path="postreview/:customerId" element={<PostReview />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default CustomerRoutes;
