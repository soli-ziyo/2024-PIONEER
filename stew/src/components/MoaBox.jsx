import React from "react";
import styled from "styled-components";

const MoaBox = ({ post, isCurrentUserPage }) => {
  return (
    <BoxContainer thumbnail={post.thumbnail}>
      <TextContainer>
        <Subtitle>{post.created_at}</Subtitle>
        <Title
          isEmpty={post.hashtag.hashtag === "이번 주 해시태그가 없습니다."}
        >
          {post.hashtag.hashtag}
        </Title>
      </TextContainer>
      {/* <Week>{CurrentWeek().weekOfMonth}</Week> */}
      <Notification>{post.postCount}</Notification>
    </BoxContainer>
  );
};

const BoxContainer = styled.div`
  position: relative;
  width: 160px; /* adjust the width as needed */
  height: 155px; /* adjust the height as needed */
  border-radius: 21px;
  overflow: hidden;
  box-shadow: 0 4px 0px rgba(0, 0, 0, 0.1);
  background-image: ${(props) => `url(${props.thumbnail})`};
  background-size: cover;
  background-position: center;
  margin-right: 6.5px;
`;

const TextContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: black;
`;

const Subtitle = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Notification = styled.div`
  position: absolute;
  top: 20px;
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
`;

export default MoaBox;
