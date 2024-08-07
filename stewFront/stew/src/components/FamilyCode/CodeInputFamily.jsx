import React, { useState } from "react";
import styled from "styled-components";
import Back from "../../images/Back.svg";
import instance from "../../api/axios";
import { useNavigate } from "react-router-dom";
//가족코드

const CodeInputFamily = ({
  prevStep,
  setHideElements,
  setHideInviteNotice,
  setHideInputNotice,
}) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getFamilycode = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await instance.get(
        `${process.env.REACT_APP_SERVER_PORT}/family/code/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.data.message === "패밀리코드가 이미 존재합니다.") {
        const existingCode = response.data.familycode;
        await deleteFamilycode(existingCode);
      } else {
        await postFamilycode();
      }
    } catch (error) {
      setError("가족 코드 확인 중 오류가 발생했습니다.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFamilycode = async (existingCode) => {
    setError(null);
    try {
      await instance.delete(
        `${process.env.REACT_APP_SERVER_PORT}/family/create/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          data: {
            familycode: existingCode,
          },
        }
      );
      await postFamilycode();
    } catch (error) {
      setError("가족 코드 삭제 중 오류가 발생했습니다.");
      console.log(error);
    }
  };

  const postFamilycode = async () => {
    const inputCode = code.join("");
    setError(null);
    try {
      const response = await instance.post(
        `${process.env.REACT_APP_SERVER_PORT}/family/create/`,
        {
          familycode: inputCode,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        prevStep();
        setHideElements(false);
        setHideInputNotice(true);
        setHideInviteNotice(true);
        window.location.reload();
      }
    } catch (error) {
      setError("가족 코드 생성 중 오류가 발생했습니다.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);

    if (e.target.value && index < 3) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  const handleNext = () => {
    if (code.some((digit) => digit === "")) {
      setError("모든 칸을 입력해주세요.");
      return;
    }
    setError(null);
    getFamilycode();
  };

  const closeInput = () => {
    navigate("/home");
    setHideElements(false);
    setHideInputNotice(false);
    setHideInviteNotice(false);
  };

  return (
    <Wrapper>
      <Container>
        <ContainerBase>
          <img src={Back} alt="Back" onClick={closeInput} />
          <Comment>가족 코드를 입력해주세요.</Comment>
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
            <LoadingMessage>가족코드를 확인 중입니다...</LoadingMessage>
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button
            onClick={handleNext}
            disabled={loading}
          >
            다음
          </Button>
        </InputWrapper>
      </Container>
    </Wrapper>
  );
};

export default CodeInputFamily;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 390px;
  width: 100%;
  height: 100%;
`;

const ContainerBase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

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
  align-items: flex-start;
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
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
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

const LoadingMessage = styled.p`
  font-family: "Pretendard";
  font-size: 14px;
  color: red;
  margin-bottom: -10%;
`;
