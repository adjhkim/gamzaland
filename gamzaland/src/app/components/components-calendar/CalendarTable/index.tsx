import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const Box = styled.table`
  width: 90%;
  margin-top: 5%;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  border-radius: 4px;
  text-align: center;
  user-select: none;
  table-layout: fixed;
`;

const TableHead = styled.tr`
  & > td {
    background-color: #faac58;
    font-weight: bold;
    padding: 2% 4%;
  }

  & > td:nth-child(1) {
    color: #fe2e64;
  }

  & > td:nth-child(7) {
    color: #2e64fe;
  }
`;

const TableRow = styled.tr`
  & > td {
    background-color: #fff;
    border-bottom: 1px solid #eee;
    padding: 4% 2%;
    color: #000;
    text-shadow: none;
  }

  & > td:nth-child(1) {
    color: red;
  }

  & > td:nth-child(7) {
    color: blue;
  }
`;

const TableCell = styled.td``;

const Schedule = styled.div`
  border: 1px solid #eee;
  border-radius: 4px;
  margin-top: 10%;
`;

export default function CalendarTable() {
  const weekName = ['일', '월', '화', '수', '목', '금', '토'];
  const createCalendarHead = function () {
    let result: Array<any> = [];
    for (let i = 0; i < 7; i++) {
      result.push(<TableCell>{weekName[i]}</TableCell>);
    }
    return result;
  };

  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const firstDayWeek = firstDay.getDay();

  const nowDay = function (day: number) {
    let result = new Date(today.getFullYear(), today.getMonth(), 1 + day);
    return result;
  };

  const createDateString = function (date: Date) {
    let month = date.getMonth() + 1;
    let day = '';
    if (date.getDate() > 9) {
      day = '' + date.getDate();
    } else {
      day = '0' + date.getDate();
    }
    return month + '-' + day;
  };

  const createCalendarBody = function (row: number) {
    let result: Array<any> = [];
    for (let i = 0; i < 7; i++) {
      if (i === firstDayWeek && row === 0) {
        result.push(
          <TableCell>
            <div>{createDateString(firstDay)}</div>
            <Schedule>-</Schedule>
          </TableCell>,
        );
      } else {
        result.push(
          <TableCell>
            <div>{createDateString(nowDay(i - firstDayWeek + row * 7))}</div>
            <Schedule>-</Schedule>
          </TableCell>,
        );
      }
    }
    return result;
  };

  const createCalendarRow = function () {
    let result: Array<any> = [];
    for (let i = 0; i < 5; i++) {
      result.push(<TableRow>{createCalendarBody(i)}</TableRow>);
    }
    return result;
  };

  return (
    <Box>
      <thead>
        <TableHead>{createCalendarHead()}</TableHead>
      </thead>
      <tbody>{createCalendarRow()}</tbody>
    </Box>
  );
}
