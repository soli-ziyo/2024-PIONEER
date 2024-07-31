import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//images
import Logo from "../images/Logo.svg";

const LoginPage = () => {
  const navigate = useNavigate();
  const [id, setID] = useState();
  const [pw, setPW] = useState();

  const baseurl = "https://minsol.pythonanywhere.com/";
  //------------------------------------------------------------------------
  const goLogin = async () => {
    await axios({
      method: "POST",
      url: `${baseurl}accounts/login/`,
      data: {
        username: id,
        password: pw,
      },
    })
      .then((response) => {
        // localStorage에 저장
        const { username } = response.data;
        const { access_token } = response.data;
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("username", username);

        // HomePage로 이동
        navigate("/home");

        console.log("로그인 성공", response.data);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  };

  return (
    <>
      <Wrapper>
        <Container>
          <img src={Logo} alt="Logo" />
          <InputWrapper>
            <div>아이디</div>
            <input
              placeholder="아이디를 입력해주세요"
              onChange={(e) => setID(e.target.value)}
            ></input>
            <div>비밀번호</div>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={(e) => setPW(e.target.value)}
            ></input>
            <button onClick={goLogin} style={{ marginTop: "10%" }}>
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
    margin-right: 40%;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  margin-top: 30px;
  /* font-family: "Pretendard"; */

  div {
    /* font-family: "Pretendard"; */
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
