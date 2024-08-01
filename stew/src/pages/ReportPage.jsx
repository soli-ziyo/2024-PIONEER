import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useProfilesStore } from "../stores/ProfileStore.js";
import HamburgerMenu from "../components/HamburgerMenu";
import Header from "../components/Header";
import CalendarComponent from "../components/CalendarComponent";
import Chart from "../components/Chart";
import { DateStore } from "../stores/DateStore"; // Zustand store import

import Close from "../images/Close.svg";

const ReportPage = ({ accessToken }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [noticeVisible, setNoticeVisible] = useState(false); // Notice 상태 추가
  const [totalPosts, setTotalPosts] = useState(0); // 총 게시물 수 상태 추가
  const [temperature, setTemperature] = useState(0); // 온도 상태 추가
  const [status, setStatus] = useState("차가운 stew"); // 상태 상태 추가

  const { familyMembersCount } = DateStore(); // 가족 구성원 수 가져오기

  useEffect(() => {
    // 게시물 데이터를 fetchData 또는 다른 로직으로 가져온다고 가정합니다.
    // 여기서는 임시로 게시물 수를 설정합니다.
    const postsData = [20, 30, 70]; // 예시 데이터
    const total = postsData.reduce((acc, curr) => acc + curr, 0);
    setTotalPosts(total);

    if (familyMembersCount > 0) {
      const newTemperature = Math.floor(total / familyMembersCount);
      setTemperature(newTemperature);

      if (newTemperature <= 25) {
        setStatus("차가운 stew");
      } else if (newTemperature <= 50) {
        setStatus("미지근한 stew");
      } else if (newTemperature <= 75) {
        setStatus("따뜻한 stew");
      } else {
        setStatus("뜨거운 stew");
      }
    }
  }, [familyMembersCount]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleNotice = () => {
    setNoticeVisible(!noticeVisible); // Notice 상태 토글
  };

  const closeNotice = () => {
    setNoticeVisible(false); // Notice 숨기기
  };

  return (
    <Wrapper>
      <Header toggleMenu={toggleMenu} />

      {menuOpen && <HamburgerMenu toggleMenu={toggleMenu} />}
      <ContentWrapper>
        <Header2>
          <Comment>
            <Title>지금 우리 가족은</Title>
            <CommentWrapper>
              <Status>{status}</Status>
              <NoticeWrapper2>
                <Notice onClick={toggleNotice}>?</Notice>
                {noticeVisible && ( // noticeVisible이 true일 때만 표시
                  <NoticeExplain>
                    <NoticeWrapper>
                      <NoticeTitle>우리 가족의 온도</NoticeTitle>
                      <NoticeX onClick={closeNotice}>
                        <img src={Close} alt="Close" />
                      </NoticeX>
                    </NoticeWrapper>
                    <NoticeContent>
                      가족 구성원의 수만큼 게시물이 늘어나면 stew가 1˚
                      따뜻해져요.
                    </NoticeContent>
                  </NoticeExplain>
                )}
              </NoticeWrapper2>
            </CommentWrapper>
          </Comment>
          <Temperature>{temperature}°</Temperature>
        </Header2>

        <CalendarSection>
          <CalendarTitle>가족 달력</CalendarTitle>
          <Calendar>
            <CalendarComponent accessToken={accessToken} />
          </Calendar>
        </CalendarSection>

        <ParticipationSection>
          <ParticipationTitle>참여 현황</ParticipationTitle>
          <Chart></Chart>
        </ParticipationSection>
      </ContentWrapper>
    </Wrapper>
  );
};

export default ReportPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  padding-top: 20px;
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

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: bottom;
  margin-top: 10px;
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
  margin-bottom: 30px;
`;

const CalendarTitle = styled.h3`
  margin-bottom: 10px;
  font-weight: bold;
`;

const Calendar = styled.div`
  padding-top: 15px;
`;

const NoticeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
  width: 95%;

  img {
    width: 10px;
  }
`;

const NoticeWrapper2 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Notice = styled.div`
  color: #8c8c8c;
  font-size: 12px;
  font-weight: 400;
  background-color: white;
  margin: 9px;
  border-radius: 100%;
  border: 1px solid #e2e2e2;
  text-align: center;
  width: 25px;
  height: 25px;
  align-content: center;
`;

const NoticeExplain = styled.div`
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #e2e2e2;
  width: 138px;
  margin-left: 10px;
  position: absolute;
  top: 155px;
`;

const NoticeTitle = styled.div`
  font-weight: bold;
  font-size: 12px;
  color: #222222;
`;

const NoticeX = styled.div``;

const NoticeContent = styled.div`
  font-weight: 400;
  font-size: 11px;
  line-height: 15px;
  color: #222222;
`;

const ParticipationSection = styled.section`
  margin: 20px 0;
`;

const ParticipationTitle = styled.h3`
  margin-bottom: 20px;
  font-weight: bold;
`;
