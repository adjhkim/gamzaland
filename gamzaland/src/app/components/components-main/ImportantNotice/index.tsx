import * as React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 45%;
`;

const BoxTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: 30%;
  background-color: #faac58;
  padding: 2%;
  box-shadow: 2px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px 4px 0 0;
  user-select: none;
`;

const BoxContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  flex: 1;
  background-color: #fff;
  padding: 5%;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 0 4px 4px 4px;
`;

export default function ImportantNotice() {
  return (
    <Box>
      <BoxTitle>중요 공지</BoxTitle>
      <BoxContent></BoxContent>
    </Box>
  );
}
