import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Back from "../../images/Back.svg";
import instance from "../../api/axios";

const CodeInputScreen = ({ phone, nextStep, prevStep }) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const baseurl = "https://minsol.pythonanywhere.com/";

  const handleChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);

    if (e.target.value && index < 3) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  const handleNext = async () => {
    setLoading(true);
    try {
      const response = await instance.post(
        `${process.env.REACT_APP_SERVER_PORT}/accounts/phonenum/getcode/`,
        {
          code: code.join(""), //문자열 결합
        }
      );
      console.log("sms 인증에 성공하였습니다.");
      nextStep();
    } catch (err) {
      setError("인증에 실패하였습니다. 인증번호를 확인해주세요.");
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
          <CodeInputs>
            {code.map((digit, index) => (
              <CodeInput
                key={index}
                id={`code-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
              />
            ))}
          </CodeInputs>
          {loading && (
            <p
              style={{
                fontFamily: "Pretendard",
                fontSize: "14px",
                marginBottom: "-10%",
                color: "red",
              }}
            >
              인증번호를 확인 중입니다...
            </p>
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button
            onClick={handleNext}
            // onClick={nextStep}
            disabled={code.some((digit) => digit === "")}
          >
            다음
          </Button>
        </InputWrapper>
      </Container>
    </Wrapper>
  );
};

export default CodeInputScreen;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 390px;
  height: 100%;
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
`;

const CodeInputs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
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
  margin-bottom: 10%;
  margin-top: 75%;
  font-family: "Pretendard";
`;

const Comment = styled.div`
  font-size: 28px;
  margin-bottom: 20px;
  font-family: "Pretendard";
`;

const ErrorMessage = styled.p`
  color: red;
  font-family: "Pretendard";
  font-size: 14px;
  margin-bottom: -10%;
`;
