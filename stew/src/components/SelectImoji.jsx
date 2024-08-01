import React, { useState } from 'react';
import styled from 'styled-components';
import ImojiDash from '../images/Imoji_dash2.svg'; // Imoji_dash 이미지를 불러옴

const SelectImoji = ({ onClose, onSelect }) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const emojis = ['😍', '😂', '🤔', '😭', '😮', '🥳', '😤', '👍', '🧡'];

  const handleSelect = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleComplete = () => {
    if (selectedEmoji) {
      onSelect(selectedEmoji);
    }
    onClose();
  };

  return (
    <Overlay>
      <EmojiContainer>
        <SelectedEmojiContainer>
          {selectedEmoji ? (
            <EmojiDisplay>{selectedEmoji}</EmojiDisplay>
          ) : (
            <EmojiImage src={ImojiDash} alt="emoji-dash" />
          )}
          <EmojiText>반응을 선택해 주세요.</EmojiText>
        </SelectedEmojiContainer>
        <EmojiGrid>
          {emojis.map((emoji, index) => (
            <EmojiButton key={index} onClick={() => handleSelect(emoji)}>
              {emoji}
            </EmojiButton>
          ))}
        </EmojiGrid>
        <ButtonContainer>
          <CloseButton onClick={onClose}>취소</CloseButton>
          <CompleteButton onClick={handleComplete}>완료</CompleteButton>
        </ButtonContainer>
      </EmojiContainer>
    </Overlay>
  );
};

export default SelectImoji;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 10;
`;

const EmojiContainer = styled.div`
  background: #F9F9F9;;
  padding: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 390px;
  height: 91svh; 
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const SelectedEmojiContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmojiImage = styled.img`
  margin-top: 40px;
  width: 58px;
  height: 58px;
`;

const EmojiDisplay = styled.div`
  margin-top: 40px;
  font-size: 58px;
`;

const EmojiText = styled.div`
  margin-top: 26px;
  color: #000;
  font-size: 16px;
  font-weight: 500;
`;

const EmojiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  aspect-ratio: 1;
  gap: auto;
  width: 95%;
  margin: 20px;
`;

const EmojiButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 45px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  width: 100%;
  margin-top: 12px;
`;

const CloseButton = styled.button`
  display: flex;
  width: 122px;
  height: 54px;
  padding: 16px 45px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 32px;
  background: var(--Backgrounds-Primary, #FFF);
  border: none;

  color: var(--Labels-Primary, #000);
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
`;

const CompleteButton = styled.button`
  display: flex;
  width: 122px;
  height: 54px;
  padding: 16px 45px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 32px;
  background: #FF5A00;
  border: none;

  color: var(--Labels-Primary, #FFF);
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;
  `;
