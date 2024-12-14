import OAuth2RedirectPage from "@/components/Login/Oauth2RedirectPage";
import Chat from "@/pages/Chat/Chat";
import ChatClient from "@/pages/Chat/ChatClient";
import BestReviews from "@/pages/Main/BestReviews";
import InfoRequired from "@/pages/Main/InfoRequired";
import Login from "@/pages/Main/Login";
import Onboarding from "@/pages/Main/Onboarding";
import SelectRole from "@/pages/Main/SelectRole";
import TestPage from "@/pages/TestPage";
import { Route, Routes } from "react-router-dom";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="testpage" element={<Chat />} />
      <Route path="testpage1" element={<TestPage />} />
      <Route path="" element={<Onboarding />} />
      <Route path="login" element={<Login />} />
      <Route path="login/oauth2/code/kakao" element={<OAuth2RedirectPage />} />
      <Route path="login/oauth2/code/google" element={<OAuth2RedirectPage />} />

      <Route path="selectRole" element={<SelectRole />} />
      <Route path="infoRequired" element={<InfoRequired />} />
      <Route path="bestReviews" element={<BestReviews />} />
    </Routes>
  );
};

export default PublicRoutes;
