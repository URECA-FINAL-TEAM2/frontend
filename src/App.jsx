import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserHome from "./pages/user/UserHome";
import UserSearch from "./pages/user/UserSearch";
import UserDocs from "./pages/user/UserDocs";
import UserMyPage from "./pages/user/UserMyPage";
import UserChat from "./pages/user/UserChat";
import UserLayout from "./pages/Layout/UserLayout";
import StylistLayout from "./pages/Layout/StylistLayout";
import StylistHome from "./pages/stylist/StylistHome";
import StylistDocs from "./pages/stylist/StylistDocs";
import StylistStore from "./pages/stylist/StylistStore";
import StylistChat from "./pages/stylist/StylistChat";
import StylistMyPage from "./pages/stylist/StylistMyPage";
import Notification from "./components/common/Notification";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
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
