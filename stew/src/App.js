import React from "react";
import { useState } from "react";
import { reset } from "styled-reset";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './fonts/Pretendard.css'


import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ChangeInterest from "./pages/ChangeInterest.jsx";
import InterestPage from "./pages/InterestPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import ChangeState from "./pages/ChangeState.jsx";

import { createGlobalStyle } from "styled-components";

function App() {
  return (
    <>
      <GlobalStyle/>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />}/>
          <Route path="/home/hashtag" element={<ChangeInterest />}/>
          <Route path="/home/edit" element={<ChangeState />}/>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/interest/list/:user_id" element={<InterestPage />} />
          <Route path="/interest/new" element={<PostPage />} />
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
    margin: 0 auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Pretendard";
    padding: 20px;
    background-color: #F9F9F9;
    box-sizing: border-box;
  }
`