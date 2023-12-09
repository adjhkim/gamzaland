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

const DetailRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #f7f2e0;
  width: 100%;
  padding: 2% 4%;
  margin: 2% 0;
  box-shadow: 2px 2px 6px -2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  overflow: hidden;
`;

const DetailDate = styled.span`
  font-size: 0.7rem;
  font-weight: bold;
  margin-right: 4%;
`;

const DetailContent = styled.span`
  font-size: 0.7rem;
`;

export default function ImportantSchedule() {
  const [soonSchedule, setSoonSchedule] = useState('');
  async function getSoonSchedule() {
    try {
      const res = await axios.get('http://localhost:4000/SoonSchedule', {
        params: {
          start: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
          ),
          end: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() + 7,
          ),
        },
      });
      setSoonSchedule(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getSoonSchedule();
  }, []);

  const setFormat = function (inputNum: number) {
    let result = '';
    if (inputNum < 10) {
      result = '0' + inputNum;
    } else {
      result = '' + inputNum;
    }
    return result;
  };

  const createYearMonth = function (inputDate: Date) {
    let month = inputDate.getMonth() + 1;
    let day = inputDate.getDate();

    return setFormat(month) + '-' + setFormat(day);
  };

  const createSoonSchedule = function (inputData: any) {
    let result: Array<JSX.Element> = [];
    if (inputData.length > 0) {
      for (let i = 0; i < inputData.length; i++) {
        result.push(
          <React.Fragment key={'soon' + i}>
            <DetailRow key={'SRow' + i}>
              <DetailDate key={'SDate' + i}>
                {createYearMonth(new Date(inputData[i].startDate)) +
                  ' ~ ' +
                  createYearMonth(new Date(inputData[i].endDate))}
              </DetailDate>
              <DetailContent key={'SContent' + i}>
                {inputData[i].content}
              </DetailContent>
            </DetailRow>
          </React.Fragment>,
        );
      }
    } else {
      result.push(
        <React.Fragment key={'soon' + 0}>
          <DetailRow key={'SRow' + 0}>
            <DetailDate key={'SDate' + 0}>{'T^T'}</DetailDate>
            <DetailContent key={'SContent' + 0}>
              {'이런! 아쉽게도 다가올 일정이 없어요.'}
            </DetailContent>
          </DetailRow>
        </React.Fragment>,
      );
    }
    return result;
  };

  return (
    <Box>
      <BoxTitle>다가올 일정</BoxTitle>
      <BoxContent>{createSoonSchedule(soonSchedule)}</BoxContent>
    </Box>
  );
}
