import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Back from "../../images/Back.svg";
import instance from "../../api/axios";

const CodeInputScreen = ({ phone, nextStep, prevStep }) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setError(null);
    try {
      const codeStr = code.join("");
      console.log("Submitting code:", codeStr);
      const response = await instance.post(
        `${process.env.REACT_APP_SERVER_PORT}/accounts/phonenum/getCode/`,
        { code: codeStr }
      );
      console.log(code);
      if (response.status === 200) {
        console.log("sms 인증에 성공하였습니다.", response.data.message);
        nextStep();
      }
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        if (status === 400) {
          if (data.error === "인증 코드 오류") {
            setError("인증에 실패하였습니다. 인증번호를 확인해주세요.");
            console.log(error);
          } else if (data.error === "인증코드가 입력되지 않았습니다.") {
            setError(
              "인증코드가 입력되지 않았습니다. 인증코드를 입력해주세요."
            );
            console.log(error);
          } else {
            setError("잘못된 요청입니다.");
          }
        } else if (status === 500) {
          setError("서버 오류입니다. 잠시 후 다시 시도해주세요.");
        }
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
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
            <LoadingMessage>인증번호를 확인 중입니다...</LoadingMessage>
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </InputWrapper>
        <Button
          onClick={handleNext}
          // onClick={nextStep}
          disabled={code.some((digit) => digit === "")}
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
  width: 100%;
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
  margin-bottom: 68%;

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
`;

const Comment = styled.div`
  font-size: 28px;
  margin-bottom: 20px;
  font-family: "Pretendard";
`;

const ErrorMessage = styled.div`
  color: red;
  font-family: "Pretendard";
  font-size: 14px;
  margin-top: -65%;
  z-index: 10;
  margin-bottom: 61%;
`;

const LoadingMessage = styled.div`
  color: red;
  font-family: "Pretendard";
  font-size: 14px;
  margin-top: -65%;
  z-index: 10;
  margin-bottom: 61%;
`;
