import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Notification from "./pages/Notification";
import TestPage from "./pages/TestPage";
import Onboarding from "./pages/Main/Onboarding";
import Login from "./pages/Main/Login";
import SelectRole from "./pages/Main/SelectRole";
import InfoRequired from "./pages/Main/InfoRequired";
import CustomerLayout from "./pages/Layout/CustomerLayout";
import GroomerLayout from "./pages/Layout/GroomerLayout";
import CustomerHome from "./pages/Customer/CustomerHome";
import CustomerDocs from "./pages/Customer/CustomerDocs";
import CustomerSearch from "./pages/Customer/CustomerSearch";
import CustomerChat from "./pages/Customer/CustomerChat";
import CustomerMypage from "./pages/Customer/CustomerMypage";
import GroomerHome from "./pages/Groomer/GroomerHome";
import GroomerDocs from "./pages/Groomer/GroomerDocs";
import GroomerStore from "./pages/Groomer/GroomerStore";
import GroomerChat from "./pages/Groomer/GroomerChat";
import GroomerMypage from "./pages/Groomer/GroomerMypage";
import BestReviews from "./pages/Main/BestReviews";
import KakaoOAuth2RedirectPage from "./components/Login/KakaOauth2RedirectPage";
import UserInfo from "./pages/Common/UserInfo";
import BookmarkedStore from "./pages/Customer/BookmarkedStore";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* main */}
          <Route path="/testpage" element={<TestPage />} />
          <Route path="/" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/oauth/kakao/login" element={<KakaoOAuth2RedirectPage />} />

          <Route path="/SelectRole" element={<SelectRole />} />
          <Route path="/infoRequired" element={<InfoRequired />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/bestReviews" element={<BestReviews />} />

          {/* customer/ - layout */}
          <Route path="/customer" element={<CustomerLayout />}>
            <Route path="home" element={<CustomerHome />} />
            <Route path="docs" element={<CustomerDocs />} />
            <Route path="search" element={<CustomerSearch />} />
            <Route path="chat" element={<CustomerChat />} />
          </Route>

          {/* customer/ - none */}
          <Route path="/customer">
            <Route path="mypage" element={<CustomerMypage />} />
            <Route path="info" element={<UserInfo />} />
            <Route path="bookmarkedStore" element={<BookmarkedStore />} />
          </Route>

          {/* groomer/ -layout */}
          <Route path="/groomer" element={<GroomerLayout />}>
            <Route path="home" element={<GroomerHome />} />
            <Route path="docs" element={<GroomerDocs />} />
            <Route path="store" element={<GroomerStore />} />
            <Route path="chat" element={<GroomerChat />} />
          </Route>

          {/* groomer/ -none */}
          <Route path="/groomer">
            <Route path="mypage" element={<GroomerMypage />} />
            <Route path="info" element={<UserInfo />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
