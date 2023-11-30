import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { PopUp } from 'app/components/components-common/PopUp';

//게시글 리스트 table 스타일
const Box = styled.table`
  width: 90%;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  border-radius: 4px;
  margin-top: 5%;
`;
//--------------------------------------

//게시글 리스트 thead > tr 스타일
const TableHead = styled.tr`
  & > td {
    background-color: #faac58;
    font-weight: bold;
    padding: 2%;
    user-select: none;
    text-align: center;
  }
`;
//--------------------------------------

//게시글 리스트 tbody > tr 스타일
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
//--------------------------------------

//테이블 column 스타일(분류, 제목)
const TableCategory = styled.td`
  font-weight: bold;
  width: 20%;
  text-align: center;
  user-select: none;
`;

const TableCell = styled.td`
  width: 80%;
`;
//--------------------------------------

//TableCell 내부 게시글 제목, 간단 정보
const BoardTitle = styled.span`
  margin-right: 2%;
  user-select: none;
`;

const BoardInfo = styled.div`
  font-size: 0.75rem;
  color: #b4b4b4;
  user-select: none;
`;
//--------------------------------------

//Modal 내부 게시글 정보
const ModalHead = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const ModalCategory = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  margin-right: 2%;
  user-select: none;
`;

const ModalTitle = styled.span`
  font-size: 0.8rem;
  user-select: none;
`;

const ModalInfo = styled.div`
  font-size: 0.75rem;
  font-weight: bold;
  color: #848484;
  user-select: none;
`;

const ModalContent = styled.textarea`
  width: 100%;
  flex: 1;
  background-color: #fff;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.8rem;
  margin-top: 4%;
  padding: 2%;
  outline: 0;
  border: 0;
  user-select: none;
  resize: none;
`;
//--------------------------------------

export default function BoardTable({ data }) {
  //10보다 낮은 숫자를 0n 포맷으로 변경
  const setFormat = function (inputNum: number) {
    let result = '';
    if (inputNum < 10) {
      result = '0' + inputNum;
    } else {
      result = '' + inputNum;
    }
    return result;
  };
  //--------------------------------------

  //날짜를 YYYY-MM-DD hh:mm:ss 포맷으로 변경
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
  //--------------------------------------

  //전달받은 DB로 게시글 테이블 Body 생성
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
            <BoardInfo>
              {inputData[i].wrtName}
              {' / '}
              {createTimeString(new Date(inputData[i].rnwDate))}
            </BoardInfo>
          </TableCell>
        </TableRow>,
      );
    }
    return result;
  };
  //--------------------------------------

  //모달 창 상태 제어
  const [isOpen, setIsOpen] = useState(false);
  const [thisData, setThisData] = useState('');
  const openBoardDetail = function (inputData: any) {
    return (
      <>
        <ModalHead>
          <ModalCategory>{'[' + inputData.category + ']'}</ModalCategory>
          <ModalTitle>{inputData.title}</ModalTitle>
        </ModalHead>
        <ModalInfo>
          {inputData.wrtName}
          {' / '}
          {createTimeString(new Date(inputData.rnwDate))}
        </ModalInfo>
        <ModalContent
          value={inputData.content}
          spellCheck={false}
          readOnly={true}
        ></ModalContent>
      </>
    );
  };
  //--------------------------------------

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
        setIsOpen={setIsOpen}
      ></PopUp>
    </>
  );
}
