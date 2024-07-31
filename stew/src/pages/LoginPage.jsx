import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// images
import Logo from "../images/Logo.svg";

const LoginPage = () => {
  const navigate = useNavigate();
  const [id, setID] = useState("");
  const [pw, setPW] = useState("");

  const pwInputRef = useRef(null);
  const idInputRef = useRef(null);

  const baseurl = "https://minsol.pythonanywhere.com/";
  //------------------------------------------------------------------------
  const goLogin = async () => {
    if (!id && !pw) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    if (!id) {
      alert("아이디를 입력해주세요.");
      idInputRef.current.focus(); // 아이디 입력란으로 포커스 이동
      return;
    }
    if (!pw) {
      alert("비밀번호를 입력해주세요.");
      pwInputRef.current.focus(); // 비밀번호 입력란으로 포커스 이동
      return;
    }

    // 로그인 요청
    try {
      const response = await axios.post(`${baseurl}accounts/login/`, {
        username: id,
        password: pw,
      });

      // localStorage에 저장
      const { username, access_token } = response.data;
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("username", username);

      // HomePage로 이동
      navigate("/home");
      console.log("로그인 성공", response.data);
    } catch (error) {
      console.error(error);
      alert("로그인에 실패했습니다."); // 로그인 실패 시 알림
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
                backgroundColor: id && pw ? "white" : "#F1F1F1",
                color: id && pw ? "black" : "#8C8C8C",
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
  max-width: 390px;
  height: 100%;
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin-top: 20%;
    margin-bottom: 40%;
    margin-right: 50%;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 160%;
  margin-top: 50%;

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
    margin-bottom: 10px;
    background: #f1f1f1;
    color: #8c8c8c;
    border: 1px solid #e2e2e2;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    font-family: "Pretendard";
  }
`;
