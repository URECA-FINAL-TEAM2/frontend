import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserHome from "./pages/user/UserHome";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<UserHome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
