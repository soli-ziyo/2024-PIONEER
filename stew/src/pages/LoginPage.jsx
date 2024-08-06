import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios";
import Logo from "../images/Logo.svg";

const LoginPage = () => {
  const navigate = useNavigate();
  const [ID, setID] = useState("");
  const [PW, setPW] = useState("");

  const pwInputRef = useRef(null);
  const idInputRef = useRef(null);
  //------------------------------------------------------------------------
  const goLogin = async () => {
    if (!ID && !PW) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    if (!ID) {
      alert("아이디를 입력해주세요.");
      idInputRef.current.focus(); 
      return;
    }
    if (!PW) {
      alert("비밀번호를 입력해주세요.");
      pwInputRef.current.focus(); 
      return;
    }

    try {
      const response = await instance.post(
        `${process.env.REACT_APP_SERVER_PORT}`,
        {
          username: ID,
          password: PW,
        }
      );
      console.log(response.data);

      const { username, access_token, id } = response.data.data;
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("username", username);
      localStorage.setItem("user_id", id);

    
      navigate("/home");
      window.location.reload();

      console.log("로그인 성공", response.data);
    } catch (error) {
      console.error(error);
      alert("로그인에 실패했습니다."); 
    }
  };

  return (
    <>
      <Wrapper>
        <Container>
          <img src={Logo} alt="Logo" />
          <InputWrapper>
            <div>아이디</div>
            <input
              ref={idInputRef}
              placeholder="아이디를 입력해주세요"
              onChange={(e) => setID(e.target.value)}
            />
            <div>비밀번호</div>
            <input
              ref={pwInputRef}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={(e) => setPW(e.target.value)}
            />
            <button
              onClick={goLogin}
              style={{
                backgroundColor: ID && PW ? "white" : "#F1F1F1",
                color: ID && PW ? "black" : "#8C8C8C",
                marginTop: "10%",
              }}
            >
              로그인
            </button>
            <button
              onClick={() => navigate("/signup")}
              style={{
                color: "#8C8C8C",
                background: "none",
                border: "none",
                fontWeight: "200",
              }}
            >
              회원가입
            </button>
          </InputWrapper>
        </Container>
      </Wrapper>
    </>
  );
};

export default LoginPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 390px;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: left;

  img {
    margin-top: 20%;

    margin-right: 30%;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 50%;
  height: 100%;

  div {
    font-size: 14px;
  }

  input,
  button {
    height: 45px;
    border-style: none;
    outline: none;
    border-radius: 4px;
  }

  input {
    margin-bottom: 15px;
    margin-top: 12px;
    padding-left: 7%;
    font-family: "Pretendard";
    border: 1px solid #e2e2e2;
    background: #f9f9f9;
    border-radius: 10px;
  }

  button {
    background: #f1f1f1;
    margin-bottom: 10px;
    color: #8c8c8c;
    border: 1px solid #e2e2e2;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    font-family: "Pretendard";
  }
`;
