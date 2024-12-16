import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicRoutes from "./Routes/PublicRoutes";
import useAuthStore from "./store/authStore";
import CustomerRoutes from "./Routes/CustomerRoutes";
import GroomerRoutes from "./Routes/GroomerRoutes";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./Routes/PrivateRoutes";
import MypageBoth from "./pages/MypageBoth";
import Chat from "./pages/Chat/Chat";
import MeongAI from "./pages/Chat/MeongAI";

function App() {
  const { isLoggedIn, DefaultRole } = useAuthStore();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={<PublicRoutes />} />
          <Route path="/chat/:roomId" element={<Chat />} />

          {/* <Route
            path="/customer/*"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn} role="customer" userRole={DefaultRole}>
                <CustomerRoutes />
              </PrivateRoute>
            }
          /> */}

          <Route path="/customer/*" element={<CustomerRoutes />} />
          {/* <Route
            path="/groomer/*"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn} role="groomer" userRole={DefaultRole}>
                <GroomerRoutes />
              </PrivateRoute>
            }
          /> */}
          <Route path="/groomer/*" element={<GroomerRoutes />} />

          <Route path="/customer/mypage" element={<MypageBoth />} />
          <Route path="/groomer/mypage" element={<MypageBoth />} />
          <Route path="/MeongAI" element={<MeongAI />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
