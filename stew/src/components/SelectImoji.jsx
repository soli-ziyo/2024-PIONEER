import React, { useState } from 'react';
import styled from 'styled-components';
import ImojiDash from '../images/Imoji_dash.svg'; // Imoji_dash 이미지를 불러옴

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
          <EmojiImage src={ImojiDash} alt="emoji-dash" />
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
  z-index: 1000;
`;

const EmojiContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  height: 80vh; 
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectedEmojiContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const EmojiImage = styled.img`
  width: 58px;
  height: 58px;
`;

const EmojiText = styled.div`
  margin-top: 10px;
  font-size: 16px;
  color: #888;
`;

const EmojiGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const EmojiButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #888;
`;

const CompleteButton = styled.button`
  background: #FF6600;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
`;
