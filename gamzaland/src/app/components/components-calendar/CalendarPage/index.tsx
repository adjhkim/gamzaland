import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import CalendarTable from 'app/components/components-calendar/CalendarTable';

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  width: 90%;
  height: 4%;
  text-shadow: none;
  color: #000;
  user-select: none;
`;

const SelectMonth = styled.input`
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 0;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;

  text-align: center;
  width: 70%;
  height: 100%;
  font-size: 0.9rem;
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
  width: 10%;
  height: 100%;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
`;

export default function CalendarPage() {
  const today = new Date();
  const nowYearMonth = today.getFullYear() + '-' + (today.getMonth() + 1);
  const [yearMonth, setYearMonth] = useState(nowYearMonth);
  const year = Number(yearMonth.split('-')[0]);
  const month = Number(yearMonth.split('-')[1]);

  const addMonth = function (add: number) {
    const convertedMonth = month + add;
    if (convertedMonth === 13) {
      setYearMonth(year + 1 + '-01');
    } else if (convertedMonth === 0) {
      setYearMonth(year - 1 + '-12');
    } else if (convertedMonth < 10) {
      setYearMonth(year + '-0' + convertedMonth);
    } else {
      setYearMonth(year + '-' + convertedMonth);
    }
  };

  return (
    <>
      <Box>
        <Rect onClick={() => addMonth(-1)}>
          <img
            alt=""
            src={`${process.env.PUBLIC_URL}/public_assets/before.svg`}
          ></img>
        </Rect>
        <SelectMonth type="month" value={yearMonth} readOnly></SelectMonth>
        <Rect onClick={() => addMonth(1)}>
          <img
            alt=""
            src={`${process.env.PUBLIC_URL}/public_assets/next.svg`}
          ></img>
        </Rect>
      </Box>
      <CalendarTable
        inputYear={year}
        inputMonth={month}
        today={today}
      ></CalendarTable>
    </>
  );
}
