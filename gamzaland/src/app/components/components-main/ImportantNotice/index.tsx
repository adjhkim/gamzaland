import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex: 0.7;
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
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 3%;
  background-color: #fff;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.75rem;
  color: #000;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 0 4px 4px 4px;
`;

const InnerHead = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #a4a4a4;
  padding-bottom: 2%;
  margin-bottom: 2%;
`;

const InnerTitle = styled.input`
  width: 100%;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.8rem;
  font-weight: bold;
  outline: 0;
  border: 0;
  padding: 2%;
  user-select: none;
`;

const InnerContent = styled.textarea`
  width: 100%;
  flex: 1;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.8rem;
  outline: 0;
  border: 0;
  padding: 2%;
  user-select: none;
  resize: none;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
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
          <InnerHead key={'noticeHead' + i}>
            <InnerTitle
              key={'noticeTitle' + i}
              defaultValue={inputData[i].title}
              readOnly
            ></InnerTitle>
          </InnerHead>
          <InnerContent
            key={'noticeContent' + i}
            defaultValue={inputData[i].content}
            readOnly
          ></InnerContent>
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
