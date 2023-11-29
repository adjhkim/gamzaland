import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import BoardTable from 'app/components/components-board/BoardTable';

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

export default function SearchAndAdd() {
  //board 페이지 첫 렌더링 시 전체 DB 호출
  const [boardData, setBoardData] = useState('');
  async function getBoardData() {
    try {
      const res = await axios.get('http://3.39.183.207:4000/BoardData', {});
      setBoardData(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getBoardData();
  }, []);
  //--------------------------------------

  //검색 시 type, text를 이용하여 DB 호출
  const [type, setType] = useState('제목');
  const [text, setText] = useState('');
  async function searchBoardData() {
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
      const res = await axios.get(`http://3.39.183.207:4000/${path}`, {
        params: { text: text },
      });
      setBoardData(res.data);
    } catch (err) {
      console.log(err);
    }
  }
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
          <SearchButton onClick={() => searchBoardData()}>
            <img
              alt=""
              src={`${process.env.PUBLIC_URL}/public_assets/search.svg`}
            ></img>
          </SearchButton>
        </SearchBox>
        <AddButton>추가</AddButton>
      </Box>
      <BoardTable data={boardData}></BoardTable>
    </>
  );
}
