import React, { useState } from "react";
import styled from "styled-components";
import { useProfilesStore } from "../stores/ProfileStore.js";
import HamburgerMenu from "../components/HamburgerMenu";
import Header from "../components/Header";
import CalendarComponent from "../components/CalendarComponent";

const ReportPage = ({ accessToken }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Wrapper>
      <Header toggleMenu={toggleMenu} />

      {menuOpen && <HamburgerMenu toggleMenu={toggleMenu} />}
      <Header2>
        <Comment>
          <Title>지금 우리 가족은</Title>
          <Status>차가운 stew</Status>
        </Comment>
        <Temperature>3°</Temperature>
      </Header2>

      <CalendarSection>
        <CalendarTitle>가족 달력</CalendarTitle>
        <Calendar>
          <CalendarComponent accessToken={accessToken} />
        </Calendar>
      </CalendarSection>

      <ParticipationSection>
        <ParticipationTitle>참여 현황</ParticipationTitle>
        <Chart>{/* 여기에 차트 컴포넌트 추가 */}</Chart>
      </ParticipationSection>
    </Wrapper>
  );
};

export default ReportPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 390px;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const Title = styled.h1`
  font-size: 20px;
`;

const Temperature = styled.h2`
  font-size: 64px;
  color: black;
  font-weight: 300;
`;

const Status = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #ff5a00;
  margin-top: 10px;
`;

const CalendarSection = styled.section`
  margin: 20px 0;
`;

const CalendarTitle = styled.h3`
  margin-bottom: 10px;
`;

const Calendar = styled.div`
  padding-top: 15px;
`;

const ParticipationSection = styled.section`
  margin: 20px 0;
`;

const ParticipationTitle = styled.h3`
  margin-bottom: 10px;
`;

const Chart = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;
