import Header from 'app/components/Header';
import ImportantNotice from 'app/components/ImportantNotice';
import ImportantSchedule from 'app/components/ImportantSchedule';
import IconList from 'app/components/IconList';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import './style.css';

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #eee;
`;

const Container = styled.div`
  font-family: 'Dongle';
  font-size: 1.5rem;
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
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 90%;
  background-color: #f6e3ce;
`;

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>GamzaLand</title>
        <meta name="description" content="gamzaland" />
      </Helmet>
      <Background>
        <Container>
          <Header></Header>
          <Content>
            <ImportantNotice></ImportantNotice>
            <ImportantSchedule></ImportantSchedule>
            <IconList></IconList>
          </Content>
        </Container>
      </Background>
    </>
  );
}
