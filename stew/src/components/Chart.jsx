import React from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";

const Chart = () => {
  const data = {
    labels: ["가족 A", "가족 B", "가족 C"],
    datasets: [
      {
        label: "참여도",
        data: [6, 2, 3], // 참여도 데이터
        backgroundColor: [
          "rgba(255, 159, 64, 0.6)", // 오렌지색
          "rgba(255, 206, 86, 0.6)", // 연한 오렌지색
          "rgba(75, 192, 192, 0.6)", // 다른 색상
        ],
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
    },
  };

  return (
    <ChartContainer>
      <h3>참여 현황</h3>
      <Bar data={data} options={options} />
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

export default Chart;
