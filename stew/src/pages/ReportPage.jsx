import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DateStore } from "../stores/DateStore";
import HamburgerMenu from "../components/HamburgerMenu";
import Header from "../components/Header";
import CalendarComponent from "../components/CalendarComponent";
import Chart from "../components/Chart";
import useFamilyStore from "../stores/familyStore";

import Close from "../images/Close.svg";

const ReportPage = ({ accessToken, familycode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [noticeVisible, setNoticeVisible] = useState(false);
  const { totalPosts, temperature, status, fetchData } = DateStore();
  const fetchFamilyData = useFamilyStore((state) => state.fetchFamilyData);

  useEffect(() => {
    fetchData(accessToken, familycode);
  }, [accessToken, familycode, fetchData]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await fetchFamilyData(accessToken, familycode);
        // 초기 데이터를 상태로 설정
        console.log("Fetched family data: ", data);
      } catch (error) {
        console.error("Failed to fetch initial family data:", error);
      }
    };

    fetchInitialData();
  }, [accessToken, familycode, fetchFamilyData]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleNotice = () => {
    setNoticeVisible(!noticeVisible);
  };

  const closeNotice = () => {
    setNoticeVisible(false);
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
                {noticeVisible && (
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
            <CalendarComponent
              accessToken={accessToken}
              familycode={familycode}
            />
          </Calendar>
        </CalendarSection>
        <ParticipationSection>
          <ParticipationTitle>참여 현황</ParticipationTitle>
          <Chart accessToken={accessToken} familycode={familycode} />
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
  top: 175px;
  z-index: 1000;
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
