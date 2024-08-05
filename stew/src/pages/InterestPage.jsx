import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProfilesStore } from "../stores/ProfileStore.js";
import styled from "styled-components";
import Post from "../components/Post";
import Back from "../images/Back.svg";
import FloatingBtn from "../images/FloatingBtn.svg";
import { CurrentWeek } from "../components/CurrentWeek";
import instance from "../api/axios.js";
import LoadingScreen from "../components/LoadingScreen.jsx";

const currentUserId = parseInt(localStorage.getItem("user_id"));

const InterestPage = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const { profiles, fetchProfiles } = useProfilesStore();
  const [posts, setPosts] = useState([]);
  const [hashtag, setHashtag] = useState("");
  const [hashtagId, setHashtagId] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      await fetchProfiles();
    };

    loadData();
  }, [fetchProfiles]);

  useEffect(() => {
    if (profiles.length > 0) {
      const currentUserId = parseInt(localStorage.getItem("user_id"));
      const foundUser = profiles.find(profile => profile.user_id === currentUserId);
      setCurrentUser(foundUser);
      fetchData(user_id);
      console.log("Current User:", foundUser);
    }
  }, [user_id, profiles]);

  const fetchData = async (userId) => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await instance.get(
        `${process.env.REACT_APP_SERVER_PORT}/interest/list/${userId}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        const interestsData = response.data.data.interests;
        setPosts(
          interestsData
            .map((interest, index) => ({
              key: `${interest.tag.id}-${index}`,
              id: interest.interest_id,
              description: interest.description,
              img: interest.img
                ? `${process.env.REACT_APP_SERVER_PORT}${interest.img}`
                : null,
              created_at: interest.created_at,
              user: {
                id: interest.user.user_id,
                nickname: interest.user.nickname,
                phonenum: interest.user.phonenum,
                profile: interest.user.profile
                  ? `${process.env.REACT_APP_SERVER_PORT}${interest.user.profile}`
                  : require("../images/Basic.png"),
              },
              emoji: interest.emoji,
            }))
            .reverse()
        );

        const Hashtag =
          response.data.data.hashtags.hashtag[0]?.hashtag ||
          "등록된 해시태그가 없습니다.";
        const HashtagId = response.data.data.hashtags.id || "";
        setHashtag(Hashtag);
        setHashtagId(HashtagId);
        // const interest = interestsData.find(interest => interest.tag.id === parseInt(userId));
        // setHashtag(interest?.tag?.hashtag[0]?.hashtag || '');
      }
    } catch (error) {
      console.error("API 오류:", error);
      setHashtag("등록된 해시태그가 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  const profile = profiles.find((p) => p.user_id === parseInt(user_id));

  if (!profile) {
    return <LoadingScreen />;
  }

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleMessage = (phone) => {
    window.location.href = `sms:${phone}`;
  };

  const handleProfileClick = (userId) => {
    setPosts([]);
    setHashtag("");
    setHashtagId("");
    setLoading(true);
    fetchData(userId);
    navigate(`/interest/list/${userId}`);
  };

  const sortedProfiles = profiles
    .map((profile) => {
      if (profile.user_id === currentUserId) {
        return { ...profile, nickname: "나" };
      }
      return profile;
    })
    .sort((a, b) => (a.user_id === currentUserId ? -1 : 1));

  return (
    <Wrapper>
      <BackButton onClick={() => navigate("/home")}>
        <img src={Back} alt="Back" />
      </BackButton>
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
      {!loading && (
      <PostsContainer>
        <Container>
          <Label>
            {parseInt(user_id) === currentUserId
              ? "나의 관심사"
              : `${profile.nickname}의 관심사`}
          </Label>
          <Week>{CurrentWeek().weekOfMonth}</Week>
          <Hashtag isEmpty={hashtag === "등록된 해시태그가 없습니다."}>
            {hashtag}
          </Hashtag>
        </Container>
        {hashtag !== "등록된 해시태그가 없습니다." && posts.length === 0 ? (
          <EmptyPosts>
          {parseInt(user_id) === currentUserId
            ? (
              <>
                아직 작성된 글이 없어요!<br />우리 가족의 글을 기다려 볼까요?
              </>
            )
            : (
              <>
                아직 작성된 글이 없어요!<br />가족을 생각하는 마음을 표현해 보세요.
              </>
            )
          }
        </EmptyPosts>
        ) : (
          posts.map((post) => (
            <Post
              key={post.key}
              post={post}
              currentUser={currentUser}
              onCall={handleCall}
              onMessage={handleMessage}
              isCurrentUserPage={parseInt(user_id) === currentUserId}
              onDelete={handleDeletePost}
            />
          ))
        )}
      </PostsContainer>
      )}
      {parseInt(user_id) !== currentUserId &&
        hashtag !== "등록된 해시태그가 없습니다." &&
        !loading && (
          <FloatingButton
            to={`/interest/new?user=${profile.nickname}&hashtag=${hashtag}&hashtag_id=${hashtagId}`}
          >
            <img src={FloatingBtn} alt="게시글 작성" />
          </FloatingButton>
        )}
    </Wrapper>
  );
};

export default InterestPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
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
  overflow-x: auto; 
  flex-wrap: nowrap;
  white-space: nowrap; 

  &::-webkit-scrollbar {
    display: none; 
  }
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const EmptyPosts = styled.div`
margin-top: 33%;
display: flex;
flex-direction: center;
justify-content: center;
color: var(--Labels-Primary, #000);
text-align: center;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 200%; /* 28px */
`;