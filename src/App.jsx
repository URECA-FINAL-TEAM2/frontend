import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Notification from "./pages/Notification";
import PublicRoutes from "./Routes/PublicRoutes";
import useAuthStore from "./store/authStore";
import CustomerRoutes from "./Routes/CustomerRoutes";
import GroomerRoutes from "./Routes/GroomerRoutes";
import NotFound from "./pages/NotFound";

function App() {
  const { isLoggedIn } = useAuthStore();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={<PublicRoutes />} />
          <Route path="/customer/*" element={<CustomerRoutes />} />
          <Route path="/groomer/*" element={<GroomerRoutes />} />

          <Route path="notification" element={<Notification />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
