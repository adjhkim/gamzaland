import * as React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  width: 90%;
  height: 40%;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.25);
`;

export default function ImportantNotice() {
  return <Box>중요 공지가 보여요.</Box>;
}
