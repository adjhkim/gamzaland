import * as React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  width: 90%;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.25);
  padding: 2.5%;
  margin-top: 5%;
  font-size: 0.75rem;
`;

export default function ImportantNotice() {
  return <Box>중요 공지</Box>;
}
