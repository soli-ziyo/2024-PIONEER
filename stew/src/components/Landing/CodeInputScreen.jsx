import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Back from "../../images/Back.svg";
import instance from "../../api/axios";

const CodeInputScreen = ({ nextStep, prevStep, code }) => {
  const [Usercode, setUserCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [codecheck, setCodeCheck] = useState(false);

  const handleChange = (e, index) => {
    const newCode = [...Usercode];
    newCode[index] = e.target.value;
    setUserCode(newCode);

    if (e.target.value && index < 3) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  // const handleNext = async () => {
  const handleNext = () => {
    setLoading(true);
    setError(null);

    const codeStr = Usercode.join("");
    setCodeCheck(codeStr === code);

    if (codeStr === code) {
      console.log("sms 인증에 성공하였습니다.");
      nextStep();
    } else {
      setError("인증에 실패하였습니다. 인증번호를 확인해주세요.");
    }
    setLoading(false);
  };

  return (
    <Wrapper>
      <Container>
        <ContainerBase>
          <img src={Back} alt="Back" onClick={prevStep} />
          <Comment>인증 코드를 발송했어요.</Comment>
        </ContainerBase>
        <CodeInputs>
          {Usercode.map((digit, index) => (
            <CodeInput
              key={index}
              id={`code-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
            />
          ))}
          {loading && (
            <LoadingMessage>인증번호를 확인 중입니다...</LoadingMessage>
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </CodeInputs>

        <Button
          onClick={handleNext}
          // onClick={nextStep}
          disabled={Usercode.some((digit) => digit === "")}
        >
          다음
        </Button>
      </Container>
    </Wrapper>
  );
};

export default CodeInputScreen;

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
    margin-bottom: 58px;
    cursor: pointer;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const CodeInputs = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 52px;
  width: 100%;
`;

const CodeInput = styled.input`
  width: 65px;
  height: 65px;
  border: 1px solid #e2e2e2;
  background: #f9f9f9;
  border-radius: 10px;
  text-align: center;
  font-size: 18px;
  outline: none;

  font-family: "Pretendard";
`;

const Button = styled.button`
  height: 45px;
  border-style: none;
  outline: none;
  border-radius: 4px;
  background: ${(props) => (props.disabled ? "#F1F1F1" : "white")};
  color: ${(props) => (props.disabled ? "#8C8C8C" : "black")};
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #e2e2e2;
  font-family: "Pretendard";
  position: absolute;
  width: 100%;
  bottom: 81px;
`;

const Comment = styled.div`
  font-size: 28px;
  font-family: "Pretendard";
`;

const ErrorMessage = styled.div`
  color: red;
  font-family: "Pretendard";
  font-size: 14px;
  z-index: 10;
  position: absolute;
  top: 90px;
`;

const LoadingMessage = styled.div`
  color: red;
  font-family: "Pretendard";
  font-size: 14px;
  z-index: 10;
  position: absolute;
  top: 90px;
`;
