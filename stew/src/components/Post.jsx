import React, { useState } from "react";
import styled from "styled-components";
import DeleteModal from "./Delete";

import SelectImoji from "./SelectImoji";
import ImojiDash from "../images/Imoji_dash.svg";
import Call from "../images/Call.svg";
import Message from "../images/Message.svg";
import instance from "../api/axios";
import Trash from "../images/Trash.svg";

const Post = ({
  post,
  onCall,
  onMessage,
  isCurrentUserPage,
  currentUser,
  onDelete,
}) => {
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEmojiClick = () => {
    setShowEmojiSelector(true);
  };

  const handleSelectEmoji = async (emoji) => {
    const accessToken = localStorage.getItem("accessToken");
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

  const openDeleteModal = () => setShowDeleteModal(true);
  const closeDeleteModal = () => setShowDeleteModal(false);

  const handleDeletePost = async () => {
    try {
      const response = await instance.delete(
        `${process.env.REACT_APP_SERVER_PORT}/interest/list/${post.id}/delete/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Post deleted successfully");
        closeDeleteModal();
        onDelete(post.id);
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
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
      {currentUser && currentUser.user_id === post.user.id && (
        <DeleteBtn onClick={openDeleteModal}>
          <img src={Trash} alt="Delete" />
        </DeleteBtn>
      )}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDeletePost}
      />
      {showEmojiSelector && (
        <SelectImoji
          onClose={() => setShowEmojiSelector(false)}
          onSelect={handleSelectEmoji}
        />
      )}
      {isCurrentUserPage && (
        <ContactButtons>
          <ContactButton
            onClick={() => {
              onCall(post.user.phonenum);
            }}
          >
            <img src={Call} alt="Call" />
          </ContactButton>
          <ContactButton
            onClick={() => {
              onMessage(post.user.phonenum);
            }}
          >
            <img src={Message} alt="Message" />
          </ContactButton>
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
  background-color: white;
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
  background-color: white;
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

const DeleteBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 48px;
  margin: 3px 5px;
  border-radius: 21px;
  border: 0.5px #e2e2e2;
  background: #fff;
  cursor: pointer;

  img {
    width: 22px;
    height: 18px;
  }
`;

const ContactButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 3px 11px;
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
  }
`;

const EmojiDisplay = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 3px;
`;

const EmojiImg = styled.img`
  width: 24px;
  height: 24px;
`;
