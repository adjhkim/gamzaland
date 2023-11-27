import * as React from 'react';
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

const TableHead = styled.thead``;
const TableBody = styled.tbody``;

const TableHeadRow = styled.tr`
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

const TableBodyRow = styled.tr`
  & > td {
    background-color: #fff;
    border-bottom: 1px solid #eee;
    color: #000;
    padding: 3% 2%;

    :active {
      background-color: #eee;
    }
  }

  & > td:nth-child(1) div:not(.notThisMonth) {
    color: red;
  }

  & > td:nth-child(7) div:not(.notThisMonth) {
    color: blue;
  }
`;

const TableCell = styled.td`
  & > .notThisMonth {
    color: #eee;
  }

  & > .todayOfCalendar {
    font-weight: 1000;
  }
`;

const DateString = styled.div`
  font-size: 0.75rem;
  text-shadow: none;
`;

const ScheduleBar = styled.div`
  width: 60%;
  height: 0.5rem;
  margin: 5% auto 0 auto;
  background-color: #a9d0f5;
  border-radius: 100px;
  /* visibility: hidden; */
`;

export default function CalendarTable({
  inputYear,
  inputMonth,
  today,
}: {
  inputYear: number;
  inputMonth: number;
  today: Date;
}) {
  const weekName = ['일', '월', '화', '수', '목', '금', '토'];
  const createCalendarHead = function () {
    let result: Array<JSX.Element> = [];
    for (let i = 0; i < 7; i++) {
      result.push(<TableCell key={'week' + i}>{weekName[i]}</TableCell>);
    }
    return result;
  };

  const firstDay = new Date(inputYear, inputMonth - 1, 1);
  const firstDayWeek = firstDay.getDay();

  const nowDay = function (day: number) {
    let result = new Date(firstDay.getFullYear(), firstDay.getMonth(), 1 + day);
    return result;
  };

  const createDateString = function (date: Date) {
    let month = '';
    if (date.getMonth() + 1 > 9) {
      month = '' + (date.getMonth() + 1);
    } else {
      month = '0' + (date.getMonth() + 1);
    }

    let day = '';
    if (date.getDate() > 9) {
      day = '' + date.getDate();
    } else {
      day = '0' + date.getDate();
    }
    return month + '-' + day;
  };

  const createCalendarCell = function (row: number) {
    let result: Array<JSX.Element> = [];
    for (let i = 0; i < 7; i++) {
      const thisDay = nowDay(i - firstDayWeek + row * 7);
      const thisYearMonth = createDateString(thisDay);
      const thisMonth = Number(thisYearMonth.split('-')[0]);
      const todayNoTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );

      let getClassName = '';
      if (thisMonth !== inputMonth) {
        getClassName = 'notThisMonth';
      } else if (thisDay.getTime() === todayNoTime.getTime()) {
        getClassName = 'todayOfCalendar';
      }

      result.push(
        <TableCell key={'cell' + row + i}>
          <DateString key={'date' + row + i} className={getClassName}>
            {thisYearMonth}
          </DateString>
          <ScheduleBar key={'bar' + row + i}></ScheduleBar>
        </TableCell>,
      );
    }
    return result;
  };

  const createCalendarBody = function () {
    let result: Array<JSX.Element> = [];
    for (let i = 0; i < 6; i++) {
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
