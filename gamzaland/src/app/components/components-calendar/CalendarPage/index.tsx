import * as React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  width: 90%;
  margin-top: 5%;
  text-shadow: none;
  color: #000;
  user-select: none;
`;

const SelectMonth = styled.input`
  text-align: center;
  width: 75%;
  height: 100%;
  font-size: 0.7rem;
  padding: 0 5%;
  border: 0;
  outline: 0;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

const Rect = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #faac58;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
`;

export default function CalendarPage() {
  const nowYearMonth = function () {
    const today = new Date();
    const now = today.getFullYear() + '-' + (today.getMonth() + 1);
    return now;
  };

  return (
    <Box>
      <Rect>
        <img
          alt=""
          src={`${process.env.PUBLIC_URL}/public_assets/before.svg`}
        ></img>
      </Rect>
      <SelectMonth type="month" value={nowYearMonth()}></SelectMonth>
      <Rect>
        <img
          alt=""
          src={`${process.env.PUBLIC_URL}/public_assets/next.svg`}
        ></img>
      </Rect>
    </Box>
  );
}
