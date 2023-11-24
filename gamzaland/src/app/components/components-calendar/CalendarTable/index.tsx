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

const TableHead = styled.tr`
  & > td {
    background-color: #faac58;
    font-weight: bold;
    padding: 2%;
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
    padding: 2%;
    color: #000;
    font-size: 0.75rem;
    text-shadow: none;
  }

  & > td:nth-child(1) {
    color: red;
  }

  & > td:nth-child(7) {
    color: blue;
  }
`;

const ScheduleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
`;

const ScheduleBar = styled.div`
  width: 90%;
  height: 100%;
  color: #000;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25) inset;
  border-radius: 100px;
`;

export default function CalendarTable() {
  const weekName = ['일', '월', '화', '수', '목', '금', '토'];
  const createCalendarHead = function () {
    let result: Array<any> = [];
    for (let i = 0; i < 7; i++) {
      result.push(<td>{weekName[i]}</td>);
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
          <td>
            <div>{createDateString(firstDay)}</div>
            <ScheduleBox>
              <ScheduleBar></ScheduleBar>
            </ScheduleBox>
          </td>,
        );
      } else {
        result.push(
          <td>
            <div>{createDateString(nowDay(i - firstDayWeek + row * 7))}</div>
            <ScheduleBox>
              <ScheduleBar></ScheduleBar>
            </ScheduleBox>
          </td>,
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
