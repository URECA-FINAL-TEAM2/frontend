import { Navigate } from "react-router-dom";

const PrivateRoute = ({ isLoggedIn, role, userRole, children }) => {
  // 로그인 여부 확인
  if (!isLoggedIn) {
    return <Navigate to="/" replace />; // 비로그인 시 홈으로 리다이렉트
  }

  // 사용자 역할 확인
  if (role && userRole !== role) {
    return <Navigate to="/" replace />; // 역할이 맞지 않으면 홈으로 리다이렉트
  }

  return children;
};

export default PrivateRoute;
