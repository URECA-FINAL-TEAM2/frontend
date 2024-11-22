import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserHome from "./pages/User/UserHome";
import UserSearch from "./pages/User/UserSearch";
import UserDocs from "./pages/User/UserDocs";
import UserMyPage from "./pages/User/UserMyPage";
import UserChat from "./pages/User/UserChat";
import UserLayout from "./pages/Layout/UserLayout";
import StylistLayout from "./pages/Layout/StylistLayout";
import StylistHome from "./pages/Stylist/StylistHome";
import StylistDocs from "./pages/Stylist/StylistDocs";
import StylistStore from "./pages/Stylist/StylistStore";
import StylistChat from "./pages/Stylist/StylistChat";
import StylistMyPage from "./pages/Stylist/StylistMyPage";
import Notification from "./pages/Notification";
import TestPage from "./pages/TestPage";
import Onboarding from "./pages/Main/Onboarding";
import Login from "./pages/Main/Login";
import SelectRole from "./pages/Main/SelectRole";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/testpage" element={<TestPage />} />
          <Route path="/" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SelectRole" element={<SelectRole />} />
          <Route path="/notification" element={<Notification />} />

          <Route path="/user" element={<UserLayout />}>
            <Route path="home" element={<UserHome />} />
            <Route path="docs" element={<UserDocs />} />
            <Route path="search" element={<UserSearch />} />
            <Route path="chat" element={<UserChat />} />
            <Route path="mypage" element={<UserMyPage />} />
          </Route>

          <Route path="/stylist" element={<StylistLayout />}>
            <Route path="home" element={<StylistHome />} />
            <Route path="docs" element={<StylistDocs />} />
            <Route path="store" element={<StylistStore />} />
            <Route path="chat" element={<StylistChat />} />
            <Route path="mypage" element={<StylistMyPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
