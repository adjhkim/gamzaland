import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { PopUp } from 'app/components/components-common/PopUp';

const Box = styled.table`
  width: 90%;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  border-radius: 4px;
  margin-top: 5%;
`;

const TableHead = styled.tr`
  & > td {
    background-color: #faac58;
    font-weight: bold;
    padding: 2%;
    user-select: none;
    text-align: center;
  }
`;

const TableRow = styled.tr`
  & > td {
    background-color: #fff;
    border-bottom: 1px solid #eee;
    padding: 2%;
    color: #000;
    text-shadow: none;
  }

  :active {
    & > td {
      background-color: #eee;
    }
  }
`;

const TableCategory = styled.td`
  font-weight: bold;
  width: 20%;
  text-align: center;
  user-select: none;
`;

const TableCell = styled.td`
  width: 80%;
`;

const BoardTitle = styled.span`
  margin-right: 2%;
  user-select: none;
`;
const BoardReply = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  color: #2e64fe;
  user-select: none;
`;
const BoardInfo = styled.div`
  font-size: 0.75rem;
  color: #b4b4b4;
  user-select: none;
`;

export default function BoardTable({ data }) {
  const setFormat = function (inputNum: number) {
    let result = '';
    if (inputNum < 10) {
      result = '0' + inputNum;
    } else {
      result = '' + inputNum;
    }
    return result;
  };

  const createTimeString = function (inputDate: Date) {
    let year = inputDate.getFullYear();
    let month = inputDate.getMonth() + 1;
    let day = inputDate.getDate();
    let hour = inputDate.getHours();
    let min = inputDate.getMinutes();
    let sec = inputDate.getSeconds();

    return (
      year +
      '-' +
      setFormat(month) +
      '-' +
      setFormat(day) +
      ' ' +
      setFormat(hour) +
      ':' +
      setFormat(min) +
      ':' +
      setFormat(sec)
    );
  };

  //모달 창 상태 제어
  const [isOpen, setIsOpen] = useState(false);
  const [thisData, setThisData] = useState('');
  const openBoardDetail = function (inputData: any) {
    return (
      <>
        <BoardTitle>{inputData.title}</BoardTitle>
        <BoardReply>
          {'['}
          {inputData.reply}
          {']'}
        </BoardReply>
        <BoardInfo>
          {inputData.wrtName}
          {' / '}
          {createTimeString(new Date(inputData.rnwDate))}
          {' / '}
          {'조회 '}
          {inputData.view}
        </BoardInfo>
        {inputData.content}
      </>
    );
  };
  //--------------------------------------

  const createBoardBody = function (inputData: any) {
    let result: Array<JSX.Element> = [];
    for (let i = 0; i < inputData.length; i++) {
      result.push(
        <TableRow
          key={'board' + i}
          onClick={() => {
            setIsOpen(true);
            setThisData(inputData[i]);
          }}
        >
          <TableCategory key={'category' + i}>
            {inputData[i].category}
          </TableCategory>
          <TableCell key={'title' + i}>
            <BoardTitle>{inputData[i].title}</BoardTitle>
            <BoardReply>
              {'['}
              {inputData[i].reply}
              {']'}
            </BoardReply>
            <BoardInfo>
              {inputData[i].wrtName}
              {' / '}
              {createTimeString(new Date(inputData[i].rnwDate))}
              {' / '}
              {'조회 '}
              {inputData[i].view}
            </BoardInfo>
          </TableCell>
        </TableRow>,
      );
    }
    return result;
  };

  return (
    <>
      <Box>
        <thead>
          <TableHead>
            <TableCategory>분류</TableCategory>
            <TableCell>제목</TableCell>
          </TableHead>
        </thead>
        <tbody>{createBoardBody(data)}</tbody>
      </Box>
      <PopUp
        title={'게시글 상세 내용'}
        content={openBoardDetail(thisData)}
        isOpen={isOpen}
      ></PopUp>
    </>
  );
}
