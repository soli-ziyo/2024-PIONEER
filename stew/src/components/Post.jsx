import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import SelectImoji from './SelectImoji';
import ImojiDash from '../images/Imoji_dash.svg'; 
import Call from '../images/Call.svg';
import Message from '../images/Message.svg';

const baseurl = 'https://minsol.pythonanywhere.com';

const Post = ({ post, onCall, onMessage, isCurrentUserPage }) => {
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
    const accessToken = localStorage.getItem('accessToken');
    console.log(post.id)
    try {
      const response = await axios.put(
        `${baseurl}/interest/list/${post.id}/emoji/`,

        { emoji },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
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
    <PostContainer>
      {post.img && <PostImage src={post.img} alt={post.description} />}
      <PostContent>
        <PostUser>
          <UserProfile src={post.user.profile} alt={post.user.nickname} />
          <UserName>{post.user.nickname}</UserName>
          <PostTime>
            {timeSince(post.created_at)}
            {isCurrentUserPage ? (
              <EmojiButton onClick={handleEmojiClick}>
                {selectedEmoji ? (
                  <EmojiDisplay>{selectedEmoji}</EmojiDisplay>
                ) : (
                  <EmojiImg src={ImojiDash} alt="Add Emoji" />
                )}
              </EmojiButton>
            ) : (
              selectedEmoji && <EmojiDisplay>{selectedEmoji}</EmojiDisplay>
            )}
          </PostTime>
        </PostUser>
        <PostDescription>{post.description}</PostDescription>
      </PostContent>
      {showEmojiSelector && <SelectImoji onClose={() => setShowEmojiSelector(false)} onSelect={handleSelectEmoji} />}
      {!isCurrentUserPage && (
          <ContactButtons>
            <ContactButton onClick={() => onCall(post.user.phone)}><img src={Call} alt='Call'/></ContactButton>
            <ContactButton onClick={() => onMessage(post.user.phone)}><img src={Message} alt='Message'/></ContactButton>
          </ContactButtons>
        )}
    </PostContainer>
  );
};

export default Post;

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
  border: 0.5px solid #E2E2E2;
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
  color: #8C8C8C;
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

const ContactButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 3px 5px;
  gap: 3px;
`;

const ContactButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 67px;
  height: 48px;
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
