import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
//images
import Back from "../../images/Back.svg";

const ProfileSetupScreen = ({ prevStep }) => {
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = () => {
    // 여기에서 프로필 설정 로직을 추가할 수 있습니다.
    console.log("프로필 설정 완료");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
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
                  src={profileImage}
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
          <div>닉네임</div>
          <input
            placeholder="닉네임을 입력해주세요"
            onChange={(e) => setNickname(e.target.value)}
            value={nickname}
          ></input>
          <div
            style={{
              color: "#8C8C8C",
              fontSize: "13px",
              marginLeft: "20px",
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
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ContainerBase = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: left;

  img {
    width: 8%;
    margin-bottom: 58px;
    margin-top: 40px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  margin-top: 30px;

  input,
  button {
    height: 45px;
    border-style: none;
    outline: none;
    border-radius: 4px;
  }

  div {
    font-family: "Pretendard";
  }

  input {
    padding-left: 7%;
    border: 1px solid #f1f1f1;
    background: #ffffff;
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
    border: 1px solid #f1f1f1;
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
  font-size: 50px;
  color: #f1f1f1;
`;
