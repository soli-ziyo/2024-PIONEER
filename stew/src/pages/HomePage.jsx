import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useProfilesStore } from "../stores/ProfileStore.js";
import FamilyProfile from "../components/FamilyProfile.jsx";
import HamburgerMenu from "../components/HamburgerMenu";
import Header from "../components/Header";
import Logo from "../images/Logo.svg";
import HomeNotice from "../components/HomeNotice.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";
import LandingState from "../components/LandingState.jsx";

import axios from "axios";

// 가족 코드
import CodeInputNotice from "../components/FamilyCode/CodeInputNotice.jsx";
import CodeInviteNotice from "../components/FamilyCode/CodeInviteNotice.jsx";

const currentUserId = parseInt(localStorage.getItem("user_id"));
const baseurl = "https://minsol.pythonanywhere.com/";

const HomePage = () => {
  const { user_id } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBeforeCodeScreen, setShowBeforeCodeScreen] = useState(false);
  const [hideElements, setHideElements] = useState(false); // 새 상태 추가
  const [hideInviteNotice, setHideInviteNotice] = useState(false); // 새 상태 추가
  const [hideInputNotice, setHideInputNotice] = useState(false); // 새 상태 추가
  const [loading, setLoading] = useState(true); // 추가: 로딩 상태 추가

  const { profiles, fetchProfiles } = useProfilesStore();

  const checkFamilyCode = async (userId) => {
    try {
      await fetchProfiles();
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(`${baseurl}report/family/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.family.length <= 1) {
        console.log("등록된 가족이 없습니다");
        setShowBeforeCodeScreen(true);
      } else {
        console.log("등록된 가족이 이미 존재");
        console.log(response);
        setShowBeforeCodeScreen(false);
        setHideInviteNotice(true);
        setHideInputNotice(true);
      }
    } catch (error) {
      console.error("등록된 가족 확인 실패:", error);
      setShowBeforeCodeScreen(true);
    } finally {
      setLoading(false); // 추가: 로딩 완료 설정
    }
  };

  useEffect(() => {
    checkFamilyCode(user_id);
  }, [user_id, fetchProfiles]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Wrapper>
      {!hideElements && <Header toggleMenu={toggleMenu} />}
      <Content>
        {loading ? ( // 추가: 로딩 중 상태 확인
          <LoadingScreen />
        ) : showBeforeCodeScreen ? (
          <>
            {!hideElements &&
              profiles.map((profile, index) => (
                <LandingState key={index} profile={profile} index={index} />
              ))}
          </>
        ) : (
          <>
            {!hideElements &&
              profiles.map((profile, index) => (
                <FamilyProfile key={index} profile={profile} index={index} />
              ))}
          </>
        )}
      </Content>
      {!loading && // 추가: 로딩이 완료된 후에만 렌더링
        (showBeforeCodeScreen ? (
          <>
            {!hideInviteNotice && (
              <CodeInviteNotice
                setHideElements={setHideElements}
                setHideInviteNotice={setHideInviteNotice}
                setHideInputNotice={setHideInputNotice}
              />
            )}
            {!hideInputNotice && (
              <CodeInputNotice
                setHideElements={setHideElements}
                setHideInviteNotice={setHideInviteNotice}
                setHideInputNotice={setHideInputNotice}
              />
            )}
          </>
        ) : (
          <HomeNotice />
        ))}
      {menuOpen && !hideElements && <HamburgerMenu toggleMenu={toggleMenu} />}
      {!hideElements && (
        <Footer>
          <img src={Logo} alt="Logo" />
        </Footer>
      )}
    </Wrapper>
  );
};

export default HomePage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 390px;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: center;

  img {
    width: 72px;
    height: 36px;
    margin: 16px 0;
  }
`;
