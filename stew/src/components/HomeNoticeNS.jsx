import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HomeNoticeNS = ({ currentUserId }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0 });
  const navigate = useNavigate();

  const calculateTimeLeft = () => {
    const now = new Date();
    const endOfWeek = new Date(now);

    endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
    endOfWeek.setHours(23, 59, 59, 999);

    const difference = endOfWeek - now;

    const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((difference / (1000 * 60 * 60)) % 24);

    setTimeLeft({ days: daysLeft, hours: hoursLeft });
  };

  useEffect(() => {
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <NoticeContainer>
      <Title>우리 가족이 나를 생각해줬어요!</Title>
      <Content>
        가족이 올려준 글을 확인하러 가요.
        <br />
        글을 확인하고 가족에게 연락해볼까요?
      </Content>
      <TimeLeft>
        {timeLeft.days}일 {timeLeft.hours}시간 남음
      </TimeLeft>
      <Button onClick={() => navigate(`/interest/list/${currentUserId}`)}>
        확인하기
      </Button>
    </NoticeContainer>
  );
};

export default HomeNoticeNS;

const NoticeContainer = styled.div`
  margin-bottom: 3%;
  background-color: white;
  border-radius: 21px;
  padding: 20px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
  position: relative;
`;

const Title = styled.h2`
  color: #ff6600;
  font-weight: 500;
`;

const Content = styled.p`
  line-height: 150%;
  margin-top: 10px;
  font-size: 14px;
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

const TimeLeft = styled.span`
  color: #ff6600;
  font-weight: 700;
  font-size: 12px;
  position: absolute;
  top: 20px;
  right: 20px;
`;
