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

const Box = styled.div`
  width: 360px;
  height: 640px;
  background-color: #fff;
  box-shadow: 0px 0px 100px -60px rgba(0, 0, 0, 0.5);

  @media (max-width: 600px) {
    width: 100%;
    height: 100vh;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 10%;
  background-color: #f7be81;
`;

const ImportantNotice = styled.div`
  width: 90%;
  height: 40%;
  margin: 4.5% 5%;
  background-color: #eee;
  border-radius: 8px;
`;

const ImportantSchedule = styled.div`
  width: 90%;
  height: 25%;
  margin: 4.5% 5%;
  background-color: #eee;
  border-radius: 8px;
`;

const IconList = styled.div`
  width: 90%;
  height: 15%;
  margin: 4.5% 5%;
  background-color: #eee;
  border-radius: 8px;
`;

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>GamzaLand</title>
        <meta name="description" content="gamzaland" />
      </Helmet>
      <Background>
        <Box>
          <Header></Header>
          <ImportantNotice></ImportantNotice>
          <ImportantSchedule></ImportantSchedule>
          <IconList></IconList>
        </Box>
      </Background>
    </>
  );
}
