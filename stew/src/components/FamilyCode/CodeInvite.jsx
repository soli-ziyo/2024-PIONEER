import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Close from "../../images/Close.svg";

const CodeInvite = ({
  nextStep,
  prevStep,
  setHideElements,
  setHideInviteNotice,
  setHideInputNotice,
}) => {
  const [familyCode, setFamilyCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const baseurl = "https://minsol.pythonanywhere.com/";

  useEffect(() => {
    const fetchFamilyCode = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${baseurl}family/code/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(response.data);
        if (response.data.familycode) {
          setFamilyCode(response.data.familycode);
        } else if (response.data.data && response.data.data.familycode) {
          setFamilyCode(response.data.data.familycode);
        }
      } catch (err) {
        setError("가족 코드를 가져오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyCode();
  }, [baseurl]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(familyCode)
      .then(() => alert("가족 코드가 클립보드에 복사되었습니다."))
      .catch((err) => setError("클립보드에 복사하는 중 오류가 발생했습니다."));
  };

  const closeInvite = () => {
    prevStep();
    setHideElements(false);
    setHideInputNotice(false);
    setHideInviteNotice(false);
  };

  return (
    <Wrapper>
      <>
        <ContainerBase>
          <img src={Close} alt="Close" onClick={closeInvite} />
          <Comment>가족 초대하기</Comment>
        </ContainerBase>
        <InputWrapper>
          <CodeInput
            value={familyCode}
            readOnly
            placeholder="가족 코드를 불러오는 중입니다..."
          />
          <Button onClick={copyToClipboard} disabled={loading || !familyCode}>
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
  margin: 0 auto;
`;

const ContainerBase = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  img {
    cursor: pointer;
    width: 19px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 330px;
  margin-top: 30px;
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
