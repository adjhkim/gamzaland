import * as React from 'react';
import styled from 'styled-components';

const Box = styled.table`
  width: 90%;
  margin-top: 5%;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  border-radius: 4px;
  text-shadow: none;
  color: #000;
`;

const TableRow = styled.tr`
  & > td {
    background-color: #fff;
    border-bottom: 1px solid #eee;
    padding: 2% 4%;
  }
`;

const TableCategory = styled.td`
  width: 15%;
  text-align: center;
`;

const TableTitle = styled.td`
  width: 85%;
`;

export default function BoardTable() {
  return (
    <Box>
      <TableRow>
        <TableCategory>공지</TableCategory>
        <TableTitle>제목입니다.</TableTitle>
      </TableRow>
      <TableRow>
        <TableCategory>일반</TableCategory>
        <TableTitle>제목입니다.</TableTitle>
      </TableRow>
    </Box>
  );
}
