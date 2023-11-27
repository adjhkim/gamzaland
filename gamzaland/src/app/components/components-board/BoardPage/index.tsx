import * as React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-weight: bold;
  width: 90%;
  margin-top: 5%;
  text-shadow: none;
  color: #000;
  user-select: none;

  & > .active {
    font-weight: 1000;
    text-decoration: underline;
  }
`;

const Rect = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #faac58;
  border-radius: 4px;
  width: 10%;
  height: 100%;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);

  :active {
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25) inset;
  }
`;

const PageNo = styled.div`
  font-weight: 400;
`;

export default function BoardPage() {
  return (
    <Box>
      <Rect>
        <img
          alt=""
          src={`${process.env.PUBLIC_URL}/public_assets/before.svg`}
        ></img>
      </Rect>
      <PageNo className="active">1</PageNo>
      <Rect>
        <img
          alt=""
          src={`${process.env.PUBLIC_URL}/public_assets/next.svg`}
        ></img>
      </Rect>
    </Box>
  );
}
