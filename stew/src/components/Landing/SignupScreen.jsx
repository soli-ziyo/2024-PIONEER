import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Back from "../../images/Back.svg";

const SignupScreen = ({ nextStep, prevStep }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    nextStep(id, password);
  };

  return (
    <Wrapper>
      <Container>
        <ContainerBase>
          <img src={Back} alt="Back" onClick={() => navigate("/")} />
          <Comment></Comment>
        </ContainerBase>
        <InputWrapper>
          <Title>아이디</Title>
          <Input
            placeholder="아이디를 입력해주세요"
            onChange={(e) => setId(e.target.value)}
            value={id}
          ></Input>

          <Title>비밀번호</Title>
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></Input>
          <Explain
            style={{
              color: "#8C8C8C",
              fontSize: "13px",
              marginLeft: "20px",
            }}
          >
            비밀번호는 8글자 이상이어야 합니다.
          </Explain>
        </InputWrapper>
      </Container>
      <Button
        onClick={handleSubmit}
        style={{
          backgroundColor: id && password.length >= 8 ? "white" : "#F1F1F1",
          color: id && password.length >= 8 ? "black" : "#8C8C8C",
        }}
        disabled={!id || password.length < 8}
      >
        다음
      </Button>
    </Wrapper>
  );
};

export default SignupScreen;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 390px;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
`;

const ContainerBase = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: left;

  img {
    width: 8%;
    cursor: pointer;
    margin-bottom: 58px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const Title = styled.div`
  font-family: "Pretendard";
  font-size: 14px;
`;

const Explain = styled.div`
  font-family: "Pretendard";
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const Input = styled.input`
  height: 45px;
  font-family: "Pretendard";
  border: 1px solid #e2e2e2;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  width: 96%;
  padding-left: 4%;
  margin-top: 12px;
  margin-bottom: 16px;
  border-style: none;

  border: 1px solid #e2e2e2;
  align-items: center;
  background: #f9f9f9;
  border-radius: 10px;
  font-family: "Pretendard";
`;

const Comment = styled.div`
  font-size: 28px;
  font-family: "Pretendard";
`;

const Button = styled.button`
  height: 45px;
  border-style: none;
  outline: none;
  border-radius: 10px;
  background: #f1f1f1;
  color: #8c8c8c;
  border: 1px solid #e2e2e2;
  font-weight: 600;
  font-size: 14px;
  font-family: "Pretendard";
  cursor: pointer;
  position: absolute;
  width: 100%;
  bottom: 81px;
`;
