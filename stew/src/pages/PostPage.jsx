import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StateInterest from '../components/StateInterest';

const PostPage = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
        <CloseButton onClick={() => navigate(-1)}>X</CloseButton>
        <Title>게시물 작성</Title>
      </Header>
      <StateInterest user="엄마" hashtag="산책" />
      <Form onSubmit={handleSubmit}>
        <ImageUpload>
          <Label htmlFor="image">+</Label>
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
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CloseButton = styled.div`
  font-size: 24px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageUpload = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  width: 100px;
  height: 100px;
  border: 2px dashed #FF6600;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  color: #FF6600;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;

const TextInput = styled.textarea`
  width: 100%;
  height: 100px;
  border: 1px solid #E2E2E2;
  border-radius: 10px;
  padding: 10px;
  font-size: 14px;
  resize: none;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  width: 100px;
  height: 40px;
  background-color: #FF6600;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:disabled {
    background-color: #E2E2E2;
    cursor: not-allowed;
  }
`;
