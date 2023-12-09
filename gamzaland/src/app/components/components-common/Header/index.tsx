import * as React from 'react';
import styled from 'styled-components';
import { Navigate } from 'app/components/components-common/Navigate';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 7.5%;
  padding: 2.5% 5%;
  background-color: #faac58;
  font-size: 1rem;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  color: #fff;
  user-select: none;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.7rem;
  font-weight: bold;
  color: #2e2e2e;
  text-shadow: none;
`;

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

export function Header() {
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
      <Box>
        <Navigate
          src={`${process.env.PUBLIC_URL}/public_assets/home.svg`}
          path={'/'}
        ></Navigate>
        <img
          alt=""
          src={`${process.env.PUBLIC_URL}/public_assets/appname.png`}
        ></img>
        <UserInfo
          onClick={() => {
            Cookies.remove('jwtToken');
            navigate('/login');
          }}
        >
          <img
            alt=""
            src={`${process.env.PUBLIC_URL}/public_assets/logout.svg`}
          ></img>
          <span>{user.nickname}</span>
        </UserInfo>
      </Box>
    </>
  );
}
