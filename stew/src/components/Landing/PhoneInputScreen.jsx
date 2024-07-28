import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//images
import Back from "../../images/Back.svg";

const PhoneInputScreen = ({ setPhone, nextStep, prevStep }) => {
  const [phoneNB, setPhoneNB] = useState("");
  const [buttonReady, setButtonReady] = useState(false);
  const navigate = useNavigate();

  const phonenum = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "/accounts/certify/send/",
        params: {
          phone: phoneNB,
        },
      });
      console.log("본인확인 sms 전송 성공", response);
      nextStep();
    } catch (error) {
      console.log(error);
      throw new Error(error);
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
    phonenum();
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
