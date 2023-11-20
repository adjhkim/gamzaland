import * as React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  width: 90%;
  margin-top: 5%;
`;

const BoxTitle = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 25%;
  background-color: #faac58;
  padding: 1%;
  box-shadow: 2px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px 4px 0 0;
`;

const BoxContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  background-color: #fff;
  padding: 5%;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 0 4px 4px 4px;
`;

export default function ImportantSchedule() {
  return (
    <Box>
      <BoxTitle>중요 일정</BoxTitle>
      <BoxContent></BoxContent>
    </Box>
  );
}
