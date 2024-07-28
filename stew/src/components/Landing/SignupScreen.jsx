import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//images
import Back from "../../images/Back.svg";

const SignupScreen = ({ nextStep, prevStep }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phonenum, setPhonenum] = useState(""); // 이 값을 필요에 따라 설정해야 합니다.
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/accounts/signup/", {
        username: id,
        password: password,
        nickname: nickname,
        phonenum: phonenum,
        profile: profile,
      });
      console.log("회원가입 완료", response);
      nextStep();
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  return (
    <Wrapper>
      <Container>
        <ContainerBase>
          <img src={Back} alt="Back" onClick={() => navigate("/")} />
          <Comment></Comment>
        </ContainerBase>
        <InputWrapper>
          <div>아이디</div>
          <input
            placeholder="아이디를 입력해주세요"
            onChange={(e) => setId(e.target.value)}
            value={id}
          ></input>
          <div>비밀번호</div>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
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
            비밀번호는 8글자 이상이어야 합니다.
          </div>
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: id && password && nickname ? "white" : "#F1F1F1",
              color: id && password && nickname ? "black" : "#8C8C8C",
            }}
            disabled={!id || !password || !nickname}
          >
            다음
          </button>
        </InputWrapper>
      </Container>
    </Wrapper>
  );
};

export default SignupScreen;

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
    margin-bottom: 40px;
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

  input {
    margin-bottom: 5%;
    padding-left: 7%;
    border: 1px solid #e2e2e2;
    background: #ffffff;
    border-radius: 10px;
  }

  div {
    font-family: "Pretendard";
  }

  button {
    margin-bottom: 20%;
    background: #f1f1f1;
    color: #8c8c8c;
    border: 1px solid #e2e2e2;
    font-weight: 600;
    font-size: 14px;
    margin-top: 50%;
  }
`;

const Comment = styled.div`
  font-size: 28px;
  margin-bottom: 20px;
  font-family: "Pretendard";
`;
