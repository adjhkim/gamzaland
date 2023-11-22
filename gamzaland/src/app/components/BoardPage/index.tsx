import * as React from 'react';
import styled from 'styled-components';

const Box = styled.table`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 90%;
  margin-top: 5%;
  text-shadow: none;
  color: #000;
  user-select: none;
`;

export default function BoardPage() {
  return (
    <Box>
      <img
        alt=""
        src={`${process.env.PUBLIC_URL}/public_assets/before.svg`}
      ></img>
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <img
        alt=""
        src={`${process.env.PUBLIC_URL}/public_assets/next.svg`}
      ></img>
    </Box>
  );
}
