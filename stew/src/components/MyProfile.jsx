import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Next from "../images/Next.svg";
import { useNavigate } from "react-router-dom";

import { useProfilesStore } from "../stores/ProfileStore.js";

const currentUserId = parseInt(localStorage.getItem("user_id"));

const MyProfile = ({ sortedProfiles }) => {
  const navigate = useNavigate();
  if (!sortedProfiles || sortedProfiles.length === 0) {
    return <Wrapper>프로필을 찾을 수 없습니다.</Wrapper>;
  }

  const me = sortedProfiles.find(
    (profile) => profile.user_id === currentUserId
  );

  if (!me) {
    return <Wrapper>프로필을 찾을 수 없습니다.</Wrapper>;
  }

  const addFamily = () => {};

  const myProfile = me.profile;

  const handleClick = () => {
    navigate("/settings/edit", { state: { myProfile } });
  };

  return (
    <Wrapper>
      <ProfileContainer onClick={handleClick}>
        <ProfileItem>
          <ProfileImageButton active>
            <img src={myProfile} alt={me.nickname} />
          </ProfileImageButton>
          <ProfileTxt>
            <ProfileName>{me.nickname}</ProfileName>
            <Profilenum>{me.phonenum}</Profilenum>
          </ProfileTxt>
        </ProfileItem>
        <img src={Next} alt="다음" />
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
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
`;

const ProfileTxt = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const ProfileItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 50%;

  justify-content: center;
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
  margin-right: 16px;

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
  font-size: 20px;
  font-weight: 600;
  color: #222;
  line-height: 1.5;
`;

const Profilenum = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: #8c8c8c;
  line-height: 1.5;
`;
