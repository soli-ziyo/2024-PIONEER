import React from 'react';
import styled from 'styled-components';

const FamilyProfile = ({ profile, index }) => {
  const position = index % 2 === 0 ? 'left' : 'right';

  return (
    <ProfileWrapper>
      <ProfileImage src={profile.image} alt={profile.name} />
      <ProfileInfo position={position}>
        {profile.status}
      </ProfileInfo>
      <EmojiWrapper>
        {profile.emoji}
      </EmojiWrapper>
      <ProfileName>
        {profile.name}
      </ProfileName>
    </ProfileWrapper>
  );
};

export default FamilyProfile;

const ProfileWrapper = styled.div`
  position: relative;
  margin: 20px;
`;

const ProfileImage = styled.img`
  width: 102px;
  height: 102px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  position: absolute;
  top: -10px;
  ${props => props.position === 'left' ? 'left: -20px;' : 'right: -20px;'}
  max-width: 150px;
  padding: 5px 10px;
  border: 1px solid orange;
  border-radius: 21px;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 500;
  background-color: #fff;
  word-wrap: break-word;
  text-align: center;
`;

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
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 600;
`;
