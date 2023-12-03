import { PopUp } from 'app/components/components-common/PopUp';
import axios from 'axios';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
  color: #000;
  text-shadow: none;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 0 4px 4px 4px;
  user-select: none;
`;

const Schedule = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  background-color: #fff;
  padding: 5%;
  border-radius: 0 4px 4px 4px;
  user-select: none;
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

const InnerTitle = styled.div`
  width: 100%;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.8rem;
  font-weight: bold;
  outline: 0;
  border: 0;
  padding: 2%;
  user-select: none;
`;

const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.8rem;
  outline: 0;
  border: 0;
  padding-bottom: 2%;
  user-select: none;
`;

const BoxFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 2% 4%;
  background-color: #faac58;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  color: #fff;
  user-select: none;
`;

const FooterButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;

  :active {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f7f2e0;
  width: 98%;
  margin-top: 2%;
  padding: 2% 4%;
  box-shadow: 2px 2px 6px -2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  overflow: hidden;
`;

const DetailInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 75%;
`;

const DetailDate = styled.span`
  font-size: 0.7rem;
  font-weight: bold;
  margin-right: 4%;
`;

const DetailContent = styled.span`
  font-size: 0.7rem;
`;

const DetailFunction = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 25%;
`;

const RowButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #faac58;
  border-radius: 4px;
  padding: 1%;
  box-shadow: 1px 1px 3px -1px rgba(0, 0, 0, 0.25);

  :active {
    box-shadow: 1px 1px 3px -1px rgba(0, 0, 0, 0.25) inset;
  }
`;

//Modal 내부 게시글 정보
const ModalInputName = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 2%;
`;

const ModalDate = styled.input`
  width: 40%;
  background-color: #f6e3ce;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.8rem;
  color: #000;
  outline: 0;
  border: 0;
  padding: 1% 2%;
  margin-bottom: 8%;
  appearance: none;
  user-select: none;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  background-color: #fff;
`;

const ModalContent = styled.input`
  width: 100%;
  background-color: #f6e3ce;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.8rem;
  outline: 0;
  border: 0;
  padding: 2%;
  user-select: none;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  background-color: #fff;
`;
//--------------------------------------

export default function CalendarDetail(props: {
  title: string;
  selectDay: Date;
}) {
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

  //날짜를 YYYY-MM-DD 포맷으로 변경
  const createDateString = useCallback((inputDate: Date) => {
    let year = inputDate.getFullYear();
    let month = inputDate.getMonth() + 1;
    let day = inputDate.getDate();

    return year + '-' + setFormat(month) + '-' + setFormat(day);
  }, []);
  //--------------------------------------

  //날짜를 MM-DD 포맷으로 변경
  const createYearMonth = function (inputDate: Date) {
    let month = inputDate.getMonth() + 1;
    let day = inputDate.getDate();

    return setFormat(month) + '-' + setFormat(day);
  };
  //--------------------------------------

  //모달 창 상태 제어
  const [isOpen, setIsOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  //--------------------------------------

  //모달 창 팝업 : 일정
  const openScheduleAdd = function () {
    return (
      <>
        <ModalInputName>시작일</ModalInputName>
        <ModalDate
          type="Date"
          value={addValue.startDate}
          onChange={event => {
            setAddValue(prevState => {
              return {
                ...prevState,
                startDate: event.target.value,
              };
            });
          }}
        ></ModalDate>
        <ModalInputName>종료일</ModalInputName>
        <ModalDate
          type="Date"
          value={addValue.endDate}
          onChange={event => {
            setAddValue(prevState => {
              return {
                ...prevState,
                endDate: event.target.value,
              };
            });
          }}
        ></ModalDate>
        <ModalInputName>일정 내용</ModalInputName>
        <ModalContent
          placeholder="내용을 입력하세요."
          value={addValue.content}
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

  //일정 선택, 변경 시 상태 관리
  const [addValue, setAddValue] = useState({
    content: '',
    startDate: createDateString(new Date()),
    endDate: createDateString(new Date()),
  });

  useEffect(() => {
    setAddValue(prevState => {
      const newDateString = createDateString(props.selectDay);
      return {
        ...prevState,
        startDate: newDateString,
        endDate: newDateString,
      };
    });
  }, [props.selectDay, createDateString]);

  useEffect(() => {
    const startTime = new Date(addValue.startDate);
    const endTime = new Date(addValue.endDate);
    if (startTime.getTime() > endTime.getTime()) {
      setAddValue(prevState => {
        return {
          ...prevState,
          endDate: addValue.startDate,
        };
      });
    }
  }, [addValue.startDate, addValue.endDate]);
  //--------------------------------------

  //선택된 날짜의 일정 DB 호출
  const [scheduleData, setScheduleData] = useState('');
  async function getScheduleData(date: Date) {
    try {
      const res = await axios.get('http://localhost:4000/ScheduleData', {
        params: {
          date: date,
        },
      });
      setScheduleData(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getScheduleData(props.selectDay);
  }, [props.selectDay]);
  //--------------------------------------

  //전송받은 DB 데이터로 일정 상세 정보 생성
  const createDetail = function (inputData: any) {
    let result: Array<JSX.Element> = [];
    for (let i = 0; i < inputData.length; i++) {
      result.push(
        <DetailRow key={'DRow' + i}>
          <DetailInfo key={'DInfo' + i}>
            <DetailDate key={'DDate' + i}>
              {createYearMonth(new Date(inputData[i].startDate)) +
                ' ~ ' +
                createYearMonth(new Date(inputData[i].endDate))}
            </DetailDate>
            <DetailContent key={'DContent' + i}>
              {inputData[i].content}
            </DetailContent>
          </DetailInfo>
          <DetailFunction key={'DFunc' + i}>
            <RowButton>
              <img
                alt=""
                src={`${process.env.PUBLIC_URL}/public_assets/edit.svg`}
              ></img>
            </RowButton>
            <RowButton>
              <img
                alt=""
                src={`${process.env.PUBLIC_URL}/public_assets/delete.svg`}
              ></img>
            </RowButton>
          </DetailFunction>
        </DetailRow>,
      );
    }
    return result;
  };
  //--------------------------------------
  return (
    <>
      <Box>
        <BoxTitle>일정 상세 보기</BoxTitle>
        <BoxContent>
          <Schedule>
            <InnerHead>
              <InnerTitle>{props.title}</InnerTitle>
            </InnerHead>
            <InnerContent>{createDetail(scheduleData)}</InnerContent>
          </Schedule>
          <BoxFooter>
            <FooterButton
              onClick={() => {
                setIsOpen(true);
                setIsAdd(true);
              }}
            >
              <img
                alt=""
                src={`${process.env.PUBLIC_URL}/public_assets/add.svg`}
              ></img>
            </FooterButton>
          </BoxFooter>
        </BoxContent>
      </Box>
      <PopUp
        title={'일정 추가'}
        content={openScheduleAdd()}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isAdd={isAdd}
        addSchedule={addValue}
      ></PopUp>
    </>
  );
}
