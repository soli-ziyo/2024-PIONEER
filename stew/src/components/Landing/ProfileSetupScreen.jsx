import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// images
import Back from "../../images/Back.svg";
import instance from "../../api/axios";

const ProfileSetupScreen = ({ id, password, prevStep, nextStep }) => {
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  // const baseurl = "https://minsol.pythonanywhere.com/";

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("username", id);
      formData.append("password", password);
      formData.append("nickname", nickname);

      if (profileImage) {
        formData.append("profile", profileImage);
      }

      const response = await instance.post(
        `${process.env.REACT_APP_SERVER_PORT}/accounts/signup/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("회원가입 성공");
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  return (
    <Wrapper>
      <Container>
        <ContainerBase>
          <img src={Back} alt="Back" onClick={prevStep} />
        </ContainerBase>
        <InputWrapper>
          <ImageUploadWrapper>
            <label htmlFor="image-upload" className="image-upload-label">
              {profileImage ? (
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="Profile"
                  className="profile-image"
                />
              ) : (
                <PlusIcon>+</PlusIcon>
              )}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </ImageUploadWrapper>
          <div style={{ marginBottom: "10px" }}>닉네임</div>
          <input
            placeholder="닉네임을 입력해주세요"
            onChange={(e) => setNickname(e.target.value)}
            value={nickname}
            style={{ fontFamily: "Pretendard" }}
          ></input>
          <div
            style={{
              color: "#8C8C8C",
              fontSize: "13px",
              marginLeft: "20px",
              marginBottom: "50%",
              marginTop: "5%",
            }}
          >
            닉네임은 2글자 이상 10글자 이하여야 합니다.
          </div>
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor:
                nickname.length >= 2 && nickname.length <= 10
                  ? "#FF5A00"
                  : "lightgray",
              color:
                nickname.length >= 2 && nickname.length <= 10
                  ? "white"
                  : "#8c8c8c",
            }}
            disabled={nickname.length < 2 || nickname.length > 10}
          >
            stew 시작하기
          </button>
        </InputWrapper>
      </Container>
    </Wrapper>
  );
};

export default ProfileSetupScreen;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

const ContainerBase = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: left;

  img {
    width: 8%;
    margin-bottom: 58px;
    margin-top: 40px;
    cursor: pointer;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 8px;

  input,
  button {
    height: 45px;
    border-style: none;
    outline: none;
    border-radius: 4px;
    font-family: "Pretendard";
  }

  div {
    font-family: "Pretendard";
  }

  input {
    padding-left: 7%;
    border: 1px solid #f1f1f1;
    background: #f9f9f9;
    border-radius: 10px;
  }

  button {
    margin-bottom: 20%;
    background: #f1f1f1;
    color: #8c8c8c;
    border: 1px solid #e2e2e2;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
  }
`;

const Comment = styled.div`
  font-size: 28px;
  margin-bottom: 20px;
  font-family: "Pretendard";
`;

const ImageUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;

  .image-upload-label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    border: 3px solid #f1f1f1;
    border-radius: 50%;
    cursor: pointer;
  }

  .profile-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const PlusIcon = styled.div`
  font-size: 60px;
  font-weight: 100;
  color: #222222;
`;
