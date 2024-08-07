import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Info from "../images/Info.svg";
import { CurrentWeek } from "./CurrentWeek";

const HomeNotice = () => {
  const [timeLeft, setTimeLeft] = useState("");
  const { week, weekOfMonth } = CurrentWeek();

  const checkTimeLeft = () => {
    const now = new Date();
    const hoursLeftToday = 23 - now.getHours();
    const minutesLeftToday = 59 - now.getMinutes();
    
    //남은 시간 계산 수정
    if (hoursLeftToday < 1) {
      setTimeLeft(`${minutesLeftToday}분 남음`); 
    } else {
      setTimeLeft(`${hoursLeftToday}시간 남음`);
    }
  };

  useEffect(() => {
    checkTimeLeft();
    const interval = setInterval(checkTimeLeft, 1000 * 60); 

    return () => clearInterval(interval);
  }, [week]);

  return (
    <NoticeContainer>
      <Title>우리 가족과 관심사를 공유해요!</Title>
      <Content>{weekOfMonth}의 관심사는 무엇인가요?</Content>
      <Information>관심사는 24시간 동안 변경할 수 있어요.</Information>
      <TimeLeft>{timeLeft}</TimeLeft>
      <Button to="hashtag">변경하기</Button>
    </NoticeContainer>
  );
};

export default HomeNotice;

const NoticeContainer = styled.div`
  margin-bottom: 3%;
  background-color: white;
  border-radius: 21px;
  padding: 18px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
  position: relative;
`;

const Title = styled.h2`
  color: #ff6600;
  font-weight: 500;
`;

const Content = styled.p`
  margin: 7px 0 24px;
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
