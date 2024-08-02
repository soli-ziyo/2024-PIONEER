import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProfilesStore } from "../stores/ProfileStore.js";
import styled from "styled-components";
import StateInterest from "../components/StateInterest";
import Post from "../components/Post";
import axios from "axios";
import Back from "../images/Back.svg";
import FloatingBtn from "../images/FloatingBtn.svg";

// 임시 데이터임
const mockPosts = [
  {
    id: 1,
    description: "산책하다 본 고양이 ㅎㅎ",
    img: require("../images/cat.jpg"),
    created_at: "2024-07-28T14:24:35.191Z",
    user: {
      id: 1,
      nickname: "엄마",
      phone: "010-1234-5678",
      image: require("../images/mom.png"),
    },
    emoji: "",
  },
  {
    id: 2,
    description: "마트에서 이런 것도 파네~ 과일 사서 먹어~",
    img: require("../images/food.jpg"),
    created_at: "2024-07-29T14:24:35.191Z",
    user: {
      id: 2,
      nickname: "아빠",
      phone: "010-1111-2222",
      image: require("../images/dad.png"),
    },
    emoji: "😂",
  },
];

const mockCurrentUser = {
  user_id: 3,
  nickname: "나",
  phone: "010-0000-0000",
  profile: require("../images/me.jpg"),
};

const InterestPage = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const { profiles, fetchProfiles } = useProfilesStore();
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    fetchProfiles();

    // 임시 데이터 사용
    setPosts(mockPosts);
    setCurrentUser(mockCurrentUser);
  }, [user_id, fetchProfiles]);

  const profile = profiles.find((p) => p.user_id === parseInt(user_id));

  if (!profile) {
    return <div>Loading...</div>;
  }

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleMessage = (phone) => {
    window.location.href = `sms:${phone}`;
  };

  const profileClick = (user_id) => {
    navigate(`/interest/list/${user_id}`);
  };

  // currentUser를 가장 앞에 오게 프로필 순서 변경
  const sortedProfiles = [
    currentUser,
    ...profiles.filter((member) => member.user_id !== currentUser.user_id),
  ];

  return (
    <Wrapper>
      <BackButton onClick={() => navigate("/home")}>
        <img src={Back} alt="Back" />
      </BackButton>
      <ProfileContainer>
        {sortedProfiles.map((member) => (
          <ProfileItem key={member.user_id}>
            <ProfileImageButton
              to={`/interest/list/${member.user_id}`}
              active={member.user_id === parseInt(user_id)}
            >
              <img src={member.profile} alt={member.nickname} />
            </ProfileImageButton>
            <ProfileName>
              {member.user_id === currentUser.user_id ? "나" : member.nickname}
            </ProfileName>
          </ProfileItem>
        ))}
      </ProfileContainer>
      <PostsContainer>
        <StateInterest user={profile.nickname} hashtag={profile.hashtag} />
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            currentUser={currentUser}
            onCall={handleCall}
            onMessage={handleMessage}
            isCurrentUserPage={parseInt(user_id) === currentUser.user_id}
          />
        ))}
      </PostsContainer>
      {parseInt(user_id) !== currentUser.user_id && (
        <FloatingButton to="/interest/new">
          <img src={FloatingBtn} alt="게시글 작성" />
        </FloatingButton>
      )}
    </Wrapper>
  );
};

export default InterestPage;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const BackButton = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  width: 27px;
  height: 21px;
  padding: 0px;
`;

const ProfileContainer = styled.div`
  display: flex;
  margin-top: 30px;
  padding-bottom: 11px;
  border-bottom: 0.5px solid #e2e2e2;
`;

const ProfileItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 50%;
  margin-right: 12px;
`;

const ProfileImageButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: ${(props) =>
    props.active ? "2px solid #FF6600" : "2px solid #E2E2E2"};
  box-sizing: border-box;
  overflow: hidden;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: ${(props) =>
      props.active ? "2px solid #FF6600" : "2px solid #E2E2E2"};
    box-sizing: border-box;
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
`;

const FloatingButton = styled(Link)`
  position: absolute;
  right: 0px;
  bottom: 15px;
  width: 59px;
  height: 59px;
  z-index: 9;
`;
