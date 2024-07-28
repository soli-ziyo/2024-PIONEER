import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

//images
import Back from "../../images/Back.svg";

const CodeInputScreen = ({ phone, nextStep, prevStep }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNext = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/accounts/certify/confirm/", {
        phone: phone,
        certificationNumber: code,
      });
      console.log(response.data);
      nextStep();
    } catch (err) {
      setError("인증번호 확인에 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Container>
        <ContainerBase>
          <img src={Back} alt="Back" onClick={prevStep} />
          <Comment>인증 코드를 발송했어요.</Comment>
        </ContainerBase>
        <InputWrapper>
          <input
            placeholder="인증 코드를 입력해주세요"
            onChange={(e) => setCode(e.target.value)}
            value={code}
          ></input>
          <button
            style={{
              backgroundColor: code.length === 4 ? "white" : "#F1F1F1",
              color: code.length === 4 ? "black" : "#8C8C8C",
            }}
            onClick={handleNext}
            disabled={code.length !== 4}
          >
            다음
          </button>
        </InputWrapper>
        {loading && <p>인증번호를 확인 중입니다...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Container>
    </Wrapper>
  );
};

export default CodeInputScreen;

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

  input {
    margin-bottom: 80%;
    padding-left: 7%;
    border: 1px solid #e2e2e2;
    background: #ffffff;
    border-radius: 10px;
  }

  button {
    margin-bottom: 10%;
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
