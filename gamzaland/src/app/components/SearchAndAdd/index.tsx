import * as React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-top: 5%;
`;

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

const SearchTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
  background-color: #faac58;
  padding: 2%;
  user-select: none;
`;

const SearchType = styled.select`
  width: 25%;
  height: 100%;
  border: 0;
  outline: 0;
  padding: 2%;
  user-select: none;
`;

const SearchText = styled.input`
  width: 40%;
  height: 100%;
  border: 0;
  outline: 0;
  padding: 2%;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
`;

const SearchButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 100%;
  padding: 2%;
  background-color: #fff;
  user-select: none;
`;

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 100%;
  background-color: #faac58;
  padding: 2%;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  user-select: none;
`;

export default function SearchAndAdd() {
  return (
    <Box>
      <SearchBox>
        <SearchTitle>검색</SearchTitle>
        <SearchType>
          <option>제목</option>
          <option>내용</option>
          <option>작성자</option>
        </SearchType>
        <SearchText spellCheck="false"></SearchText>
        <SearchButton>
          <img
            alt=""
            src={`${process.env.PUBLIC_URL}/public_assets/search.svg`}
          ></img>
        </SearchButton>
      </SearchBox>
      <AddButton>추가</AddButton>
    </Box>
  );
}