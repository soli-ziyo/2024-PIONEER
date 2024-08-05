import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios";
import ImojiDash from "../images/Imoji_dash.svg";

const baseurl = process.env.REACT_APP_SERVER_PORT;

const LandingState = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await instance.get(
        `${baseurl}/home/main`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setProfile(response.data);
        console.log(response);
      } else {
        console.error("프로필 데이터를 가져오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("프로필 데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleClick = () => {
    const fullProfile = {
      ...profile,
      profile: profile.profile && !profile.profile.startsWith('http') ? `${baseurl}${profile.profile}` : profile.profile
    };
    navigate("/home/edit", { state: { profile: fullProfile } });
  };

  if (!profile) {
    return <div> </div>;
  }

  return (
    <ProfileWrapper>
      <ProfileMent onClick={handleClick}>
        {profile.content ? profile.content : <span>나의 한 마디</span>}
      </ProfileMent>
      <ProfileInfo>
        <ProfileImage onClick={handleClick}
          src={profile.profile ? `${baseurl}${profile.profile}` : require('../images/Basic.png')}
          alt={profile.nickname}
        />
        <EmojiWrapper onClick={handleClick}>
          {profile.emoji ? profile.emoji : <img src={ImojiDash} alt='imoji' />}
        </EmojiWrapper>
        <ProfileName>{profile.nickname}</ProfileName>
      </ProfileInfo>
    </ProfileWrapper>
  );
};

export default LandingState;

const ProfileWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15%;
  margin-right: 20%;
`;

const ProfileImage = styled.img`
  width: 102px;
  height: 102px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  z-index: 3;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.15);
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
  cursor: pointer;
`;

const ProfileInfo = styled.div`
  position: relative;
  top: -17px;
  transform: translateX(40%);
  z-index: 1;
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
  cursor: pointer;
  z-index: 4;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.15);
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
