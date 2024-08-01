import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SelectStateImoji from "../components/SelectStateImoji";
import axios from "axios";
import Close from "../images/Close.svg";

const ChangeState = () => {
  const [content, setContent] = useState("오늘 저녁 메뉴: 칼국수");
  const [profileImage, setProfileImage] = useState(require("../images/me.jpg"));
  const [emoji, setEmoji] = useState("😲");
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      const context = document.createElement("canvas").getContext("2d");
      context.font = "16px Pretendard";
      const width = context.measureText(content).width;
      inputRef.current.style.width = `${width + 16}px`;
    }
  }, [content]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(URL.createObjectURL(file));
  };

  const handleEmojiClick = () => {
    setShowEmojiSelector(true);
  };

  const handleSelectEmoji = (selectedEmoji) => {
    setEmoji(selectedEmoji);
    setShowEmojiSelector(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("emoji", emoji);
      formData.append("profile", profileImage); // Update this line to append the file instead of URL.createObjectURL

      const response = await axios.put(
        "http://localhost:5000/updateState",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("State updated successfully");
        navigate("/home");
      } else {
        console.error("Failed to update state");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <Wrapper>
      <Header>
        <CloseButton onClick={() => navigate("/home")}>
          <img src={Close} alt="Close" />
        </CloseButton>
        <Title>상태 편집</Title>
      </Header>
      <Form onSubmit={handleSubmit}>
        <ContentInput
          type="text"
          value={content}
          onChange={handleContentChange}
          ref={inputRef}
        />
        <ProfileImageWrapper>
          <ProfileImage
            src={profileImage}
            alt="Profile"
            onClick={() => document.getElementById("profileImageInput").click()}
          />
          <ProfileImageInput
            id="profileImageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </ProfileImageWrapper>
        <EmojiWrapper onClick={handleEmojiClick}>{emoji}</EmojiWrapper>
        <SubmitButton type="submit">완료</SubmitButton>
      </Form>
      {showEmojiSelector && (
        <SelectStateImoji
          onClose={() => setShowEmojiSelector(false)}
          onSelect={handleSelectEmoji}
        />
      )}
    </Wrapper>
  );
};

export default ChangeState;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 40px;
`;

const CloseButton = styled.div`
  cursor: pointer;
  img {
    width: 19px;
    height: 19px;
  }
  margin: 3px 0 0 3px;
`;

const Title = styled.h1`
  color: #000;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ContentInput = styled.input`
  display: flex;
  width: auto;
  min-width: 40px;
  max-width: 230px;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 11px 14px;
  border-radius: 21px;
  border: 0.5px solid #ff5a00;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
  margin: 50px 0 27px;

  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;

  &:focus {
    outline: none;
    border: 0.5px solid #ff5a00;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
  }
`;

const ProfileImageWrapper = styled.div`
  position: relative;
`;

const ProfileImage = styled.img`
  width: 126px;
  height: 126px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
`;

const ProfileImageInput = styled.input`
  display: none;
`;

const EmojiWrapper = styled.div`
  font-size: 32px;
  cursor: pointer;
  margin-top: 27px;

  background-color: #fff;
  width: 52px;
  height: 52px;
  border-radius: 26px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitButton = styled.button`
  position: absolute;
  bottom: 85px;
  width: 122px;
  height: 54px;
  padding: 15px 44px;
  border-radius: 32px;
  border: 1px solid #e2e2e2;
  background: #fff;

  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;

  &:hover {
    color: #ff5a00;
    border: 1px solid #ff5a00;
  }
`;
