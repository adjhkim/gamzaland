import { Header } from 'app/components/Header';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #eee;
`;

const Container = styled.div`
  font-family: 'Jua', sans-serif;
  font-size: 0.75rem;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  width: 360px;
  height: 640px;
  background-color: #fff;
  box-shadow: 0px 0px 100px -60px rgba(0, 0, 0, 0.5);

  @media (max-width: 600px) {
    width: 100%;
    height: 100vh;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 92.5%;
  background-color: #f6e3ce;
`;

export function HomePage({ content }) {
  return (
    <>
      <Helmet>
        <title>GamzaLand</title>
        <meta name="description" content="gamzaland" />
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Jua&display=swap');
        </style>
      </Helmet>
      <Background>
        <Container>
          <Header></Header>
          <Content>{content}</Content>
        </Container>
      </Background>
    </>
  );
}
