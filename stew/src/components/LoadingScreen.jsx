import React from "react";
import styled from "styled-components";

import Logo from "../images/Logo.svg";

const LoadingScreen = () => {
  return (
    <Wrapper>
      <CarouselIndicators>
        <Indicator active />
        <Indicator />
        <Indicator />
      </CarouselIndicators>
      <Content>
        <Tagline>stay tewgether</Tagline>
        <BrandName img src={Logo} alt="Logo" />
      </Content>
    </Wrapper>
  );
};

export default LoadingScreen;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 20px;
  box-sizing: border-box;
`;

const CarouselIndicators = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

const Indicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#FF6600" : "#E0E0E0")};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Tagline = styled.div`
  color: #ff6600;
  font-size: 18px;
  margin-bottom: 8px;
`;

const BrandName = styled.div`
  color: #ff6600;
  font-size: 36px;
  font-weight: bold;
`;
