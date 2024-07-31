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
  margin-bottom: 20px;
`;

const Label = styled.div`
  background-color: #FF6600;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  width: 120px;
  height: 30px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;

const Week = styled.div`
  color: #8C8C8C;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Hashtag = styled.div`
  color: #FF6600;
  font-size: 18px;
  font-weight: 700;
`;
