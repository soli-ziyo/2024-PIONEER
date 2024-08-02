import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useProfilesStore } from "../stores/ProfileStore.js";
import FamilyProfile from "../components/FamilyProfile.jsx";
import HamburgerMenu from "../components/HamburgerMenu";
import Header from "../components/Header";
import Logo from "../images/Logo.svg";
import HomeNotice from "../components/HomeNotice.jsx";
import CodeInviteNotice from "../components/FamilyCode/CodeInviteNotice.jsx";
import CodeInputNotice from "../components/FamilyCode/CodeInputNotice.jsx";
import axios from "axios";

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFamilyCodeNotice, setShowFamilyCodeNotice] = useState(false);
  const [showOtherNotice, setShowOtherNotice] = useState(false);
  const { profiles, fetchProfiles } = useProfilesStore();
  const baseurl = "https://minsol.pythonanywhere.com/";

  useEffect(() => {
    const checkFamilyCode = async () => {
      try {
        await fetchProfiles();

        const response = await axios.get(`${baseurl}family/code/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (response.data.familycode === null) {
          setShowFamilyCodeNotice(true);
        } else {
          setShowOtherNotice(true);
          console.log("가족 코드가 이미 존재");
          console.log(response.data.familycode);
          console.log(response.data.message);
        }
      } catch (error) {
        console.error("가족 코드 확인 실패:", error);
        setShowFamilyCodeNotice(true);
      }
    };

    checkFamilyCode();
  }, [fetchProfiles, baseurl]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Wrapper>
      <Header toggleMenu={toggleMenu} />
      <Content>
        {profiles.map((profile, index) => (
          <FamilyProfile key={index} profile={profile} index={index} />
        ))}
      </Content>
      {showFamilyCodeNotice && (
        <>
          <CodeInviteNotice message="가족 코드를 생성해 주세요!" />
          <CodeInputNotice message="가족 코드 생성에 대한 안내입니다." />
        </>
      )}
      {showOtherNotice && (
        <>
          <HomeNotice />
        </>
      )}
      {menuOpen && <HamburgerMenu toggleMenu={toggleMenu} />}
      <Footer>
        <img src={Logo} alt="Logo" />
      </Footer>
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
