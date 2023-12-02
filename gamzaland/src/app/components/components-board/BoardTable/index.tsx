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
const ModalInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 3%;
`;

const ModalCategory = styled.select`
  width: 20%;
  background-color: #f6e3ce;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.8rem;
  font-weight: bold;
  color: #000;
  outline: 0;
  border: 0;
  padding: 1% 2%;
  appearance: none;
  user-select: none;

  &.editing {
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    appearance: auto;
  }
`;

const ModalDetail = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
  color: #848484;
  user-select: none;
`;

const ModalHead = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #a4a4a4;
  padding-bottom: 2%;
  margin-bottom: 2%;
`;

const ModalTitle = styled.input`
  flex: 1;
  background-color: #f6e3ce;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.8rem;
  outline: 0;
  border: 0;
  padding: 2%;
  user-select: none;

  &.editing {
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
    background-color: #fff;
  }
`;

const ModalContent = styled.textarea`
  width: 100%;
  flex: 1;
  background-color: #f6e3ce;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.8rem;
  outline: 0;
  border: 0;
  padding: 2%;
  user-select: none;
  resize: none;

  &.editing {
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
    background-color: #fff;
  }
`;
//--------------------------------------

export default function BoardTable({ data, isUseFunc }) {
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
            setModalName('게시글 번호 ' + inputData[i].no);
            setEditValue(prevState => {
              return {
                ...prevState,
                category: inputData[i].category,
                title: inputData[i].title,
                content: inputData[i].content,
                no: inputData[i].no,
              };
            });
          }}
        >
          <TableCategory key={'category' + i}>
            {inputData[i].category}
          </TableCategory>
          <TableCell key={'title' + i}>
            <BoardTitle>{inputData[i].title}</BoardTitle>
            <BoardInfo>
              {inputData[i].wrtName +
                ' / ' +
                createTimeString(new Date(inputData[i].rnwDate))}
            </BoardInfo>
          </TableCell>
        </TableRow>,
      );
    }
    return result;
  };
  //--------------------------------------

  //모달 창 상태 제어
  const [modalName, setModalName] = useState('');
  const [thisData, setThisData] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  let editClass = '';
  if (isEdit === true) {
    editClass = 'editing';
  } else {
    editClass = '';
  }
  //--------------------------------------

  //모달 창 팝업 : 게시글 상세 보기
  const openBoardDetail = function (inputData: any) {
    return (
      <>
        <ModalInfo>
          <ModalCategory
            className={editClass}
            defaultValue={inputData.category}
            onChange={event =>
              setEditValue(prevState => {
                return { ...prevState, category: event.target.value };
              })
            }
            disabled={!isEdit}
          >
            <option>공지</option>
            <option>일반</option>
          </ModalCategory>
          <ModalDetail>
            {inputData.wrtName +
              ' / ' +
              createTimeString(new Date(inputData.rnwDate))}
          </ModalDetail>
        </ModalInfo>
        <ModalHead>
          <ModalTitle
            className={editClass}
            defaultValue={inputData.title}
            onChange={event =>
              setEditValue(prevState => {
                return { ...prevState, title: event.target.value };
              })
            }
            readOnly={!isEdit}
            spellCheck={false}
          ></ModalTitle>
        </ModalHead>
        <ModalContent
          className={editClass}
          defaultValue={inputData.content}
          onChange={event =>
            setEditValue(prevState => {
              return { ...prevState, content: event.target.value };
            })
          }
          readOnly={!isEdit}
          spellCheck={false}
        ></ModalContent>
      </>
    );
  };
  //--------------------------------------

  //게시글 수정 시 입력한 데이터 저장
  const [editValue, setEditValue] = useState({
    category: '일반',
    title: '',
    content: '',
    no: 0,
  });
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
        isUseFunc={isUseFunc}
        title={modalName}
        content={openBoardDetail(thisData)}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setIsEdit={setIsEdit}
        editBoard={editValue}
      ></PopUp>
    </>
  );
}
