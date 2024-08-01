import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DateStore } from "../stores/DateStore"; // Zustand store import

import dad from "../images/dad.png";
import me from "../images/me.jpg";
import mom from "../images/mom.png";

const data = [
  { name: "나", image: me, posts: 6 },
  { name: "아빠", image: dad, posts: 3 },
  { name: "엄마", image: mom, posts: 2 },
];

const MAX_POSTS = 31; // 최대 포스트 수
const MAX_BAR_HEIGHT = 400; // 최대 막대 높이

const Chart = ({ accessToken }) => {
  const { fetchData } = DateStore();
  const [chartDate, setChartDate] = useState(new Date());

  useEffect(() => {
    fetchData(accessToken);
  }, [accessToken, fetchData]);

  const handlePrevMonth = () => {
    const newDate = new Date(
      chartDate.getFullYear(),
      chartDate.getMonth() - 1,
      1
    );
    setChartDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(
      chartDate.getFullYear(),
      chartDate.getMonth() + 1,
      1
    );
    setChartDate(newDate);
  };

  const year = chartDate.getFullYear();
  const month = chartDate.getMonth();

  return (
    <ChartContainer>
      <MonthYear>
        <Arrow onClick={handlePrevMonth}>{"<"}</Arrow>
        {year}.{String(month + 1).padStart(2, "0")}
        <Arrow onClick={handleNextMonth}>{">"}</Arrow>
      </MonthYear>
      <Bars>
        {data.map((member, index) => {
          const height = (member.posts / MAX_POSTS) * MAX_BAR_HEIGHT; // 막대 높이 계산
          return (
            <Bar key={index}>
              <BarFill
                style={{
                  height: `${height}px`,
                  backgroundColor: `rgba(255, 165, 0, ${
                    member.posts / MAX_POSTS
                  })`,
                }}
              />
              <ProfileImage src={member.image} alt={member.name} />
              <PostCount>{member.posts}</PostCount>
            </Bar>
          );
        })}
      </Bars>
    </ChartContainer>
  );
};

export default Chart;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative; // Relative로 설정하여 자식 요소의 절대 위치를 기준으로 함
  overflow: hidden; // 내부 요소가 컨테이너 밖으로 벗어나지 않도록 설정
`;

const Arrow = styled.div`
  cursor: pointer;
  margin: 0 40px;
  background-color: transparent;
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

const MonthYear = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #222222;
`;

const Bars = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 200px; // 전체 차트 높이
  position: relative; // Relative로 설정하여 Bar의 절대 위치를 기준으로 함
`;

const Bar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 60px;
  position: relative;
`;

const BarFill = styled.div`
  width: 100%;
  position: absolute;
  bottom: 40px; // 막대의 하단에서 시작
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  bottom: 15px; // 이미지 위치 조정
`;

const PostCount = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-top: 5px;
  position: absolute;
  bottom: 90px; // 막대의 꼭대기 위에 위치
`;
