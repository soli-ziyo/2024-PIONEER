import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import Close from "../images/Close.svg";
import Post from "../components/Post";

import instance from "../api/axios";

const MoaDetail = ({ toggleMenu }) => {
  const { tag_id } = useParams();
  const [tagposts, setTagPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const tagPost = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await instance.get(
        `${process.env.REACT_APP_SERVER_PORT}/report/${tag_id}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        const postsData = response.data.data;
        setTagPosts(
          postsData
            .map((tag, index) => ({
              key: `${tag.tag.id}-${index}`,
              description: tag.description,
              tagName: tag.tag.hashtag[0].hashtag,
              img: tag.img
                ? `${process.env.REACT_APP_SERVER_PORT}${tag.img}`
                : null,
              created_at: tag.created_at,
              user: {
                id: tag.user.user_id,
                nickname: tag.user.nickname,
                phonenum: tag.user.phonenum,
                profile: tag.user.profile
                  ? `${process.env.REACT_APP_SERVER_PORT}${tag.user.profile}`
                  : require("../images/Basic.png"),
              },
              emoji: tag.emoji,
            }))
            .reverse()
        );
      }
    } catch (error) {
      console.error("API 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    tagPost();
  }, [tag_id]);

  return (
    <Wrapper>
      <Header>
        <CloseButton onClick={() => navigate(`/report/summary/${user_id}`)}>
          <img src={Close} alt="Close" />
        </CloseButton>
        <Title>{tagposts.length > 0 ? tagposts[0].tagName : ""}</Title>
      </Header>
      {tagposts.map((tagpost) => (
        <Post key={tagpost.key} post={tagpost} isCurrentUserPage={true} />
      ))}
    </Wrapper>
  );
};

export default MoaDetail;

const Wrapper = styled.div`
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  padding: 20px;
  box-sizing: border-box;
  margin: 0 auto;
`;

const CloseButton = styled.div`
  cursor: pointer;
  img {
    width: 19px;
    height: 19px;
  }
  margin: 3px 0 0px 3px;
`;

const Header = styled.div`
  display: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin-bottom: 45px;
`;

const Title = styled.h1`
  color: #000;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.5px;
  margin-left: 30%;
`;
