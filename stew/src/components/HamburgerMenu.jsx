import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "../fonts/KulimPark.css";
import Close from "../images/Close.svg";
import Plus from "../images/Plus.svg";
import Minus from "../images/Minus.svg";

const HamburgerMenu = ({ toggleMenu }) => {
  const [subMenuOpen, setSubMenuOpen] = useState({
    report: false,
    settings: false,
  });

  const toggleSubMenu = (menu) => {
    setSubMenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <MenuWrapper>
      <CloseButton onClick={toggleMenu}>
        <img src={Close} alt="Close" />
      </CloseButton>
      <MenuItem>
        <StyledLink to="/home" onClick={toggleMenu}>
          home
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <MenuLink
          onClick={() => toggleSubMenu("report")}
          isOpen={subMenuOpen.report}
        >
          report
        </MenuLink>
        {subMenuOpen.report && (
          <SubMenu>
            <SubMenuLink to="/report/summary" onClick={toggleMenu}>
              모아보기
            </SubMenuLink>
            <SubMenuLink to="/report/stats" onClick={toggleMenu}>
              가족 통계{" "}
            </SubMenuLink>
          </SubMenu>
        )}
      </MenuItem>
      <MenuItem>
        <MenuLink
          onClick={() => toggleSubMenu("settings")}
          isOpen={subMenuOpen.settings}
        >
          settings
        </MenuLink>
        {subMenuOpen.settings && (
          <SubMenu>
            <SubMenuLink to="/settings/profile" onClick={toggleMenu}>
              프로필
            </SubMenuLink>
            <SubMenuLink to="/settings/notifications" onClick={toggleMenu}>
              알림 설정
            </SubMenuLink>
          </SubMenu>
        )}
      </MenuItem>
      <LogoutButton>로그아웃</LogoutButton>
    </MenuWrapper>
  );
};

export default HamburgerMenu;

const MenuWrapper = styled.div`
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 390px;
  height: 100%;
  background-color: #f9f9f9;
  padding: 20px;
  box-sizing: border-box;
  margin: 0 auto;
`;

const CloseButton = styled.div`
  cursor: pointer;
  img {
    width: 19px;
    height: 19px;
  }
  margin: 3px 0 57px 3px;
`;

const MenuItem = styled.div`
  margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: #222;
  font-size: 48px;
  font-weight: 300;
  padding-bottom: 15px;
  border-bottom: 2px solid #e2e2e2;
  margin-left: 10px;
  margin-right: 10px;
  font-family: "KulimPark";
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    color: #ff5a00;
  }
`;

const MenuLink = styled.div`
  cursor: pointer;
  color: ${(props) => (props.isOpen ? "#FF5A00" : "#222")};
  font-size: 48px;
  font-weight: 300;
  padding-bottom: 15px;
  border-bottom: 2px solid #e2e2e2;
  margin-left: 10px;
  margin-right: 10px;
  font-family: "KulimPark";
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    color: #ff5a00;
  }

  &::after {
    content: "";
    width: 20px;
    height: 20px;
    background-image: url(${(props) => (props.isOpen ? Minus : Plus)});
    background-size: cover;
    background-repeat: no-repeat;
    margin-right: 10px;
    cursor: pointer;
  }
`;

const SubMenu = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
`;

const SubMenuLink = styled(Link)`
  text-decoration: none;
  color: #222;
  font-family: "Pretendard";
  font-size: 24px;
  font-weight: 300;
  margin-top: 16px;
`;

const LogoutButton = styled.div`
  color: #8c8c8c;
  font-size: 14px;
  width: 89px;
  height: 37px;
  border-radius: 20px;
  border: 1px solid #e2e2e2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  bottom: 66px;
  left: 32px;
`;
