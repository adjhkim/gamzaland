import * as React from 'react';
import { HomePage } from '../HomePage';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const AppName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  border: 0;
  padding: 3% 0;
  margin: 2%;
  user-select: none;
  background-color: #faac58;
  box-shadow: 0 0 12px 0 #faac58;
  border-radius: 4px;
`;

const InputArea = styled.input`
  width: 75%;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.8rem;
  font-weight: bold;
  outline: 0;
  border: 0;
  padding: 2% 3%;
  margin: 2%;
  user-select: none;
  background-color: #f7f2e0;
  box-shadow: 2px 2px 6px -2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

const FuncArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
  border: 0;
  margin: 2%;
  user-select: none;
`;

const FuncButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: 30%;
  background-color: #faac58;
  padding: 2%;
  margin-left: 4%;
  margin-right: 4%;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  user-select: none;

  :active {
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25) inset;
  }
`;

const ErrorArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.8rem;
  font-weight: bold;
  color: #fa5858;
  width: 90%;
  height: 5%;
  border: 0;
  margin: 2%;
  user-select: none;
  text-shadow: none;
`;

export function Login() {
  const [error, setError] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/CheckLogin', {
        nickname,
        password,
      });
      const token = response.data.token;
      Cookies.set('jwtToken', token);
      navigate('/');
    } catch (err) {
      console.log(err);
      setError('회원 정보를 정확히 입력해 주세요.');
    }
  };

  const loadLogin = function () {
    return (
      <>
        <Wrapper>
          <AppName>
            <img
              alt=""
              src={`${process.env.PUBLIC_URL}/public_assets/appname.png`}
            ></img>
          </AppName>
          <InputArea
            type="text"
            placeholder="닉네임을 입력하세요."
            spellCheck="false"
            onChange={event => setNickname(event.target.value)}
          ></InputArea>
          <InputArea
            type="password"
            placeholder="비밀번호를 입력하세요."
            onChange={event => setPassword(event.target.value)}
          ></InputArea>
          <FuncArea>
            <FuncButton
              onClick={() => {
                if (nickname === '' || password === '') {
                  setError('닉네임과 비밀번호를 입력해 주세요.');
                } else {
                  setError('');
                  handleLogin();
                }
              }}
            >
              로그인
            </FuncButton>
          </FuncArea>
          <ErrorArea>{error}</ErrorArea>
        </Wrapper>
      </>
    );
  };

  return (
    <>
      <HomePage content={loadLogin()} login={true}></HomePage>
    </>
  );
}
