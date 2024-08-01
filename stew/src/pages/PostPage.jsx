import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StateInterest from '../components/StateInterest';

import Close from '../images/Close.svg'
import Plus from '../images/Plus_og.svg'

const PostPage = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

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

    const formData = new FormData();
    formData.append('description', description);
    formData.append('image', image);

    const token = localStorage.getItem('accessToken');

    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:5000/interest/new/',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });

      if (response.status === 200) {
        const result = response.data;
        console.log('게시물 작성 성공:', result);
        navigate(`/interest/list/${result.data.user.id}`);
      } else {
        console.error('게시물 작성 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  return (
    <Wrapper>
      <Header>
        <CloseButton onClick={() => navigate(-1)}><img src={Close} alt='Close' /></CloseButton>
        <Title>게시물 작성</Title>
      </Header>
      <StateInterest user="엄마" hashtag="산책" />
      <Form onSubmit={handleSubmit}>
        <ImageUpload>
          <Label htmlFor="image" preview={preview}>
            <img src={Plus} alt='Plus Image' />
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
        <SubmitButton type="submit" disabled={!description && !image}>완료</SubmitButton>
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
  border: 1px dashed #FF5A00;
  cursor: pointer;
  background-image: ${({ preview }) => preview ? `url(${preview})` : 'none'};
  background-size: cover;
  background-position: center;

  img{
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
  border: 1px solid #E2E2E2;
  padding: 14px 16px;
  font-size: 16px;
  resize: none;
  margin-bottom: 20px;
  font-family: Pretendard;
  font-weight: 300;
  box-sizing: border-box;

  &::placeholder{
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
  }

  &:focus{
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
  border: 1px solid #E2E2E2;
  background: #FFF;
  color: #000;

  cursor: pointer;
  
  &:disabled {
    border: 1px solid #E2E2E2;
    background: #F1F1F1;
    color: #8C8C8C;
    cursor: not-allowed;
  }
`;
