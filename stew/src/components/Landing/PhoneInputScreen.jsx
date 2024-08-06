import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Back from "../../images/Back.svg";
import instance from "../../api/axios";

const PhoneInputScreen = ({ setPhone, nextStep, prevStep }) => {
  const [phoneNB, setPhoneNB] = useState("");
  const [buttonReady, setButtonReady] = useState(false);
  const navigate = useNavigate();

  const phonenum = async () => {
    try {
      const response = await instance.post(
        `${process.env.REACT_APP_SERVER_PORT}/accounts/phonenum/sendCode/`,
        {
          phonenum: phoneNB,
        }
      );
      if (response.status === 200) {
        console.log("본인확인 sms 전송 성공", response.data.message);
        nextStep();
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          console.error("휴대폰 번호가 필요합니다:", data.error);
        } else if (status === 500) {
          console.error(
            "인증 코드를 발송하는 데에 실패하였습니다:",
            data.error
          );
        }
      } else {
        console.error("알 수 없는 오류:", error);
      }
    }
  };

  const handleChange = (text) => {
    setPhoneNB(text);
    if (text.length === 11) {
      setButtonReady(true);
    } else {
      setButtonReady(false);
    }
  };

  const handleNext = () => {
    setPhone(phoneNB);
    phonenum().then(() => nextStep());
  };

  return (
    <Wrapper>
      <Container>
        <ContainerBase>
          <img src={Back} alt="Back" onClick={() => navigate("/")} />
          <Comment>전화번호를 알려주세요</Comment>
        </ContainerBase>
        <InputWrapper>
          <input
            placeholder="전화번호를 입력해주세요"
            onChange={(e) => handleChange(e.target.value)}
            value={phoneNB}
          ></input>
          <button
            style={{
              backgroundColor: buttonReady ? "white" : "#F1F1F1",
              color: buttonReady ? "black" : "#8C8C8C",
            }}
            // onClick={handleNext}
            onClick={nextStep}
            disabled={!buttonReady}
          >
            다음
          </button>
        </InputWrapper>
      </Container>
    </Wrapper>
  );
};

export default PhoneInputScreen;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 390px;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

const ContainerBase = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: left;

  img {
    width: 8%;
    margin-bottom: 58px;
    margin-top: 40px;
    cursor: pointer;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
    background: #f9f9f9;
    border-radius: 10px;
    font-family: "Pretendard";
  }

  button {
    margin-bottom: 20%;
    background: #f1f1f1;
    color: #8c8c8c;
    border: 1px solid #e2e2e2;
    font-weight: 600;
    font-size: 14px;
    font-family: "Pretendard";
    cursor: pointer;
  }
`;

const Comment = styled.div`
  font-size: 28px;
  margin-bottom: 20px;
  font-family: "Pretendard";
`;
