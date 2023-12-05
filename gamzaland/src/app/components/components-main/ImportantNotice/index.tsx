import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-top: 5%;
`;

const BoxTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: 30%;
  background-color: #faac58;
  padding: 2%;
  box-shadow: 2px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px 4px 0 0;
  user-select: none;
`;

const BoxContent = styled.div`
  width: 100%;
  padding: 1% 3%;
  background-color: #fff;
  color: #000;
  text-shadow: none;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 0 4px 4px 4px;
`;

const InnerTitle = styled.div`
  width: 100%;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.8rem;
  font-weight: bold;
  outline: 0;
  border: 0;
  padding: 2% 4%;
  margin: 2% 0;
  user-select: none;
  background-color: #f7f2e0;
  box-shadow: 2px 2px 6px -2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

const InnerContent = styled.div`
  width: 100%;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.8rem;
  outline: 0;
  border: 0;
  padding: 2% 4%;
  margin: 2% 0;
  background-color: #f7f2e0;
  box-shadow: 2px 2px 6px -2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  user-select: none;
  white-space: pre-wrap;
`;

export default function ImportantNotice() {
  const [lastNotice, setLastNotice] = useState('');
  async function getLastNotice() {
    try {
      const res = await axios.get('http://localhost:4000/LastNotice', {});
      setLastNotice(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getLastNotice();
  }, []);

  const createLastNotice = function (inputData: any) {
    let result: Array<JSX.Element> = [];
    for (let i = 0; i < inputData.length; i++) {
      result.push(
        <React.Fragment key={'notice' + i}>
          <InnerTitle key={'noticeTitle' + i}>{inputData[i].title}</InnerTitle>
          <InnerContent key={'noticeContent' + i}>
            {inputData[i].content}
          </InnerContent>
        </React.Fragment>,
      );
    }
    return result;
  };

  return (
    <Box>
      <BoxTitle>최근 공지</BoxTitle>
      <BoxContent>{createLastNotice(lastNotice)}</BoxContent>
    </Box>
  );
}
