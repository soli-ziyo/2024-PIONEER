import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useProfilesStore } from "../stores/ProfileStore.js";

const currentUserId = parseInt(localStorage.getItem("user_id"));

const MyProfile = ({ sortedProfiles }) => {
  if (!sortedProfiles || sortedProfiles.length === 0) {
    return <Wrapper>프로필을 찾을 수 없습니다.</Wrapper>;
  }

  const me = sortedProfiles.find(
    (profile) => profile.user_id === currentUserId
  );

  if (!me) {
    return <Wrapper>프로필을 찾을 수 없습니다.</Wrapper>;
  }

  return (
    <Wrapper>
      <ProfileContainer>
        <ProfileItem>
          <ProfileImageButton active>
            <img src={me.profile} alt={me.nickname} />
          </ProfileImageButton>
          <ProfileTxt>
            <ProfileName>{me.nickname}</ProfileName>
            <Prifilenum>{me.phonenum}</Prifilenum>
          </ProfileTxt>
        </ProfileItem>
        <img />
      </ProfileContainer>
    </Wrapper>
  );
};

export default MyProfile;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 21px;
  padding: 13px;
  padding-top: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ProfileTxt = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 50%;
  margin-right: 5%;
  margin-top: 12px;
  cursor: pointer;
`;

const ProfileImageButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  border: 1px solid #e2e2e2;
  box-sizing: border-box;
  overflow: hidden;
  background-color: white;
  margin-right: 20px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #e2e2e2;
    box-sizing: border-box;
    object-fit: cover;
  }
`;

const ProfileName = styled.div`
  margin-top: 12px;
  font-size: 20px;
  font-weight: 600;
  color: #222;
`;

const Prifilenum = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #8c8c8c;
`;
