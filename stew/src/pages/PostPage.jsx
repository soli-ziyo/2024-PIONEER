import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import StateInterest from "../components/StateInterest";

import Close from "../images/Close.svg";
import Plus from "../images/Plus_og.svg";

const baseurl = "https://minsol.pythonanywhere.com";

const PostPage = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();


  const user = new URLSearchParams(location.search).get('user'); 
  const hashtag = new URLSearchParams(location.search).get('hashtag'); 
  const hashtagId = new URLSearchParams(location.search).get('hashtag_id');


  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("description", description);
    // // formData.append("image", image);
    // formData.append("tag", hashtag);


  //   const formData = new FormData();
  // formData.append("description", description);
  // formData.append("tag", hashtagId);  
  // // if (image) {
  // //   formData.append("img", image);
  // // }

  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await axios.post(
      `${baseurl}/interest/new/`,

      {
        tag: hashtagId,
        img: image,
        description: description
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        },
      })

      if (response.status === 201) {
        const result = response.data;
        console.log("게시물 작성 성공:", result);
        navigate(-1);
      } else {
        console.error("게시물 작성 실패");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <Wrapper>
      <Header>
        <CloseButton onClick={() => navigate(-1)}>
          <img src={Close} alt="Close" />
        </CloseButton>
        <Title>게시물 작성</Title>
      </Header>
      <StateInterest user={user} hashtag={hashtag} />
      <Form onSubmit={handleSubmit}>
        <ImageUpload>
          <Label htmlFor="image" preview={preview}>
            <img src={Plus} alt="Plus Image" />
          </Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </ImageUpload>
        <TextInput
          placeholder="어떤 이야기를 공유할까요?"
          value={description}
          onChange={handleDescriptionChange}
        />
        <SubmitButton type="submit" disabled={!description && !image}>
          완료
        </SubmitButton>
      </Form>
    </Wrapper>
  );
};

export default PostPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
`;

const CloseButton = styled.div`
  cursor: pointer;
  img {
    width: 19px;
    height: 19px;
  }
  margin: 3px 0 0 3px;
`;

const Title = styled.h1`
  color: #000;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageUpload = styled.div`
  margin-top: 45px;
  margin-bottom: 45px;
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 67px;
  height: 67px;
  border-radius: 4px;
  border: 1px dashed #ff5a00;
  cursor: pointer;
  background-image: ${({ preview }) => (preview ? `url(${preview})` : "none")};
  background-size: cover;
  background-position: center;

  img {
    width: 27px;
    height: 27px;
  }
`;

const Input = styled.input`
  display: none;
`;

const TextInput = styled.textarea`
  width: 100%;
  height: 120px;
  border-radius: 21px;
  border: 1px solid #e2e2e2;
  padding: 14px 16px;
  font-size: 16px;
  resize: none;
  margin-bottom: 20px;
  font-family: Pretendard;
  font-weight: 300;
  box-sizing: border-box;

  &::placeholder {
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
  }

  &:focus {
    outline: none;
    border: 1px solid #222;
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 122px;
  height: 54px;
  padding: 14px 16px;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  border-radius: 32px;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 500;

  border-radius: 32px;
  border: 1px solid #e2e2e2;
  background: #fff;
  color: #000;

  cursor: pointer;

  &:disabled {
    border: 1px solid #e2e2e2;
    background: #f1f1f1;
    color: #8c8c8c;
    cursor: not-allowed;
  }
`;
