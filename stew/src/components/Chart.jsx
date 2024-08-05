import React, { useState, useEffect } from "react";
import styled from "styled-components";
import instance from "../api/axios";
import basicImg from "../images/Basic.png";
import { useFamilycodeStore } from "../stores/FamilycodeStore";
import LoadingScreen from "../components/LoadingScreen";

const MAX_BAR_HEIGHT = 230; // 최대 막대 높이
const MIN_BAR_HEIGHT = 50; // 최소 막대 높이

const Chart = () => {
  const [chartDate, setChartDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { familycode, fetchFamilycode } = useFamilycodeStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchFamilycode();
        const response = await instance.get(
          `${process.env.REACT_APP_SERVER_PORT}/report/calendar/${familycode}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const { interest_perUser } = response.data;

        const formattedData = interest_perUser.map((index) => ({
          name: index.user.nickname,
          image: index.user.profile
            ? `${process.env.REACT_APP_SERVER_PORT}${index.user.profile}`
            : basicImg,
          posts: index.user_interests,
        }));
        console.log(response.data);
        setData(formattedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFamilycode, familycode]);

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

  const maxPosts = Math.max(...data.map((member) => member.posts), 1); // 최소값 1로 설정하여 나누기 0 방지

  return (
    <ChartContainer>
      <MonthYear>
        {year}.{String(month + 1).padStart(2, "0")}
      </MonthYear>
      <BarContainer>
        <Bars>
          {data.map((index) => {
            const height = Math.max(
              (index.posts / maxPosts) * MAX_BAR_HEIGHT,
              MIN_BAR_HEIGHT
            );
            const opacity = index.posts / maxPosts;
            return (
              <Bar key={index}>
                <PostCount
                  style={{
                    bottom: `${height + 10}px`,
                    color: index.posts === maxPosts ? "#FF5A00" : "#000",
                  }}
                >
                  {index.posts}
                </PostCount>
                <BarFill
                  style={{
                    height: `${height}px`,
                    backgroundColor: `rgba(255, 91, 2, ${opacity})`,
                  }}
                />
                <ProfileImage src={index.image} alt={index.name} />
              </Bar>
            );
          })}
        </Bars>
      </BarContainer>
    </ChartContainer>
  );
};

export default Chart;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  border-radius: 21px;
  background-color: white;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);

  position: relative; // Relative로 설정하여 자식 요소의 절대 위치를 기준으로 함
  overflow: hidden; // 내부 요소가 컨테이너 밖으로 벗어나지 않도록 설정
  width: 300px;
  overflow: hidden;
  flex: 1;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BarContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  width: 100%;
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
  font-weight: 400;
  margin-bottom: 10px;
  color: #222222;
`;

const Bars = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 200px; // 전체 차트 높이
  position: relative; // Relative로 설정하여 Bar의 절대 위치를 기준으로 함
  margin-top: 80px;
`;

const Bar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 60px;
  position: relative;
  margin-right: 5px;
  margin-left: 5px;
`;

const BarFill = styled.div`
  width: 50%;
  position: absolute;
  bottom: 10px; // 막대의 하단에서 시작
  border-radius: 20px;
`;

const ProfileImage = styled.img`
  width: 59px;
  height: 59px;
  border-radius: 50%;
  position: absolute;
  bottom: 0px; // 이미지 위치 조정
  border: 1px solid #e2e2e2;
`;

const PostCount = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  position: absolute;
`;
