import React, { useState } from "react";
import styled from "styled-components";
import { useProfilesStore } from '../stores/ProfileStore.js';
import FamilyProfile from "../components/FamilyProfile.jsx";
import HamburgerMenu from "../components/HamburgerMenu";
import Header from "../components/Header";
import Logo from "../images/Logo.svg";

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { profiles } = useProfilesStore();

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
  height: 100vh;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;
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
