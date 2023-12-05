import * as React from 'react';
import styled from 'styled-components';
import CalendarDetail from '../CalendarDetail';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
    padding: 3% 0;

    :active {
      background-color: #f7f2e0;
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
  &.active {
    background-color: #f7f2e0;
    & > div {
      color: #000;
      font-weight: 1000;
    }
  }

  & > .notThisMonth {
    color: #eee;
  }
`;

const DateString = styled.div`
  font-size: 0.75rem;
  text-shadow: none;
`;

const CalendarIcon = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 0.9rem;
  margin-top: 8%;
`;

const TodayMark = styled.span<{ show?: string }>`
  font-size: 0.5rem;
  font-weight: bold;
  text-shadow: none;
  color: #000;
  width: 40%;
  background-color: #faac58;
  border-radius: 100px;
  display: ${props => props.show || 'none'};
`;

const ScheduleCount = styled.span<{ show?: string }>`
  font-size: 0.5rem;
  font-weight: bold;
  text-shadow: none;
  color: #000;
  width: 40%;
  background-color: #faac58;
  border-radius: 100px;
  display: ${props => props.show || 'none'};
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
  //테이블 헤드 요일 표시
  const weekName = ['일', '월', '화', '수', '목', '금', '토'];
  const createCalendarHead = function () {
    let result: Array<JSX.Element> = [];
    for (let i = 0; i < 7; i++) {
      result.push(<TableCell key={'week' + i}>{weekName[i]}</TableCell>);
    }
    return result;
  };
  //--------------------------------------

  //선택된 Month 첫번째 날짜 요일 확인
  const firstDay = new Date(inputYear, inputMonth - 1, 1);
  const firstDayWeek = firstDay.getDay();
  //--------------------------------------

  //첫번째 날짜를 기준으로 Date 생성
  const nowDay = function (day: number) {
    let result = new Date(firstDay.getFullYear(), firstDay.getMonth(), 1 + day);
    return result;
  };
  //--------------------------------------

  //입력한 날짜를 YYYY-MM 포맷으로 변환
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
  //--------------------------------------

  //선택한 날짜 데이터 상태 관리
  const [selectDay, setSelectDay] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate()),
  );
  const [dayString, setDayString] = useState(
    today.getFullYear() +
      '년 ' +
      createDateString(today).split('-')[0] +
      '월 ' +
      createDateString(today).split('-')[1] +
      '일 ' +
      '(' +
      weekName[today.getDay()] +
      ')',
  );
  //--------------------------------------

  //선택된 year, month의 전체 DB 호출
  const [monthData, setMonthData] = useState('');

  async function getMonthData(year: number, month: number) {
    const thisFirstDay = new Date(year, month - 1, 1);
    try {
      const res = await axios.get('http://localhost:4000/CalendarData', {
        params: {
          start: new Date(
            thisFirstDay.getFullYear(),
            thisFirstDay.getMonth(),
            1 + (0 - thisFirstDay.getDay() + 0 * 7),
          ),
          end: new Date(
            thisFirstDay.getFullYear(),
            thisFirstDay.getMonth(),
            1 + (6 - thisFirstDay.getDay() + 5 * 7),
          ),
        },
      });
      setMonthData(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const [isUseFunc, setIsUseFunc] = useState(false);
  useEffect(() => {
    if (isUseFunc === false) {
      getMonthData(inputYear, inputMonth);
    } else {
      getMonthData(inputYear, inputMonth);
      setIsUseFunc(false);
    }
  }, [inputYear, inputMonth, isUseFunc]);
  //--------------------------------------

  //날짜에 해당하는 일정 갯수 출력 함수
  const createScheduleCount = function (inputData: any, thisDay: Date) {
    const newMonthData: Array<any> = [];
    for (let i = 0; i < inputData.length; i++) {
      const start = new Date(inputData[i].startDate);
      const end = new Date(inputData[i].endDate);
      if (
        start.getTime() <= thisDay.getTime() &&
        end.getTime() >= thisDay.getTime()
      ) {
        newMonthData.push(inputData[i]);
      }
    }
    return newMonthData.length;
  };
  //--------------------------------------

  //입력한 행(row)에 나올 table cell 생성
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

      let getStringClass = '';
      if (thisMonth !== inputMonth) {
        getStringClass = 'notThisMonth';
      }

      let getDisplay = '';
      if (todayNoTime.getTime() === thisDay.getTime()) {
        getDisplay = 'inline';
      }

      let getCellClass = '';
      if (selectDay.getTime() === thisDay.getTime()) {
        getCellClass = 'active';
      }

      let getCountClass = '';
      if (createScheduleCount(monthData, thisDay) > 0) {
        getCountClass = 'inline';
      }

      result.push(
        <TableCell
          className={getCellClass}
          key={'cell' + row + i}
          onClick={() => {
            setDayString(
              thisDay.getFullYear() +
                '년 ' +
                thisYearMonth.split('-')[0] +
                '월 ' +
                thisYearMonth.split('-')[1] +
                '일 ' +
                '(' +
                weekName[thisDay.getDay()] +
                ')',
            );
            setSelectDay(
              new Date(
                thisDay.getFullYear(),
                thisDay.getMonth(),
                thisDay.getDate(),
              ),
            );
          }}
        >
          <DateString key={'date' + row + i} className={getStringClass}>
            {thisYearMonth}
          </DateString>
          <CalendarIcon key={'icon' + row + i}>
            <TodayMark key={'mark' + row + i} show={getDisplay}>
              {'오늘'}
            </TodayMark>
            <ScheduleCount show={getCountClass} key={'count' + row + i}>
              {createScheduleCount(monthData, thisDay)}
            </ScheduleCount>
          </CalendarIcon>
        </TableCell>,
      );
    }
    return result;
  };
  //--------------------------------------

  //달력 행(row) 생성
  const createCalendarBody = function () {
    let result: Array<JSX.Element> = [];
    for (let i = 0; i < 6; i++) {
      result.push(
        <TableBodyRow key={'row' + i}>{createCalendarCell(i)}</TableBodyRow>,
      );
    }
    return result;
  };
  //--------------------------------------

  return (
    <>
      <Box>
        <TableHead>
          <TableHeadRow>{createCalendarHead()}</TableHeadRow>
        </TableHead>
        <TableBody>{createCalendarBody()}</TableBody>
      </Box>
      <CalendarDetail
        title={dayString}
        selectDay={selectDay}
        isUseFunc={isUseFunc}
        setIsUseFunc={setIsUseFunc}
      ></CalendarDetail>
    </>
  );
}
