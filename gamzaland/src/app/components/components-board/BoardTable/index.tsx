import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
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
  const [boardData, setBoardData] = useState('');

  async function getBoardData() {
    try {
      const res = await axios.get('/BoardData', {});
      setBoardData(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getBoardData();
  }, []);

  const createBoardBody = function () {
    let result: Array<JSX.Element> = [];
    for (let i = 0; i < 15; i++) {
      result.push(
        <TableRow key={'board' + i}>
          <TableCategory key={'category' + i}>???</TableCategory>
          <TableTitle key={'title' + i}>???</TableTitle>
        </TableRow>,
      );
    }
    return result;
  };

  return (
    <Box>
      <thead>
        <TableHead>
          <TableCategory>{boardData}</TableCategory>
          <TableTitle>ddd</TableTitle>
        </TableHead>
      </thead>
      <tbody>{createBoardBody()}</tbody>
    </Box>
  );
}
