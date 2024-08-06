import React, { useState, useEffect } from "react";
import styled from "styled-components";
import instance from "../../api/axios";
import { useFamilycodeStore } from "../../stores/FamilycodeStore";
import Close from "../../images/Close.svg";
import { useNavigate } from "react-router-dom";

const CodeInvite = ({
  prevStep,
  setHideElements,
  setHideInviteNotice,
  setHideInputNotice,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { familycode, fetchFamilycode } = useFamilycodeStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCode = async () => {
      setLoading(true);
      setError("");
      try {
        await fetchFamilycode();
        console.log(familycode);
      } catch (err) {
        setError("가족 코드를 가져오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCode();
  }, [fetchFamilycode, familycode]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(familycode)
      .then(() => alert("가족 코드가 클립보드에 복사되었습니다."))
      .catch((err) => setError("클립보드에 복사하는 중 오류가 발생했습니다."));
  };

  const closeInvite = () => {
    navigate("/home");
    window.location.reload();

    // setHideElements(false);
    // setHideInputNotice(true);
    // setHideInviteNotice(false);
  };

  return (
    <Wrapper>
      <>
        <Header>
          <CloseButton>
            <img src={Close} alt="Close" onClick={closeInvite} />
          </CloseButton>
          <Title>가족 초대하기</Title>
        </Header>
        <InputWrapper>
          <CodeInput
            value={familycode}
            readOnly
            placeholder="가족 코드를 불러오는 중입니다..."
          />
          <Button onClick={copyToClipboard} disabled={loading || !familycode}>
            {loading ? "로딩 중..." : "가족 코드 복사"}
          </Button>
        </InputWrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </>
    </Wrapper>
  );
};

export default CodeInvite;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 390px;
  height: 100%;
  width: 100%;
  margin: 0 auto;
`;

const CloseButton = styled.div`
  cursor: pointer;
  width: 19px;
  img {
    width: 19px;
    height: 19px;
  }
  margin: 3px 0 0px 3px;
`;

const Title = styled.h1`
  color: #000;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

const Header = styled.div`
  display: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 0px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 40px;
`;

const CodeInput = styled.input`
  height: auto;
  border: 1px solid #e2e2e2;
  background: #f9f9f9;
  border-radius: 10px;
  text-align: left;
  font-size: 32px;
  outline: none;
  color: black;
  font-family: "Pretendard";
  padding: 10px;
`;

const Button = styled.button`
  height: 45px;
  border-style: none;
  outline: none;
  border-radius: 4px;
  background: white;
  color: black;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #e2e2e2;
  margin-top: 20px;
  font-family: "Pretendard";
`;

const Comment = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 90px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-family: "Pretendard";
  font-size: 14px;
  margin-top: 20px;
`;
