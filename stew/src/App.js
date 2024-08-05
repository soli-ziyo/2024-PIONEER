import React from "react";
import { useEffect } from "react";
import { reset } from "styled-reset";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./fonts/Pretendard.css";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ChangeInterest from "./pages/ChangeInterest.jsx";
import InterestPage from "./pages/InterestPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import ReportPage from "./pages/ReportPage.jsx";
import MoaPage from "./pages/MoaPage.jsx";
import MoaDetail from "./components/MoaDetail.jsx";
import ChangeState from "./pages/ChangeState.jsx";

import { createGlobalStyle } from "styled-components";

function App() {
  useEffect(() => {
    const handleResize = () => {
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set the initial value

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/hashtag" element={<ChangeInterest />} />
          <Route path="/home/edit" element={<ChangeState />} />
          <Route path="/settings/profile" element={<ProfilePage />} />
          <Route path="/interest/list/:user_id" element={<InterestPage />} />
          <Route path="/interest/new" element={<PostPage />} />
          <Route path="/report/stats" element={<ReportPage />} />
          <Route path="/report/summary/:user_id" element={<MoaPage />} />
          <Route path="/report/:tag_id" element={<MoaDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  ${reset}
  #root{
    max-width: 390px;
    height: var(--app-height, 100vh);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Pretendard";
    padding: 20px;
    background-color: #F9F9F9;
    box-sizing: border-box;
  }
`;
