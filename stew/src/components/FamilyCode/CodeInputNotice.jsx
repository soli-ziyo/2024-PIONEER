import React, { useState } from "react";
import styled from "styled-components";
import Info from "../../images/Info.svg";
import CodeInputFamily from "./CodeInputFamily.jsx";

const CodeInputNotice = () => {
  const [showInput, setShowInput] = useState(false);

  const handleParticipateClick = () => {
    setShowInput(true);
  };

  return (
    <NoticeContainer>
      <Title>가족코드가 있으신가요?</Title>
      <Content>가족 코드를 입력하고 stew에 참여해요.</Content>
      {!showInput ? (
        <Button onClick={handleParticipateClick}>참여하기</Button>
      ) : (
        <CodeInputFamily />
      )}
    </NoticeContainer>
  );
};

export default CodeInputNotice;

const NoticeContainer = styled.div`
  margin: 10px 0 38px;
  background-color: white;
  border-radius: 21px;
  padding: 18px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
  position: relative;
`;

const Title = styled.h2`
  color: #ff6600;
  font-weight: 500;
  margin: 7px 0;
`;

const Content = styled.p`
  margin: 7px 0 7px;
  font-size: 14px;
  font-weight: 500;
`;

const Button = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  text-decoration: none;
  color: #ff5a00;
  text-align: right;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  padding: 8px 15px;
  border-radius: 20px;
  border: 1px solid #ff5a00;
  background-color: #fff;
  cursor: pointer;
`;
