import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const parseDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const getLastDayOfMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; 
  return new Date(year, month, 0).getDate();
};

const getWeekOfMonth = (date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const day = date.getDate();
  return Math.ceil((day + firstDay) / 7);
};

const MoaBox = ({ post }) => {
  const dateString = post.created_at;
  const date = parseDate(dateString);
  const lastDayOfMonth = getLastDayOfMonth(date);
  const weekOfMonth = getWeekOfMonth(date);
  const navigate = useNavigate();

  const MoveDetail = (userId) => {
    navigate(`/report/${post.weekhashtagId}/`);
  };

  return (
    <BoxContainer thumbnail={post.thumbnail} onClick={MoveDetail}>
      <TextContainer>
        <Week>
          {date.getMonth() + 1}월 {weekOfMonth}째 주
        </Week>
        <Hashtag>{post.tag.hashtag}</Hashtag>
      </TextContainer>
      <Notification>{post.postCount}</Notification>
    </BoxContainer>
  );
};

const BoxContainer = styled.div`
  position: relative;
  width: 160px;
  height: 155px;
  border-radius: 21px;
  overflow: hidden;
  background-color: ${(props) => (props.thumbnail ? "#ffffff" : "#ff5a00")};
  background-image: ${(props) =>
    props.thumbnail ? `url(${props.thumbnail})` : "none"};
  background-size: cover;
  background-position: center;
  margin-right: 6.5px;
  margin-bottom: 10px;
  cursor: pointer;

  ${(props) =>
    props.thumbnail &&
    css`
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 90%;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.8) 100%
        );
        z-index: 1;
      }
    `}
`;

const TextContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: black;
  margin: 10px;
  /* border: 1px solid red; */
  z-index: 3;
  max-width: 90px;
`;

const Week = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
  color: rgba(255, 255, 255, 1);
  font-weight: 200;
  line-height: 22px;
`;

const Hashtag = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
`;

const Notification = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff5a00;
  color: white;
  border-radius: 50%;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  height: 30px;
  flex-direction: column;
  z-index: 4;
`;

export default MoaBox;
