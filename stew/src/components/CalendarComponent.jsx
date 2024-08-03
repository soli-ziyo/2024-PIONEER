import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DateStore } from "../stores/DateStore";
import instance from "../api/axios";

const CalendarComponent = () => {
  const { activityData, currentDate, setCurrentDate, fetchData } = DateStore();

  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    const fetchCalendarData = async () => {
      const familycode = localStorage.getItem("familycode");
      try {
        const response = await instance.get(
          `${process.env.REACT_APP_SERVER_PORT}/report/calendar/${familycode}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setCalendarData(response.data.calendar || []);
        fetchData();
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      }
    };

    fetchCalendarData();
  }, []);

  const getColorForDay = (day) => {
    const data = calendarData.find(
      (item) => new Date(item.date).getDate() === day
    );
    const percentage = data ? data.percentage : 0;
    const opacity = Math.min(percentage / 100, 1); // 퍼센티지 기반 투명도 설정
    return `rgba(255, 91, 2, ${opacity})`; // 색상 조정
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(newDate);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<EmptyDay key={`empty-${i}`} />);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const backgroundColor = getColorForDay(i);
    const data = calendarData.find(
      (item) => new Date(item.date).getDate() === i
    );
    const percentage = data ? data.percentage : 0;
    days.push(
      <Day key={i} color={backgroundColor}>
        {i}
        {percentage === 100 && <Heart>🧡</Heart>}{" "}
      </Day>
    );
  }

  return (
    <CalendarWrapper>
      <MonthYear>
        <Arrow
          onClick={handlePrevMonth}
          disabled={
            new Date(currentDate.getFullYear(), currentDate.getMonth(), 1) <=
            new Date().setDate(1)
          }
        >
          {"<"}
        </Arrow>
        {year}.{String(month + 1).padStart(2, "0")}
        <Arrow onClick={handleNextMonth}>{">"}</Arrow>
      </MonthYear>
      <DaysWrapper>
        <WeeksWrapper>
          <WeekDay>일</WeekDay>
          <WeekDay>월</WeekDay>
          <WeekDay>화</WeekDay>
          <WeekDay>수</WeekDay>
          <WeekDay>목</WeekDay>
          <WeekDay>금</WeekDay>
          <WeekDay>토</WeekDay>
        </WeeksWrapper>
        {days}
      </DaysWrapper>
    </CalendarWrapper>
  );
};

export default CalendarComponent;

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 21px;
  padding: 13px;
  padding-top: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const MonthYear = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #222222;
  font-weight: 400;
`;

const Arrow = styled.div`
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  margin: 0 40px;
  border: 2px solid #e2e2e2;
  border-radius: 50%;
  font-weight: 400;
  font-size: 14px;
  width: 20px;
  height: 20px;
  align-content: center;
  text-align: center;
  color: #8c8c8c;
`;

const DaysWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  font-size: 14px;
  color: #222222;
  font-weight: 100;
  margin-left: 8px;
`;

const WeeksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  font-size: 14px;
  color: #222222;
  margin-right: -16px;
`;

const Day = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin: 2px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  color: black;
  font-weight: 400;
  position: relative; /* 상대적 위치 설정 */
`;

const EmptyDay = styled.div`
  width: 40px;
  height: 40px;
  margin: 2px;
`;

const WeekDay = styled.div`
  width: 40px;
  height: 40px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
`;

const Heart = styled.div`
  position: absolute; /* 절대 위치 지정 */
  left: 50%; /* 가운데 정렬 */
  top: 50%; /* 가운데 정렬 */
  transform: translate(10%, 10%); /* 오른쪽 아래로 이동 */
  font-size: 20px; /* 하트 크기 조정 */
  margin-top: 0px; /* 추가적인 아래 위치 조정 */
`;
