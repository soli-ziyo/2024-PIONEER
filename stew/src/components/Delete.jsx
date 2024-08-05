import React from 'react';
import styled from 'styled-components';

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalText>글을 삭제할까요?</ModalText>
        <ButtonContainer>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <DeleteButton onClick={onConfirm}>삭제</DeleteButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default DeleteModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 65%;
  height: 20%;
  border-radius: 8px;
  border: 0.5px #E2E2E2;
  background: #fff;
  box-shadow: 0px 0px 36px 0px rgba(0, 0, 0, 0.30);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalText = styled.div`
color: var(--Labels-Primary, #000);
text-align: center;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
margin: 41px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 116px;
`;

const CancelButton = styled.button`
border: none;
color: #000;
background: none;
text-align: center;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 120%; 
`;

const DeleteButton = styled.button`
border: none;
color: #FF5A00;
background: none;
text-align: center;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 120%; 
`;
