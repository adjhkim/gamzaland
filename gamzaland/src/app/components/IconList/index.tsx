import * as React from 'react';
import styled from 'styled-components';
import { Navigate } from 'app/components/Navigate';

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

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  border-radius: 100%;
  width: 36px;
  height: 36px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25) inset;
`;

export default function IconList() {
  return (
    <Box>
      <BoxTitle>어플리케이션</BoxTitle>
      <BoxContent>
        <Circle>
          <Navigate src={'../../board.svg'} path={'/board'}></Navigate>
        </Circle>
        <Circle>
          <Navigate src={'../../calendar.svg'} path={'/calendar'}></Navigate>
        </Circle>
        <Circle>
          <Navigate src={'../../game.svg'} path={'/game'}></Navigate>
        </Circle>
      </BoxContent>
    </Box>
  );
}
