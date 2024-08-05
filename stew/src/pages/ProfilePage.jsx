//설정-프로필 수정 페이지
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, Link, useNavigate } from "react-router-dom";

import HamburgerMenu from "../components/HamburgerMenu";
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";
import instance from "../api/axios.js";

import { useProfilesStore } from "../stores/ProfileStore.js";

const ProfilePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user_id } = useParams();
  const navigate = useNavigate();

  const { profiles, fetchProfiles } = useProfilesStore();

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const sortedProfiles = profiles
    .map((profile) => {
      if (profile.user_id === currentUserId) {
        return { ...profile, nickname: "나" };
      }
      return profile;
    })
    .sort((a, b) => (a.user_id === currentUserId ? -1 : 1));

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Wrapper>
      <Header toggleMenu={toggleMenu} />
      {menuOpen && <HamburgerMenu toggleMenu={toggleMenu} />}
      <ContentWrapper>
        <Header2></Header2>
        <ProfileSection>
          <ProfileTitle>프로필</ProfileTitle>
          <ProfileContainer>
            {sortedProfiles.map((member) => (
              <ProfileItem key={member.user_id}>
                <ProfileImageButton
                  active={member.user_id === parseInt(user_id)}
                  onClick={() => handleProfileClick(member.user_id)}
                >
                  <img src={member.profile} alt={member.nickname} />
                </ProfileImageButton>
                <ProfileName>
                  {member.user_id === currentUserId ? "나" : member.nickname}
                </ProfileName>
              </ProfileItem>
            ))}
          </ProfileContainer>
          z
        </ProfileSection>
        <FamilySection>
          <FamilyTitle>우리 가족</FamilyTitle>
          <Family></Family>
        </FamilySection>
      </ContentWrapper>
    </Wrapper>
  );
};

export default ProfilePage;

const Header2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  padding-top: 20px;
`;

const ProfileSection = styled.section`
  margin: 20px 0;
  margin-bottom: 30px;
`;

const ProfileContainer = styled.div`
  display: flex;
  margin-top: 30px;
  padding-bottom: 11px;
`;

const ProfileItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 50%;
  margin-right: 12px;
  cursor: pointer;
`;

const ProfileImageButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: ${(props) =>
    props.active ? "1px solid #FF6600" : "1px solid #E2E2E2"};
  box-sizing: border-box;
  overflow: hidden;
  background-color: white;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: ${(props) =>
      props.active ? "1px solid #FF6600" : "1px solid #E2E2E2"};
    box-sizing: border-box;
    object-fit: cover;
  }
`;

const ProfileName = styled.div`
  margin-top: 12px;
  font-size: 12px;
  font-weight: 400;
`;

const ProfileTitle = styled.h3`
  margin-bottom: 10px;
  font-weight: bold;
`;

const Profile = styled.div`
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

const Family = styled.div`
  display: flex;
  flex-direction: row;
`;

const FamilySection = styled.section`
  margin: 20px 0;
`;

const FamilyTitle = styled.h3`
  margin-bottom: 20px;
  font-weight: bold;
`;
