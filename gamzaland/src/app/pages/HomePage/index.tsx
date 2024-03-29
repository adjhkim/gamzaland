import { Header } from 'app/components/components-common/Header';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #2e2e2e;
`;

const Container = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.9rem;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  width: 480px;
  height: 100vh;
  background-color: #fff;
  transition: all 0.5s;

  @media (max-width: 600px) {
    width: 100%;
    height: 100vh;
  }
`;

const Content = styled.div<{ login?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: ${props => (props.login ? '100%' : '92.5%')};
  padding-bottom: 5%;
  background-color: #f6e3ce;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

export function HomePage(props: { content: JSX.Element; login?: boolean }) {
  const [user, setUser] = useState({ no: 0, nickname: '', iat: 0, exp: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('jwtToken');
    if (token) {
      axios
        .get('http://localhost:4000/Protected', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
          setUser(response.data.user);
        })
        .catch(error => {
          console.error('Error fetching protected data:', error.message);
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>GamzaLand</title>
        <meta name="description" content="gamzaland" />
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;200;300;400;500;600;700;800;900&display=swap');
        </style>
      </Helmet>
      <Background>
        <Container>
          {props.login ? <></> : <Header nickname={user.nickname}></Header>}
          <Content login={props.login}>{props.content}</Content>
        </Container>
      </Background>
    </>
  );
}
