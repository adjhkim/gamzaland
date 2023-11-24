import * as React from 'react';
import styled from 'styled-components';

const Box = styled.table`
  width: 90%;
  height: 46%;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  border-radius: 4px;
  text-align: center;
  user-select: none;
  table-layout: fixed;
`;

const TableHead = styled.thead``;
const TableBody = styled.tbody``;

const TableHeadRow = styled.tr`
  & > td {
    background-color: #faac58;
    font-weight: bold;
  }

  & > td:nth-child(1) {
    color: #fe2e64;
  }

  & > td:nth-child(7) {
    color: #2e64fe;
  }
`;

const TableBodyRow = styled.tr`
  & > td {
    background-color: #fff;
    border-bottom: 1px solid #eee;
    color: #000;
  }

  & > td:nth-child(1) div {
    color: red;
  }

  & > td:nth-child(7) div {
    color: blue;
  }
`;

const TableCell = styled.td`
  padding: 2%;
`;

const DateString = styled.div`
  font-size: 0.75rem;
  text-shadow: none;
`;

const ScheduleBar = styled.div`
  width: 100%;
  height: 15%;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25) inset;
  border-radius: 100px;
`;

export default function CalendarTable() {
  const weekName = ['일', '월', '화', '수', '목', '금', '토'];
  const createCalendarHead = function () {
    let result: Array<any> = [];
    for (let i = 0; i < 7; i++) {
      result.push(<TableCell key={'week' + i}>{weekName[i]}</TableCell>);
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

  const createCalendarCell = function (row: number) {
    let result: Array<any> = [];
    for (let i = 0; i < 7; i++) {
      if (i === firstDayWeek && row === 0) {
        result.push(
          <TableCell key={'cell' + row + i}>
            <DateString key={'date' + row + i}>
              {createDateString(firstDay)}
            </DateString>
            <ScheduleBar key={'bar' + row + i}></ScheduleBar>
          </TableCell>,
        );
      } else {
        result.push(
          <TableCell key={'cell' + row + i}>
            <DateString key={'date' + row + i}>
              {createDateString(nowDay(i - firstDayWeek + row * 7))}
            </DateString>
            <ScheduleBar key={'bar' + row + i}></ScheduleBar>
          </TableCell>,
        );
      }
    }
    return result;
  };

  const createCalendarBody = function () {
    let result: Array<any> = [];
    for (let i = 0; i < 5; i++) {
      result.push(
        <TableBodyRow key={'row' + i}>{createCalendarCell(i)}</TableBodyRow>,
      );
    }
    return result;
  };

  return (
    <Box>
      <TableHead>
        <TableHeadRow>{createCalendarHead()}</TableHeadRow>
      </TableHead>
      <TableBody>{createCalendarBody()}</TableBody>
    </Box>
  );
}
