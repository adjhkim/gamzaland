import * as React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  background-color: #faac58;
`;

export default function Header() {
  return <Box>화면 상단에 고정되는 헤더에요.</Box>;
}
