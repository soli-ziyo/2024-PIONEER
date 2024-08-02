import React, { useState } from "react";
import styled from "styled-components";
import HamburgerMenu from "../../components/HamburgerMenu";
import CodeInputNotice from "./CodeInputNotice.jsx";
import CodeInviteNotice from "./CodeInviteNotice.jsx";

const BeforeCodeScreen = ({ setHideElements }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <Content></Content>
      {}
      <CodeInviteNotice setHideElements={setHideElements} />
      <CodeInputNotice setHideElements={setHideElements} />
      {menuOpen && <HamburgerMenu toggleMenu={toggleMenu} />}
    </>
  );
};

export default BeforeCodeScreen;

const Content = styled.div``;
