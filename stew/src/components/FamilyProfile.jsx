import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FamilyProfile = ({ profile, index }) => {
  const position = index % 2 === 0 ? 'left' : 'right';
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/interest/list/${profile.user_id}`);
  };
  
  return (
    <ProfileWrapper position={position}>
      <ProfileMent position={position}>
        {profile.content}
      </ProfileMent>
      <ProfileInfo position={position}>
        <ProfileImage src={profile.profile} alt={profile.nickname} onClick={handleClick} />
        <EmojiWrapper>
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
`;


const ProfileMent = styled.div`
  z-index: 1;
  max-width: 150px;
  padding: 10px 14px;
  border: 1px solid orange;
  border-radius: 21px;
  font-size: 14px;
  font-weight: 500;
  background-color: #fff;
  word-wrap: break-word;
  text-align: center;
  white-space: nowrap; /* 한 줄로 유지 */
  align-self: ${props => props.position === 'left' ? 'flex-start' : 'flex-end'};
`;

const ProfileInfo = styled.div`
  position: relative;
  top: -20px; /* ProfileInfo와 겹치도록 위로 이동 */
  transform: ${props => props.position === 'left' ? 'translateX(50%)' : 'translateX(-50%)'};
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
`;


const ProfileName = styled.div`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  font-weight: 600;
`;

