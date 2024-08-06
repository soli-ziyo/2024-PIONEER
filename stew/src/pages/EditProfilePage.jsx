import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import Close from "../images/Close.svg";
import instance from "../api/axios";

const currentUserId = parseInt(localStorage.getItem("user_id"));

const EditProfilePage = () => {
  const location = useLocation();
  const { myProfile } = location.state || {};

  // const [phonenum, setPhonenum] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [originalProfile, setOriginalProfile] = useState(myProfile);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    if (!nickname && !password) {
      console.error("수정할 내용이 없습니다.");
      return;
    }
    try {
      const response = await instance.put(
        `${process.env.REACT_APP_SERVER_PORT}/settings/profile/`,

        {
          nickname: nickname || undefined,
          password: password || undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (
        response.status === 200 &&
        response.data.message === "프로필 업데이트 성공"
      ) {
        console.log(response.data);
        navigate("/settings/profile/");
      } else {
        console.error("상태 저장 실패");
        console.error(response.data.errors);
      }
    } catch (error) {
      console.error("에러 발생", error);
      if (error.response) {
        console.error("에러 데이터:", error.response.data);
      }
    }
  };

  return (
    <Wrapper>
      <Header>
        <CloseButton onClick={() => navigate("/settings/profile")}>
          <img src={Close} alt="Close" />
        </CloseButton>
        <Title>프로필 편집</Title>
      </Header>
      <Form onSubmit={handleSubmit}>
        <ProfileImageWrapper>
          <ProfileImage src={myProfile} alt="Profile" />
        </ProfileImageWrapper>
        <InputWrapper>
          {/* <Div>전화번호</Div>
          <input
            placeholder="전화번호를 입력해주세요"
            onChange={(e) => setPhonenum(e.target.value)}
            value={phonenum}
          ></input> */}
          <Div>비밀번호</Div>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
          <Div>닉네임</Div>
          <input
            placeholder="닉네임을 입력해주세요"
            onChange={(e) => setNickname(e.target.value)}
            value={nickname}
          ></input>
          <button
            type="submit"
            onClick={handleSubmit}
            style={{
              backgroundColor:
                password.length >= 8 || nickname ? "white" : "#F1F1F1",
              color: password.length >= 8 || nickname ? "black" : "#8C8C8C",
            }}
            disabled={password.length < 8 && !nickname}
          >
            저장
          </button>
        </InputWrapper>
      </Form>
    </Wrapper>
  );
};

export default EditProfilePage;

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
  width: 19px;
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

const ProfileImageWrapper = styled.div`
  position: relative;
`;

const ProfileImage = styled.img`
  width: 102px;
  height: 102px;
  border-radius: 50%;
  border: 2px solid #e2e2e2;
  object-fit: cover;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  align-items: left;

  input,
  button {
    height: 40px;
    border-style: none;
    outline: none;
    border-radius: 4px;
    font-family: "Pretendard";
  }

  input {
    margin-bottom: 4%;
    padding-left: 7%;
    border: 1px solid #e2e2e2;
    background: #f9f9f9;
    border-radius: 10px;
    font-family: "Pretendard";
    font-weight: 400;
  }

  button {
    margin-top: 15%;
    background: #f1f1f1;
    color: #8c8c8c;
    border: 1px solid #e2e2e2;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
  }
`;

const Div = styled.div`
  font-family: "Pretendard";
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 600;
`;
