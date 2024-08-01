import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Close from '../images/Close.svg';
import { CurrentWeek } from '../components/CurrentWeek';
import axios from 'axios';

const baseurl = 'https://minsol.pythonanywhere.com';

const ChangeInterest = () => {
  const [interest, setInterest] = useState('');
  const [suggestedInterests, setSuggestedInterests] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const {weekOfMonth} = CurrentWeek();

  useEffect(() => {
    const fetchSuggestedInterests = async () => {
      const accessToken = localStorage.getItem('accessToken');
      console.log("AccessToken from localStorage:", accessToken);


      try {
        const response = await axios.get(`${baseurl}/home/hashtag/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        console.log('Fetched suggested interests:', response.data.data);
        setSuggestedInterests(response.data.data);
        
      } catch (error) {
        console.error('추천 관심사 가져오기 실패:', error);
        setSuggestedInterests([
          { "hashtag": "여름 휴가" },
          { "hashtag": "영화 관람" },
          { "hashtag": "소설책" },
          { "hashtag": "야구" },
          { "hashtag": "전시회" },
          { "hashtag": "수영" },
          { "hashtag": "필라테스" },
          { "hashtag": "주식" },
          { "hashtag": "취준" },
          { "hashtag": "두바이 초콜릿" }
        ]);
      }
    };

    fetchSuggestedInterests();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      const context = document.createElement('canvas').getContext('2d');
      context.font = '20px Pretendard'; 
      const width = context.measureText(interest).width;
      inputRef.current.style.width = `${width + 20}px`;
    }
  }, [interest]);

  const handleChange = (e) => {
    setInterest(e.target.value);
  };

  const handleSuggestedClick = (suggestedInterest) => {
    setInterest(suggestedInterest);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${baseurl}/home/hashtag/`, 
      {
        hashtag: interest,
        nickname: interest
      }, 
      {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}`
        }
      });

      if (response.status === 200) {
        console.log('관심사 저장됨:', response.data);
        navigate('/home'); 
      } else {
        console.error('관심사 저장 실패:', response.data);
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  return (
    <Wrapper>
      <Header>
        <CloseButton onClick={() => navigate('/home')}><img src={Close} alt='Close' /></CloseButton>
        <Title>관심사 변경</Title>
      </Header>
      <CurrentInterest>
        <InterestLabel>나의 관심사</InterestLabel>
        <InterestWeek>{weekOfMonth}</InterestWeek>
        <InterestInput
          type="text"
          value={interest}
          onChange={handleChange}
          placeholder="나의 관심사는?"
          ref={inputRef}
        />
      </CurrentInterest>
      <SuggestionsTitle>이런 관심사는 어때요?</SuggestionsTitle>
      <SuggestedInterests>
        {suggestedInterests.map((suggestedInterest, index) => (
          <SuggestedInterest key={index} onClick={() => handleSuggestedClick(suggestedInterest.hashtag)}>
            {suggestedInterest.hashtag}
          </SuggestedInterest>
        ))}
      </SuggestedInterests>
      <SubmitButton onClick={handleSubmit}>완료</SubmitButton>
    </Wrapper>
  );
};

export default ChangeInterest;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 40px;
`;

const CloseButton = styled.div`
  cursor: pointer;
  img {
    width: 19px;
    height: 19px;
  }
  margin: 3px 0 0 3px;
`;

const Title = styled.h1`
  color: #000;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

const CurrentInterest = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InterestLabel = styled.div`
  background-color: #FF6600;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  width: 92px;
  height: 30px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 11px;
`;

const InterestWeek = styled.div`
  color: #8C8C8C;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const InterestInput = styled.input`
  display: flex;
  width: auto;
  min-width: 130px; 
  max-width: 230px; 
  justify-content: center;
  align-items: center;
  padding: 11px 14px;
  border-radius: 21px;
  border: 0.5px solid #FF5A00;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
  margin-bottom: 54px;

  color: #FF5A00;
  text-align: center;
  font-size: 20px;
  font-weight: 500;

  &:focus {
    outline: none;
    border: 0.5px solid #FF5A00; 
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05); 
  }

  &::placeholder{
  color: #8c8c8c;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  }

`;

const SuggestionsTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
`;

const SuggestedInterests = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const SuggestedInterest = styled.div`
  padding: 10px 14px;
  font-size: 14px;
  border-radius: 21px;
  border: 0.5px solid #E2E2E2;
  background: #fff;
  cursor: pointer;

  &:hover {
    background-color: #e2e2e2;
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 122px;
  height: 54px;
  padding: 15px 44px;
  border-radius: 32px;
  border: 1px solid #E2E2E2;
  background: #fff;

  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;

  &:hover {
    color: #FF5A00;
    border: 1px solid #FF5A00;
  }
`;
