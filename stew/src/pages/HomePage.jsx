import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useProfilesStore } from "../stores/ProfileStore.js";
import FamilyProfile from "../components/FamilyProfile.jsx";
import HamburgerMenu from "../components/HamburgerMenu";
import Header from "../components/Header";
import Logo from "../images/Logo.svg";
import HomeNotice from "../components/HomeNotice.jsx";
import axios from "axios";

//가족코드
import CodeInputNotice from "../components/FamilyCode/CodeInputNotice.jsx";
import CodeInviteNotice from "../components/FamilyCode/CodeInviteNotice.jsx";

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBeforeCodeScreen, setShowBeforeCodeScreen] = useState(false);
  const [hideElements, setHideElements] = useState(false); // 새 상태 추가
  const { profiles, fetchProfiles } = useProfilesStore();

  const checkFamilyCode = async () => {
    try {
      await fetchProfiles();
      const baseurl = "https://minsol.pythonanywhere.com/";

      const response = await axios.get(`${baseurl}family/code/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.status === 200) {
        console.log("가족 코드가 없습니다");
        console.log(response);
        setShowBeforeCodeScreen(true);
      } else {
        console.log("가족 코드가 이미 존재");
        console.log(response.data.familycode);
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("가족 코드 확인 실패:", error);
      setShowBeforeCodeScreen(true);
    }
  };

  useEffect(() => {
    checkFamilyCode();
  }, [fetchProfiles]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Wrapper>
      {!hideElements && <Header toggleMenu={toggleMenu} />}
      <Content>
        {!hideElements &&
          profiles.map((profile, index) => (
            <FamilyProfile key={index} profile={profile} index={index} />
          ))}
      </Content>
      {showBeforeCodeScreen ? (
        <>
          <CodeInviteNotice setHideElements={setHideElements} />
          <CodeInputNotice setHideElements={setHideElements} />
        </>
      ) : (
        <HomeNotice />
      )}
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
