import React, { useState } from 'react';
import styled from 'styled-components';
import SelectImoji from './SelectImoji';
import ImojiDash from '../images/Imoji_dash.svg'; 

const Post = ({ post, currentUser, onCall, onMessage, isCurrentUserPage }) => {
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

  const handleSelectEmoji = (emoji) => {
    setSelectedEmoji(emoji);
    setShowEmojiSelector(false);
  };

  return (
    <PostContainer>
      <PostImage src={post.img} alt={post.description} />
      <PostContent>
        <PostUser>
          <UserProfile src={post.user.image} alt={post.user.nickname} />
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
              <EmojiDisplay>{selectedEmoji}</EmojiDisplay>
            )}
          </PostTime>
        </PostUser>
        <PostDescription>{post.description}</PostDescription>
        {!isCurrentUserPage && (
          <ContactButtons>
            <ContactButton onClick={() => onCall(post.user.phone)}>📞</ContactButton>
            <ContactButton onClick={() => onMessage(post.user.phone)}>💬</ContactButton>
          </ContactButtons>
        )}
      </PostContent>
      {showEmojiSelector && <SelectImoji onClose={() => setShowEmojiSelector(false)} onSelect={handleSelectEmoji} />}
    </PostContainer>
  );
};

export default Post;

const PostContainer = styled.div`
  margin-bottom: 20px;
  border: 1px solid #E2E2E2;
  border-radius: 10px;
  overflow: hidden;
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
`;

const PostContent = styled.div`
  padding: 10px;
`;

const PostUser = styled.div`
  display: flex;
  align-items: center;
`;

const UserProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.div`
  font-weight: bold;
  margin-right: auto;
`;

const PostTime = styled.div`
  font-size: 12px;
  color: #888;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const PostDescription = styled.div`
  margin: 10px 0;
`;

const ContactButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ContactButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin-left: 10px;
`;

const EmojiButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 24px;

  img {
    width: 24px;
    height: 24px;
  }
`;

const EmojiDisplay = styled.div`
  font-size: 24px;
`;

const EmojiImg = styled.img`
  width: 24px;
  height: 24px;
`;
