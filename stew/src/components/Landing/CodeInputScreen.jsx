import React, { useState } from "react";
import styled from "styled-components";
import Back from "../../images/Back.svg";
import instance from "../../api/axios";

const CodeInputScreen = ({ nextStep, prevStep }) => {
  const [code, setCode] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [buttonReady, setButtonReady] = useState(false);

  const [error, setError] = useState(null);

  const codeVery = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Submitting code:", code);
      const response = await instance.post(
        `${process.env.REACT_APP_SERVER_PORT}/accounts/phonenum/getCode/`,
        {
          code: code,
        }
      );
      console.log("Response:", response);
      if (response.status === 200) {
        console.log("sms 인증에 성공하였습니다.", response.data);
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

  const handleChange = (text) => {
    setCode(text);
    if (text.length === 4) {
      setButtonReady(true);
    } else {
      setButtonReady(false);
    }
  };

  const handleNext = () => {
    setCode(code);
    codeVery().then();
  };

  return (
    <Wrapper>
      <Container>
        <ContainerBase>
          <img src={Back} alt="Back" onClick={prevStep} />
          <Comment>인증 코드를 발송했어요.</Comment>
        </ContainerBase>
        <InputWrapper
          placeholder="인증코드를 입력해주세요"
          onChange={(e) => handleChange(e.target.value)}
          value={code}
        ></InputWrapper>

        {loading && (
          <LoadingMessage>인증번호를 확인 중입니다...</LoadingMessage>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button
          style={{
            backgroundColor: buttonReady ? "white" : "#F1F1F1",
            color: buttonReady ? "black" : "#8C8C8C",
          }}
          onClick={handleNext}
          disabled={!buttonReady}
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

const InputWrapper = styled.input`
  display: flex;
  flex-direction: column;
  width: 90%;
  position: relative;

  border-style: none;
  border-radius: 4px;
  top: 52px;
  padding: 14px 16px;
  border: 1px solid #e2e2e2;
  align-items: center;
  background: #f9f9f9;
  border-radius: 10px;
  font-family: "Pretendard";
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
  top: 230px;
`;

const LoadingMessage = styled.div`
  color: red;
  font-family: "Pretendard";
  font-size: 14px;
  z-index: 10;
  position: absolute;
  top: 230px;
`;
