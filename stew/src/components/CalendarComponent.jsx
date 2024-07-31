import React, { useEffect } from "react";
import styled from "styled-components";
import { DateStore } from "../stores/DateStore"; // Zustand store import

const CalendarComponent = ({ accessToken }) => {
  const {
    activityData,
    currentDate,
    setCurrentDate,
    fetchData,
    familyMembersCount,
  } = DateStore();

  useEffect(() => {
    fetchData(accessToken);
  }, [accessToken, fetchData]);

  const getColorForDay = (day) => {
    const activityCount = activityData[day] || 0;
    const maxActivityCount = familyMembersCount; // 최대 활동 수를 가족 구성원 수로 설정
    const opacity = Math.min(activityCount / maxActivityCount, 1); // 최대 1로 제한
    const backgroundColor = `rgba(255, 91, 2, ${opacity})`; // 색상 조정
    return backgroundColor;
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
      2
    );
    if (newDate >= new Date().setDate(1)) {
      setCurrentDate(newDate);
    }
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<EmptyDay key={`empty-${i}`} />);
  }

  // 7월에만 데이터가 표시되도록
  const isJuly = month === 6; // 월은 0부터 시작하므로 6이 7월

  for (let i = 1; i <= daysInMonth; i++) {
    const activityCount = isJuly ? activityData[i] || 0 : 0;
    const backgroundColor = isJuly ? getColorForDay(i) : "transparent";
    days.push(
      <Day key={i} color={backgroundColor}>
        {i}
        {isJuly && activityCount === familyMembersCount && <Heart>🧡</Heart>}
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
  background-color: ${(props) => (props.disabled ? "#E2E2E2" : "transparent")};
  border: 2px solid #e2e2e2;
  border-radius: 50%;
  padding: 2px 6.5px 3px 7px;
  font-weight: 200;
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
