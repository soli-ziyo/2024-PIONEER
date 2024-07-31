import React from 'react';
import styled from 'styled-components';
import { CurrentWeek } from './CurrentWeek';

const StateInterest = ({ user, hashtag }) => {
  const { weekOfMonth } = CurrentWeek();
  
  return (
    <Container>
      <Label>{user === "me" ? "나의 관심사" : `${user}의 관심사`}</Label>
      <Week>{weekOfMonth}</Week>
      <Hashtag>{hashtag}</Hashtag>
    </Container>
  );
};

export default StateInterest;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.div`
  background-color: #FF5A00;
  color: #fff;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; 
  padding: 5px 14px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const Week = styled.div`
  color: #8C8C8C;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Hashtag = styled.div`
  color: #FF6600;
  font-size: 18px;
  font-weight: 700;
`;
