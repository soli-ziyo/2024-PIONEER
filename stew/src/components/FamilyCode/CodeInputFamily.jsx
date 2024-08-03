import React, { useState } from "react";
import styled from "styled-components";
import Back from "../../images/Back.svg";
import useFamilyStore from "../../stores/familyStore";

const CodeInputFamily = ({
  nextStep,
  prevStep,
  setHideElements,
  setHideInviteNotice,
  setHideInputNotice,
}) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const { setFamilycode, submitFamilycode } = useFamilyStore();
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
    const familycode = code.join("");
    setFamilycode(familycode); // Update familycode in Zustand store

    try {
      await submitFamilycode(familycode);
      // 요청이 성공한 경우
      prevStep();
      setHideElements(false);
      setHideInputNotice(true);
      setHideInviteNotice(true);
      window.location.reload();
    } catch (err) {
      if (err.message === "이미 가족에 속해있습니다.") {
        setError(err.message);
      } else {
        setError("가족 코드 확인 중 오류가 발생했습니다.");
        window.location.reload();
      }
    } finally {
      setLoading(false);
    }
  };

  const closeInput = () => {
    prevStep();
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
            disabled={code.some((digit) => digit === "") || loading}
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
  height: 100%;
`;

const ContainerBase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  img {
    width: 8%;
    margin-bottom: 58px;
    margin-top: 0px;
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
