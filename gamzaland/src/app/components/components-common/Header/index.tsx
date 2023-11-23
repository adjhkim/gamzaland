import * as React from 'react';
import styled from 'styled-components';
import { Navigate } from 'app/components/components-common';

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

export function Header() {
  return (
    <Box>
      <Navigate
        src={`${process.env.PUBLIC_URL}/public_assets/home.svg`}
        path={'/'}
      ></Navigate>
      <img
        alt=""
        src={`${process.env.PUBLIC_URL}/public_assets/appname.png`}
      ></img>
      <img
        alt=""
        src={`${process.env.PUBLIC_URL}/public_assets/menu.svg`}
      ></img>
    </Box>
  );
}