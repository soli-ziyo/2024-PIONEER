import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MoaBox from "../components/MoaBox.jsx";
import Back from "../images/Back.svg";
import { CurrentWeek } from "../components/CurrentWeek";
import HamburgerMenu from "../components/HamburgerMenu";

import instance from "../api/axios.js";
import LoadingScreen from "../components/LoadingScreen.jsx";
import { useProfilesStore } from "../stores/ProfileStore.js";
import Header from "../components/Header";

const currentUserId = parseInt(localStorage.getItem("user_id"));

const MoaPage = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const { profiles, fetchProfiles } = useProfilesStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [noticeVisible, setNoticeVisible] = useState(false);

  const [posts, setPosts] = useState([]);
  const [hashtagData, setHashtagData] = useState([]);
  const [hashtag, setHashtag] = useState("");
  const [hashtagId, setHashtagId] = useState("");
  const [moa, setMoa] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async (userId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await instance.get(
        `${process.env.REACT_APP_SERVER_PORT}/report/family/`,
        // `${process.env.REACT_APP_SERVER_PORT}/report/family/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        const hashtagData = response.data.user_hashtags;
        setPosts(
          hashtagData
            .map((usertag, index) => ({
              key: `${usertag.weekhashtag_id}-${index}`,
              // userid: usertag.user_id,
              weekhashtagId: usertag.weekhashtag_id,
              nickname: usertag.nickname,
              thumbnail: usertag.latest_post_image
                ? `${process.env.REACT_APP_SERVER_PORT}${usertag.latest_post_image}`
                : null,
              created_at: usertag.created_at,
              postCount: usertag.post_count,
              tag: {
                hashtag: usertag.hashtag[0].hashtag,
                hashtagId: usertag.hashtag[0].hashtag_id,
              },
            }))
            .reverse()
        );
      }
    } catch (error) {
      console.error("API 오류:", error);
      setHashtag("이번 주 해시태그가 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
    setPosts([]);
    setHashtag("");
    setHashtagId("");
    fetchData(user_id); // 데이터를 가져오도록 호출
  }, [user_id, fetchProfiles]);

  const profile = profiles.find((p) => p.user_id === parseInt(user_id));

  const handleProfileClick = (userId) => {
    setPosts([]);
    setHashtag("");
    setHashtagId("");
    fetchData(userId);
    navigate(`/report/summary/${userId}`);
  };

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
    <>
      {profile ? (
        <>
          <LoadingScreen />
        </>
      ) : (
        <>
          <Wrapper>
            <Header toggleMenu={toggleMenu} />
            {menuOpen && <HamburgerMenu toggleMenu={toggleMenu} />}

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
            <PostsContainer>
              <Container>
                {/* <Week>{CurrentWeek().weekOfMonth}</Week>
                <Hashtag isEmpty={hashtag === "이번 주 해시태그가 없습니다."}>
                  {hashtag}
                </Hashtag> */}
              </Container>
              {posts.map((post) => (
                <MoaBox
                  key={post.key}
                  post={post}
                  currentUser={{ user_id: currentUserId }}
                  isCurrentUserPage={parseInt(user_id) === currentUserId}
                />
              ))}
            </PostsContainer>
          </Wrapper>
        </>
      )}
    </>
  );
};

export default MoaPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

const PostsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  padding-top: 20px;
  width: 333px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  margin: 0px auto;
  padding: 0px auto;
  align-content: flex-start;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  background-size: cover;
  background-position: center;
  border-radius: 21px;
`;

const Label = styled.div`
  background-color: #ff5a00;
  color: #fff;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  padding: 5px 14px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const Week = styled.div`
  color: #8c8c8c;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Hashtag = styled.div`
  color: ${(props) => (props.isEmpty ? "#c8c5c5" : "#FF5A00")};
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
`;
