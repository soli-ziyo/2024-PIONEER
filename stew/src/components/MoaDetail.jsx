import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Close from "../images/Close.svg";
import Post from "./Post";

import SelectImoji from "./SelectImoji";
import ImojiDash from "../images/Imoji_dash.svg";

import instance from "../api/axios";

const MoaDetail = ({ post, isCurrentUserPage, toggleMenu }) => {
  const navigate = useNavigate();
  const timeSince = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const difference = now - postDate;

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years}년 전`;
    if (months > 0) return `${months}달 전`;
    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    return `${seconds}초 전`;
  };

  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(post.emoji);

  const handleEmojiClick = () => {
    setShowEmojiSelector(true);
  };

  const handleSelectEmoji = async (emoji) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(post.id);
    try {
      const response = await instance.put(
        `${process.env.REACT_APP_SERVER_PORT}/interest/list/${post.id}/emoji/`,

        { emoji },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        setSelectedEmoji(emoji);
      }
    } catch (error) {
      console.error("Failed to update emoji:", error);
    }
    setShowEmojiSelector(false);
  };

  return (
    <Wrapper>
      <Header>
        <CloseButton onClick={toggleMenu}>
          <img src={Close} alt="Close" />
        </CloseButton>
        <Title>해시태그</Title>
      </Header>
      <PostContainer>
        {post.img && <PostImage src={post.img} alt={post.description} />}
        <PostContent>
          <PostUser>
            <UserProfile src={post.user.profile} alt={post.user.nickname} />
            <UserName>{post.user.nickname}</UserName>
            <PostTime>
              {timeSince(post.created_at)}
              {selectedEmoji && <EmojiDisplay>{selectedEmoji}</EmojiDisplay>}
            </PostTime>
          </PostUser>
          <PostDescription>{post.description}</PostDescription>
        </PostContent>
      </PostContainer>
    </Wrapper>
  );
};

export default MoaDetail;

const Wrapper = styled.div`
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 390px;
  height: 100%;
  background-color: #f9f9f9;
  padding: 20px;
  box-sizing: border-box;
  margin: 0 auto;
`;

const CloseButton = styled.div`
  cursor: pointer;
  img {
    width: 19px;
    height: 19px;
  }
  margin: 3px 0 57px 3px;
`;

const Header = styled.div`
  display: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  color: #000;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

const PostContainer = styled.div`
  margin-bottom: 20px;
  overflow: hidden;
`;

const PostImage = styled.img`
  width: 100%;
  border-radius: 21px;
`;

const PostContent = styled.div`
  padding: 11px;
  border-radius: 21px;
  border: 0.5px solid #e2e2e2;
`;

const PostUser = styled.div`
  display: flex;
  align-items: center;
`;

const UserProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 14px;
`;

const UserName = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-right: auto;
`;

const PostTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8c8c8c;
  margin-right: 5px;
  gap: 8px;
  font-size: 12px;
  font-weight: 400;
`;

const PostDescription = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 120%;
  margin-left: 16%;
  margin-bottom: 13px;
`;

const EmojiButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  img {
    width: 24px;
    height: 24px;
    margin-bottom: 7px;
  }
`;

const EmojiDisplay = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 11px;
`;

const EmojiImg = styled.img`
  width: 24px;
  height: 24px;
`;
