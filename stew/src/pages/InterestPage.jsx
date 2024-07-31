import React, { useState, useEffect } from 'react';
import { useParams, Link,  useNavigate } from 'react-router-dom';
import { useProfilesStore } from "../stores/ProfileStore.js";
import styled from 'styled-components';
import StateInterest from '../components/StateInterest';
import Post from '../components/Post';
import axios from 'axios';


//임시 데이터임
const mockPosts = [
  {
    id: 1,
    description: '산책하다 본 고양이 ㅎㅎ',
    img: require('../images/cat.jpg'),
    created_at: '2024-07-28T14:24:35.191Z',
    user: { id: 1, nickname: '엄마', phone: '010-1234-5678', image: require('../images/mom.png') },
    emoji: ''
  },

  {
    id: 2,
    description: '마트에서 이런 것도 파네~ 과일 사서 먹어~',
    img: require('../images/food.jpg'),
    created_at: '2024-07-29T14:24:35.191Z',
    user: { id: 2, nickname: '아빠', phone: '010-1111-2222', image: require('../images/dad.png') },
    emoji: '😂'
  },
];

const mockCurrentUser = { user_id: 3, nickname: '나', phone: '010-0000-0000', image: require('../images/me.jpg') };

const InterestPage = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const { profiles, fetchProfiles } = useProfilesStore();
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  
  useEffect(() => {
    fetchProfiles();

    // API 호출 부분 주석 처리하고 임시 데이터 사용
    // const fetchData = async () => {
    //   const token = localStorage.getItem('accessToken');
    //   try {
    //     // 관심사 글 목록 가져오기
    //     const postsResponse = await axios({
    //       method: 'GET',
    //       url: `http://localhost:5000/interest/list/${userid}`,
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     setPosts(postsResponse.data.data);

    //     // 현재 사용자 정보 가져오기
    //     const currentUserResponse = await axios({
    //       method: 'GET',
    //       url: `http://localhost:5000/user/current`,
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     setCurrentUser(currentUserResponse.data);
    //   } catch (error) {
    //     console.error('Failed to fetch data:', error);
    //   }
    // };

    // fetchData();

    // 임시 데이터 사용
    setPosts(mockPosts);
    setCurrentUser(mockCurrentUser);
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

  const profileClick = (user_id) => {
    navigate(`/interest/list/${user_id}`);
  };

  return (
    <Wrapper>
      <ProfileContainer>
        {profiles.map(member => (
            <ProfileItem key={member.user_id}>
              <ProfileImageButton to={`/interest/list/${member.user_id}`} active={member.user_id === parseInt(user_id)}>
              <img src={member.profile} alt={member.nickname} />
            </ProfileImageButton>
              <ProfileName>{member.user_id === currentUser.id ? '나' : member.nickname}</ProfileName>
            </ProfileItem>
          ))}
      </ProfileContainer>
      <StateInterest user={profile.nickname} hashtag={profile.hashtag} />
      <PostsContainer>
        {posts.map(post => (
          <Post key={post.id} post={post} currentUser={currentUser} onCall={handleCall} onMessage={handleMessage}  isCurrentUserPage={parseInt(user_id) === currentUser.user_id} />
        ))}
      </PostsContainer>
      {parseInt(user_id) !== currentUser.user_id && <FloatingButton to="/interest/new">+</FloatingButton>}
    </Wrapper>
  );
};

export default InterestPage;

const Wrapper = styled.div`
  padding: 20px;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ProfileItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
  border-radius: 50%;
  padding: 5px;
`;

const ProfileImageButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: ${props => (props.active ? '2px solid #FF6600' : '2px solid #E2E2E2')};
  box-sizing: border-box;
  overflow: hidden;
  
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: ${props => (props.active ? '2px solid #FF6600' : '2px solid #E2E2E2')};
    box-sizing: border-box;
  }
`;

const ProfileName = styled.div`
  margin-top: 5px;
  font-size: 12px;
`;

const PostsContainer = styled.div`
  margin-top: 20px;
`;

const FloatingButton = styled(Link)`
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 56px;
  height: 56px;
  background-color: #FF6600;
  color: white;
  font-size: 24px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;
