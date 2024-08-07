import React, { useState } from "react";
import styled from "styled-components";
import CodeInputFamily from "./CodeInputFamily.jsx";

const CodeInputNotice = ({
  setHideElements,
  setHideInviteNotice,
  setHideInputNotice,
}) => {
  const [step, setStep] = useState(1);
  const prevStep = () => setStep(step - 1);

  const handleParticipateClick = () => {
    setStep(step + 1);
    if (step === 1) {
      setHideElements(true);
      setHideInviteNotice(false);
    }
  };

  if (step === 2) {
    setHideElements(true);
    setHideInviteNotice(true);
    return (
      <CodeInputFamily
        prevStep={prevStep}
        setHideElements={setHideElements}
        setHideInputNotice={setHideInputNotice}
        setHideInviteNotice={setHideInviteNotice}
      />
    );
  }

  return (
    <NoticeContainer>
      <Title>가족코드가 있으신가요?</Title>
      <Content>가족 코드를 입력하고 stew에 참여해요.</Content>
      <Button onClick={handleParticipateClick}>참여하기</Button>
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
  font-size: 13px;
  font-weight: 500;
`;

const Button = styled.div`
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
