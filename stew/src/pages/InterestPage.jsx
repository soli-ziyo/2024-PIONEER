import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProfilesStore } from "../stores/ProfileStore.js";
import styled from 'styled-components';
import Post from '../components/Post';
import axios from 'axios';
import Back from '../images/Back.svg';
import FloatingBtn from '../images/FloatingBtn.svg';
import { CurrentWeek } from '../components/CurrentWeek';

const baseurl = 'https://minsol.pythonanywhere.com';
const currentUserId = parseInt(localStorage.getItem('user_id'));

const InterestPage = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const { profiles, fetchProfiles } = useProfilesStore();
  const [posts, setPosts] = useState([]);
  const [hashtag, setHashtag] = useState("");

  const fetchData = async (userId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`${baseurl}/interest/list/${userId}/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.status === 200) {
        const interestsData = response.data.data.interests;
        setPosts(interestsData.map(interest => ({
          id: interest.tag.id,
          description: interest.description,
          img: interest.img,
          created_at: interest.created_at,
          user: {
            id: interest.user.user_id,
            nickname: interest.user.nickname,
            phonenum: interest.user.phonenum,
            profile: interest.user.profile,
          },
          emoji: interest.emoji
        })));
        const interest = interestsData.find(interest => interest.user.user_id === parseInt(userId));
        setHashtag(interest?.tag?.hashtag || '');
      }
    } catch (error) {
      console.error("API 오류:", error);
    }
  };

  useEffect(() => {
    fetchProfiles();
    fetchData(user_id);
  }, [user_id, fetchProfiles]);

  const profile = profiles.find(p => p.user_id === parseInt(user_id));

  if (!profile) {
    return <div>Loading...</div>;
  }

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleMessage = (phone) => {
    window.location.href = `sms:${phone}`;
  };

  const handleProfileClick = (userId) => {
    setPosts([]);  
    setHashtag("");
    fetchData(userId);
    navigate(`/interest/list/${userId}`);
  };

  const sortedProfiles = profiles.map(profile => {
    if (profile.user_id === currentUserId) {
      return { ...profile, nickname: '나' };
    }
    return profile;
  }).sort((a, b) => a.user_id === currentUserId ? -1 : 1);

  return (
    <Wrapper>
      <BackButton onClick={() => navigate('/home')}><img src={Back} alt="Back"/></BackButton> 
      <ProfileContainer>
        {sortedProfiles.map(member => (
          <ProfileItem key={member.user_id}>
            <ProfileImageButton active={member.user_id === parseInt(user_id)} onClick={() => handleProfileClick(member.user_id)}>
              <img src={member.profile} alt={member.nickname} />
            </ProfileImageButton>
            <ProfileName>{member.user_id === currentUserId ? '나' : member.nickname}</ProfileName>
          </ProfileItem>
        ))}
      </ProfileContainer>
      <PostsContainer>
        <Container>
            <Label>{parseInt(user_id) === currentUserId ? "나의 관심사" : `${profile.nickname}의 관심사`}</Label>
            <Week>{CurrentWeek().weekOfMonth}</Week>
            <Hashtag>{hashtag}</Hashtag>
          </Container> 
        {posts.map(post => (
          <Post key={post.id} post={post} currentUser={{ user_id: currentUserId }} onCall={handleCall} onMessage={handleMessage} isCurrentUserPage={parseInt(user_id) === currentUserId} />
        ))}
      </PostsContainer>
      {parseInt(user_id) !== currentUserId && <FloatingButton to="/interest/new"><img src={FloatingBtn} alt="게시글 작성"/></FloatingButton>}
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
  border: ${props => (props.active ? '1px solid #FF6600' : '1px solid #E2E2E2')};
  box-sizing: border-box;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: ${props => (props.active ? '1px solid #FF6600' : '1px solid #E2E2E2')};
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
  background-color: #FF5A00;
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
  color: #8C8C8C;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Hashtag = styled.div`
  color: #FF6600;
  font-size: 18px;
  font-weight: 700;
`;
