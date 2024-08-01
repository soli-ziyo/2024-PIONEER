import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FamilyProfile = ({ profile, index }) => {
  const position = index % 2 === 0 ? 'left' : 'right';
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem('user_id')
  const isCurrentUser = profile.user_id.toString() === currentUserId;

  const handleClick = () => {
    navigate(`/interest/list/${profile.user_id}`);
  };

  const handleEmojiClick = () => {
    navigate('/home/edit');
  };


  const handleContentClick = () => {
    if (isCurrentUser) {
      navigate('/home/edit');
    }
  };
  
  return (
    <ProfileWrapper position={position}>
      <ProfileMent position={position} onClick={handleContentClick}>
        {profile.content}
      </ProfileMent>
      <ProfileInfo position={position}>
        <ProfileImage src={profile.profile} alt={profile.nickname} onClick={handleClick} />
        <EmojiWrapper onClick={handleEmojiClick}>
          {profile.emoji}
        </EmojiWrapper>
        <ProfileName>
          {profile.nickname}
        </ProfileName>
      </ProfileInfo>
    </ProfileWrapper>
  );
};

export default FamilyProfile;

const ProfileWrapper = styled.div`
  position: relative;
  margin-top: -30px; /* 요소 간의 간격을 좁혀줌 */
  display: flex;
  flex-direction: column;
  align-items: ${props => props.position === 'left' ? 'flex-start' : 'flex-end'};
  margin-top: -50px; /* 요소 간의 간격을 좁혀줌 */
  &:first-child {
    margin-top: 30px; /* 첫 번째 요소는 기본 간격 */
  }
`;

const ProfileImage = styled.img`
  width: 102px;
  height: 102px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
  cursor: pointer; /* 클릭 가능한 요소임을 나타냄 */
  z-index: 3;
`;


const ProfileMent = styled.div`
  z-index: 4;
  max-width: 130px;
  padding: 10px 14px;
  border: 1px solid orange;
  border-radius: 21px;
  font-size: 14px;
  font-weight: 500;
  background-color: #fff;
  word-wrap: break-word;
  text-align: center;
  align-self: ${props => props.position === 'left' ? 'flex-start' : 'flex-end'};
  cursor: pointer; 
`;

const ProfileInfo = styled.div`
  position: relative;
  top: -20px;
  transform: ${props => props.position === 'left' ? 'translateX(50%)' : 'translateX(-50%)'};
  z-index: 1;
`

const EmojiWrapper = styled.div`
  position: absolute;
  bottom: -10px;
  left: -10px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer; /* 클릭 가능한 요소임을 나타냄 */
  z-index: 4;
`;


const ProfileName = styled.div`
  text-align: center;
  width: 102px;
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  font-weight: 600;
`;

