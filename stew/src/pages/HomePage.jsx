import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useProfilesStore } from '../stores/ProfileStore.js';
import FamilyProfile from "../components/FamilyProfile.jsx";
import HamburgerMenu from "../components/HamburgerMenu";
import Header from "../components/Header";
import Logo from "../images/Logo.svg";
import HomeNotice from "../components/HomeNotice.jsx";


const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { profiles, fetchProfiles } = useProfilesStore();

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Wrapper>
      <Header toggleMenu={toggleMenu} />
      <Content>
        {profiles.map((profile, user_id) => (
          <FamilyProfile key={user_id} profile={profile} index={user_id} />
        ))}
      </Content>
      <HomeNotice />
      {menuOpen && <HamburgerMenu toggleMenu={toggleMenu} />}
      <Footer><img src={Logo} alt='Logo' /></Footer>
    </Wrapper>
  );
};

export default HomePage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 390px;
  height: 100%;;
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
    display: none; /* 스크롤 숨기기 */
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
