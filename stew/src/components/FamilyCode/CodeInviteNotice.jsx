import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Info from "../../images/Info.svg";

const CodeInviteNotice = () => {
  const [showNotice, setShowNotice] = useState(true);

  useEffect(() => {
    if (!showNotice) {
      return null;
    }
  });

  return (
    <NoticeContainer>
      <Title>가족을 초대해 보세요!</Title>
      <Content>stew를 통해 가족과 함께해요.</Content>
      <Button onclick="">초대하기</Button>
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
  font-size: 14px;
  font-weight: 500;
`;

const Information = styled.p`
  color: #8c8c8c;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    width: 11px;
    height: 11px;
    display: inline-block;
    background-image: url(${Info});
    background-size: cover;
    background-repeat: no-repeat;
    margin-right: 4px;
  }
`;

const Button = styled(Link)`
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
`;

const TimeLeft = styled.span`
  color: #ff6600;
  font-weight: 700;
  font-size: 12px;
  position: absolute;
  top: 20px;
  right: 20px;
`;
