import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const MAX_BAR_HEIGHT = 230;
const MIN_BAR_HEIGHT = 50;

const baseurl = "https://minsol.pythonanywhere.com";

const Chart = () => {
  const [chartDate, setChartDate] = useState(new Date());
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const familycode = localStorage.getItem("familycode");
        const response = await axios.get(
          `${baseurl}/report/calendar/${familycode}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const { interest_perUser } = response.data;

        const formattedData = interest_perUser.map((user) => ({
          name: user.user.nickname,
          image: user.user.profile || "/default-profile.jpg",
          posts: user.user_interests,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("데이터를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <ChartWrapper>
      {data.map((user, index) => {
        const barHeight =
          user.posts >= 8
            ? MAX_BAR_HEIGHT
            : MIN_BAR_HEIGHT +
              (user.posts / 8) * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT);
        return (
          <ChartBar key={index}>
            <Bar height={barHeight}>
              <ProfileImage src={user.image} alt="profile" />
            </Bar>
            <UserName>{user.name}</UserName>
          </ChartBar>
        );
      })}
    </ChartWrapper>
  );
};

export default Chart;

const ChartWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: ${MAX_BAR_HEIGHT + 50}px;
  margin: 20px;
`;

const ChartBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin: 0 10px;
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: ${(props) => props.height}px;
  background-color: #ff5b02;
  border-radius: 10px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const UserName = styled.div`
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
  color: #222;
  text-align: center;
  word-break: break-word;
`;
