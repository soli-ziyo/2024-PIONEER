//설정-프로필 수정 페이지
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, Link, useNavigate } from "react-router-dom";

import HamburgerMenu from "../components/HamburgerMenu";
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";
import instance from "../api/axios.js";

import MyProfile from "../components/MyProfile.jsx";
import { useProfilesStore } from "../stores/ProfileStore.js";

const currentUserId = parseInt(localStorage.getItem("user_id"));

const ProfilePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user_id } = useParams();
  const navigate = useNavigate();

  const { profiles, fetchProfiles } = useProfilesStore();

  useEffect(() => {
    fetchProfiles(user_id);
  }, [user_id, fetchProfiles]);

  const profile = profiles.find((p) => p.user_id === parseInt(user_id));

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
          <MyProfile sortedProfiles={sortedProfiles}></MyProfile>
        </ProfileSection>
        <FamilySection>
          <FamilyTitle>우리 가족</FamilyTitle>
          <ProfileContainer>
            {sortedProfiles.map((member) => (
              <ProfileItem key={member.user_id}>
                <ProfileImageButton active={member.user_id === currentUserId}>
                  <img src={member.profile} alt={member.nickname} />
                </ProfileImageButton>
                <ProfileName>
                  {member.user_id === currentUserId ? "나" : member.nickname}
                </ProfileName>
              </ProfileItem>
            ))}
          </ProfileContainer>
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
  margin: 0px auto;
  width: 100%;
`;

const ProfileSection = styled.section`
  margin: 20px 0;
  margin-bottom: 30px;
`;

const ProfileContainer = styled.div`
  display: flex;
  padding-bottom: 11px;
  flex-wrap: wrap;
  width: 99%;
`;

const ProfileItem = styled.div`
  display: flex;
  flex-direction: column;
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

const Family = styled.div`
  display: flex;
  flex-direction: row;
`;

const FamilySection = styled.section`
  margin: 20px 0;
`;

const FamilyTitle = styled.h3`
  margin-bottom: 4px;
  font-weight: bold;
`;
