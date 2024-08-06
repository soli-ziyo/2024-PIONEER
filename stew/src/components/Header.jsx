import React from "react";
import styled from "styled-components";
import Hamburger from "../images/Hamburger.svg";

const Header = ({ toggleMenu }) => {
  return (
    <HeaderWrapper>
      <MenuIcon onClick={toggleMenu}>
        <img src={Hamburger} alt="Hamburger Menu" />
      </MenuIcon>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const MenuIcon = styled.div`
  margin-top: 3px;
  cursor: pointer;
  width: 25px;
  height: 13px;
`;

const NotificationIcon = styled.div`
  cursor: pointer;
  width: 23px;
  height: 23px;
`;
