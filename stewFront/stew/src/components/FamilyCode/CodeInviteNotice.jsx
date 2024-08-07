import React, { useState } from "react";
import styled from "styled-components";
import CodeInvite from "./CodeInvite.jsx";

const CodeInviteNotice = ({
  setHideElements,
  setHideInviteNotice,
  setHideInputNotice,
}) => {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleInviteClick = () => {
    setStep(step + 1);
    if (step === 1) {
      setHideElements(false);
      setHideInputNotice(false);
    }
  };

  if (step === 2) {
    setHideElements(true);
    setHideInputNotice(true);
    return (
      <CodeInvite
        prevStep={prevStep}
        setHideElements={setHideElements}
        setHideInputNotice={setHideInputNotice}
        setHideInviteNotice={setHideInviteNotice}
      />
    );
  }

  return (
    <NoticeContainer>
      <Title>가족을 초대해 보세요!</Title>
      <Content>stew를 통해 가족과 함께해요.</Content>
      <Button onClick={handleInviteClick}>초대하기</Button>
    </NoticeContainer>
  );
};

export default CodeInviteNotice;

const NoticeContainer = styled.div`
  margin: 10px 0 8px;
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
  color: #ff5a00;
  text-align: right;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 15px;
  border-radius: 20px;
  border: 1px solid #ff5a00;
  background-color: #fff;
  cursor: pointer;
`;
