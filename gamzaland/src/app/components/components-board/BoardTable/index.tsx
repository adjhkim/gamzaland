import * as React from 'react';
import styled from 'styled-components';

const Box = styled.table`
  width: 90%;
  height: 82%;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  border-radius: 4px;
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
`;

const TableCategory = styled.td`
  font-weight: bold;
  width: 20%;
  text-align: center;
  user-select: none;
`;

const TableTitle = styled.td`
  width: 80%;
`;

export default function BoardTable() {
  return (
    <Box>
      <thead>
        <TableHead>
          <TableCategory>분류</TableCategory>
          <TableTitle>글 제목</TableTitle>
        </TableHead>
      </thead>
      <tbody>
        <TableRow>
          <TableCategory>공지</TableCategory>
          <TableTitle>제목입니다.</TableTitle>
        </TableRow>
        <TableRow>
          <TableCategory>일반</TableCategory>
          <TableTitle>제목입니다.</TableTitle>
        </TableRow>
        <TableRow>
          <TableCategory>일반</TableCategory>
          <TableTitle>제목입니다.</TableTitle>
        </TableRow>
        <TableRow>
          <TableCategory>일반</TableCategory>
          <TableTitle>제목입니다.</TableTitle>
        </TableRow>
        <TableRow>
          <TableCategory>일반</TableCategory>
          <TableTitle>제목입니다.</TableTitle>
        </TableRow>
        <TableRow>
          <TableCategory>공지</TableCategory>
          <TableTitle>제목입니다.</TableTitle>
        </TableRow>
        <TableRow>
          <TableCategory>일반</TableCategory>
          <TableTitle>제목입니다.</TableTitle>
        </TableRow>
        <TableRow>
          <TableCategory>일반</TableCategory>
          <TableTitle>제목입니다.</TableTitle>
        </TableRow>
        <TableRow>
          <TableCategory>일반</TableCategory>
          <TableTitle>제목입니다.</TableTitle>
        </TableRow>
        <TableRow>
          <TableCategory>일반</TableCategory>
          <TableTitle>제목입니다.</TableTitle>
        </TableRow>
        <TableRow>
          <TableCategory>공지</TableCategory>
          <TableTitle>제목입니다.</TableTitle>
        </TableRow>
        <TableRow>
          <TableCategory>일반</TableCategory>
          <TableTitle>제목입니다.</TableTitle>
        </TableRow>
        <TableRow>
          <TableCategory>일반</TableCategory>
          <TableTitle>제목입니다.</TableTitle>
        </TableRow>
        <TableRow>
          <TableCategory>일반</TableCategory>
          <TableTitle>제목입니다.</TableTitle>
        </TableRow>
        <TableRow>
          <TableCategory>일반</TableCategory>
          <TableTitle>제목입니다.</TableTitle>
        </TableRow>
      </tbody>
    </Box>
  );
}
