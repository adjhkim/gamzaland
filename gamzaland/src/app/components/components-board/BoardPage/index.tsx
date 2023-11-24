import * as React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-weight: bold;
  width: 90%;
  height: 4%;
  text-shadow: none;
  color: #000;
  user-select: none;
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
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <Rect>
        <img
          alt=""
          src={`${process.env.PUBLIC_URL}/public_assets/next.svg`}
        ></img>
      </Rect>
    </Box>
  );
}
