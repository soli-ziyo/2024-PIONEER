import React from "react";
import styled, { keyframes } from 'styled-components';

const LoadingScreen = () => {
  return (
    <LoadingContainer>
      <div>
        <Dot> </Dot>
        <Dot> </Dot>
        <Dot> </Dot>
      </div>
      <Text>stay tewgether</Text>
      <Logo>stew</Logo>
    </LoadingContainer>
  );
}

export default LoadingScreen;

const colorChange = keyframes`
  0%, 3% { background-color: #FF5A00; } 
  97% { background-color: #D9D9D9; }    
`;

const Dot = styled.span`
  all: unset;
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 15px;
  background-color: #D9D9D9;               
  animation: ${colorChange} 2s infinite;     
  &:nth-child(1) { animation-delay: 0.5s; }    
  &:nth-child(2) { animation-delay: 1s; }      
  &:nth-child(3) { animation-delay: 1.5s; }     
`;

const Text = styled.div`
margin: 20px 0 15px;
color: #FF5A00;
font-family: KulimPark;
font-size: 34px;
font-weight: 400;
`;

const Logo = styled.div`
color: #FF5A00;
font-family: KulimPark;
font-size: 88px;
font-weight: 600;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100vh;
  margin-left: 17px;
  margin-bottom: 85px;
`;