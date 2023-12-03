import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import BoardTable from 'app/components/components-board/BoardTable';
import BoardPage from 'app/components/components-board/BoardPage';
import { PopUp } from 'app/components/components-common/PopUp';

//페이지 상단 UI Wrapper (검색+추가)
const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-top: 5%;
`;
//--------------------------------------

//게시글 검색 바 Wrapper
const SearchBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  height: 100%;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  overflow: hidden;
`;
//--------------------------------------

//게시글 검색 바 제목
const SearchTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: 20%;
  height: 100%;
  background-color: #faac58;
  padding: 2%;
  user-select: none;
`;
//--------------------------------------

//게시글 검색 타입 선택
const SearchType = styled.select`
  appearance: auto;
  -moz-appearance: auto;
  -webkit-appearance: auto;
  border-radius: 0;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;

  width: 25%;
  height: 100%;
  border: 0;
  outline: 0;
  padding: 2%;
  user-select: none;
`;
//--------------------------------------

//게시글 검색어 작성란
const SearchText = styled.input`
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border-radius: 0;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;

  width: 40%;
  height: 100%;
  border: 0;
  outline: 0;
  padding: 2%;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
`;
//--------------------------------------

//게시글 검색 버튼
const SearchButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 100%;
  padding: 2%;
  background-color: #fff;
  user-select: none;

  :active {
    background-color: #eee;
  }
`;
//--------------------------------------

//게시글 추가 버튼
const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: 15%;
  height: 100%;
  background-color: #faac58;
  padding: 2%;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  user-select: none;

  :active {
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25) inset;
  }
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

export default function SearchAndAdd() {
  //board 페이지 첫 렌더링 or 기능 사용 시 전체 DB 호출
  const [noticeData, setNoticeData] = useState('');
  const [boardData, setBoardData] = useState('');
  const [boardCount, setBoardCount] = useState(0);
  const [boardPage, setBoardPage] = useState(1);
  const [isUseFunc, setIsUseFunc] = useState(false);
  async function getLastNotice() {
    try {
      const res = await axios.get('http://localhost:4000/LastNotice', {});
      setNoticeData(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getBoardCount() {
    try {
      const res = await axios.get('http://localhost:4000/BoardCount', {});
      const divideShare = Math.floor(res.data[0].count / 10);
      const divideRemainder = res.data[0].count % 10;
      if (divideRemainder === 0) {
        setBoardCount(divideShare);
      } else {
        setBoardCount(divideShare + 1);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getBoardData(pageNo: number) {
    try {
      const res = await axios.get('http://localhost:4000/BoardData', {
        params: {
          pageNo: pageNo,
        },
      });
      setBoardData(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (isUseFunc === false) {
      getLastNotice();
      getBoardCount();
      getBoardData(boardPage);
    } else {
      getLastNotice();
      getBoardCount();
      getBoardData(boardPage);
      setIsUseFunc(false);
    }
  }, [isUseFunc, boardPage]);
  //--------------------------------------

  //검색 시 type, text를 이용하여 DB 호출
  const [type, setType] = useState('제목');
  const [text, setText] = useState('');
  async function searchBoardCount() {
    let path = '';
    if (type === '제목') {
      path = 'BoardCountByTitle';
    } else if (type === '내용') {
      path = 'BoardCountByContent';
    } else if (type === '작성자') {
      path = 'BoardCountByWrtName';
    } else {
      path = 'BoardData';
    }
    try {
      const res = await axios.get(`http://localhost:4000/${path}`, {
        params: { text: text },
      });
      const divideShare = Math.floor(res.data[0].count / 10);
      const divideRemainder = res.data[0].count % 10;
      if (divideRemainder === 0) {
        setBoardCount(divideShare);
      } else {
        setBoardCount(divideShare + 1);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function searchBoardData(pageNo: number) {
    let path = '';
    if (type === '제목') {
      path = 'BoardByTitle';
    } else if (type === '내용') {
      path = 'BoardByContent';
    } else if (type === '작성자') {
      path = 'BoardByWrtName';
    } else {
      path = 'BoardData';
    }
    try {
      const res = await axios.get(`http://localhost:4000/${path}`, {
        params: { pageNo: pageNo, text: text },
      });
      setBoardData(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  //--------------------------------------

  //모달 창 상태 제어
  const [modalName, setModalName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  let editClass = 'editing';
  //--------------------------------------

  //모달 창 팝업 : 게시글 추가
  const openBoardAdd = function () {
    return (
      <>
        <ModalInfo>
          <ModalCategory
            className={editClass}
            onChange={event =>
              setAddValue(prevState => {
                return { ...prevState, category: event.target.value };
              })
            }
          >
            <option>일반</option>
            <option>공지</option>
          </ModalCategory>
        </ModalInfo>
        <ModalHead>
          <ModalTitle
            placeholder="제목을 입력하세요."
            className={editClass}
            onChange={event =>
              setAddValue(prevState => {
                return { ...prevState, title: event.target.value };
              })
            }
            spellCheck={false}
          ></ModalTitle>
        </ModalHead>
        <ModalContent
          placeholder="내용을 입력하세요."
          className={editClass}
          onChange={event =>
            setAddValue(prevState => {
              return { ...prevState, content: event.target.value };
            })
          }
          spellCheck={false}
        ></ModalContent>
      </>
    );
  };
  //--------------------------------------

  //게시글 추가 시 입력한 데이터 저장
  const [addValue, setAddValue] = useState({
    category: '일반',
    title: '',
    content: '',
  });
  //--------------------------------------

  return (
    <>
      <Box>
        <SearchBox>
          <SearchTitle>검색</SearchTitle>
          <SearchType onChange={event => setType(event.target.value)}>
            <option>제목</option>
            <option>내용</option>
            <option>작성자</option>
          </SearchType>
          <SearchText
            onChange={event => setText(event.target.value)}
            spellCheck="false"
            placeholder="검색어 입력"
          ></SearchText>
          <SearchButton
            onClick={() => {
              searchBoardData(boardPage);
              searchBoardCount();
            }}
          >
            <img
              alt=""
              src={`${process.env.PUBLIC_URL}/public_assets/search.svg`}
            ></img>
          </SearchButton>
        </SearchBox>
        <AddButton
          onClick={() => {
            setIsOpen(true);
            setIsAdd(true);
            setModalName('게시글 추가');
          }}
        >
          추가
        </AddButton>
      </Box>
      <BoardTable
        notice={noticeData}
        data={boardData}
        isUseFunc={setIsUseFunc}
      ></BoardTable>
      <BoardPage
        count={boardCount}
        page={boardPage}
        setPage={setBoardPage}
      ></BoardPage>
      <PopUp
        isUseFunc={setIsUseFunc}
        title={modalName}
        content={openBoardAdd()}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isAdd={isAdd}
        addBoard={addValue}
      ></PopUp>
    </>
  );
}
