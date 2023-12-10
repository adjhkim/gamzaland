import React, { useEffect } from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Wheel } from 'react-custom-roulette';

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 7.5%;
  padding: 2.5% 5%;
  background-color: #faac58;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  color: #fff;
  user-select: none;
`;

const ModalButton = styled.div<{ show?: string }>`
  display: ${props => props.show || 'flex'};
  justify-content: center;
  align-items: center;
  border-radius: 100%;

  :active {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 92.5%;
  padding: 5%;
  background-color: #f6e3ce;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.75rem;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const InputArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: 60%;
  margin-top: 5%;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  user-select: none;
  overflow: hidden;
`;

const InputText = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 100%;
  padding: 4%;
  border: 0;
  outline: 0;
`;

const InputButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: 30%;
  height: 100%;
  padding: 4% 2%;
  background-color: #faac58;
  user-select: none;

  :active {
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25) inset;
  }
`;

const FuncArea = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-weight: bold;
  width: 60%;
  margin-top: 5%;
  user-select: none;
`;

const PlayButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: 30%;
  height: 100%;
  background-color: #faac58;
  padding: 4% 2%;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  user-select: none;

  :active {
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25) inset;
  }
`;

const PlayMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: 90%;
  margin-top: 5%;
  padding: 2%;
  user-select: none;
`;

export function Roulette(props: { isOpen: boolean; setIsOpen: any }) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [prizeMessage, setPrizeMessage] = useState('');
  const [count, setCount] = useState(1);
  const [roulette, setRoulette] = useState([
    {
      option: '',
      style: { backgroundColor: getRandomColor(), textColor: '#2e2e2e' },
      percentage: 100,
    },
  ]);

  const [data, setData] = useState({
    option: '',
    style: { backgroundColor: '', textColor: '' },
    percentage: 100,
  });

  const addData = function () {
    if (roulette[0].option === '' && roulette.length === 1) {
      setRoulette([data]);
    } else {
      setRoulette(items => [...items, data]);
      setCount(prevState => (prevState = prevState + 1));
    }
  };

  useEffect(() => {
    setRoulette(items => {
      return items.map(list => ({
        ...list,
        percentage: 100 / count,
      }));
    });
  }, [count]);

  function getRandomColor() {
    return (
      '#' +
      Math.floor(Math.random() * 55 + 200).toString(16) +
      Math.floor(Math.random() * 55 + 200).toString(16) +
      Math.floor(Math.random() * 55 + 200).toString(16)
    );
  }

  const handleSpinClick = () => {
    if (!mustSpin) {
      const pivot = Math.floor(Math.random() * 99 + 1);
      let stack = 0;
      let percentage = roulette.map((row, idx) => {
        return row.percentage;
      });

      let newPrizeNumber = 0;
      percentage.some((row, idx) => {
        stack += row;
        if (pivot <= stack) {
          newPrizeNumber = idx;
          return true;
        } else {
          return false;
        }
      });
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const StopSpinning = () => {
    setMustSpin(false);
    setPrizeMessage(roulette[prizeNumber].option + '에 당첨되셨습니다!');
  };

  return (
    <>
      <Modal
        style={{
          overlay: { backgroundColor: 'rgba(0,0,0,0.75)' },
          content: {
            padding: 0,
            border: 0,
            borderRadius: 6,
            top: '5vh',
            bottom: '25vh',
            left: '5vw',
            right: '5vw',
          },
        }}
        appElement={document.getElementById('root')}
        isOpen={props.isOpen}
      >
        <ModalHeader>
          {'원판 돌리기 게임'}
          <ModalButton
            show="flex"
            onClick={() => {
              props.setIsOpen(false);
            }}
          >
            <img
              alt=""
              src={`${process.env.PUBLIC_URL}/public_assets/exit.svg`}
            ></img>
          </ModalButton>
        </ModalHeader>
        <ModalContent>
          <Wheel
            spinDuration={0.2}
            startingOptionIndex={Math.floor(Math.random() * roulette.length)}
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={roulette}
            onStopSpinning={StopSpinning}
            outerBorderWidth={0}
            radiusLineWidth={1}
            fontFamily={'Noto Sans KR'}
          />
          <InputArea>
            <InputText
              type="text"
              spellCheck="false"
              onChange={event =>
                setData(prevState => {
                  return {
                    ...prevState,
                    option: event.target.value,
                  };
                })
              }
            ></InputText>
            <InputButton
              onClick={() => {
                setData(prevState => {
                  return {
                    ...prevState,
                    style: {
                      backgroundColor: getRandomColor(),
                      textColor: '#2e2e2e',
                    },
                  };
                });
                addData();
              }}
            >
              추가
            </InputButton>
          </InputArea>
          <FuncArea>
            <PlayButton
              onClick={() => {
                setRoulette([
                  {
                    option: '',
                    style: {
                      backgroundColor: getRandomColor(),
                      textColor: '#2e2e2e',
                    },
                    percentage: 100,
                  },
                ]);
                setPrizeMessage('');
              }}
            >
              초기화
            </PlayButton>
            <PlayButton onClick={handleSpinClick}>시작!</PlayButton>
          </FuncArea>
          <PlayMessage>{prizeMessage}</PlayMessage>
        </ModalContent>
      </Modal>
    </>
  );
}
