import * as React from 'react';
import styled from 'styled-components';
import { Navigate } from 'app/components/components-common/Navigate';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-top: 5%;
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
  user-select: none;
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  border-radius: 100%;
  padding: 2%;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25) inset;
`;

export default function IconList() {
  return (
    <Box>
      <BoxTitle>어플리케이션</BoxTitle>
      <BoxContent>
        <Circle>
          <Navigate
            src={`${process.env.PUBLIC_URL}/public_assets/board.svg`}
            path={'/board'}
          ></Navigate>
        </Circle>
        <Circle>
          <Navigate
            src={`${process.env.PUBLIC_URL}/public_assets/calendar.svg`}
            path={'/calendar'}
          ></Navigate>
        </Circle>
        <Circle>
          <Navigate
            src={`${process.env.PUBLIC_URL}/public_assets/game.svg`}
            path={'/game'}
          ></Navigate>
        </Circle>
      </BoxContent>
    </Box>
  );
}
