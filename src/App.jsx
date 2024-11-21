import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import TestPage from "./pages/TestPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/test" element={<TestPage />} />       
        </Routes>
      </Router>
    </div>
  );
}

export default App;
