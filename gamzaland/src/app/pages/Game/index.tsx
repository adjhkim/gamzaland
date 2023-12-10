import * as React from 'react';
import { HomePage } from '../HomePage';
import styled from 'styled-components';
import { useState } from 'react';
import { Roulette } from 'app/components/components-game/Roulette';

const GameList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f2e0;
  width: 75%;
  padding: 2% 0;
  margin: 6% 0;
  box-shadow: 2px 2px 6px -2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  overflow: hidden;
`;

const GameTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 85%;
  padding: 0 5%;
  font-weight: bold;
  color: #2e2e2e;
  text-shadow: none;
`;

const GameStart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
`;

export function Game() {
  const [isOpen, setIsOpen] = useState(false);

  const loadGame = function () {
    return (
      <>
        <GameList onClick={() => setIsOpen(true)}>
          <GameTitle>원판 돌리기 게임</GameTitle>
          <GameStart>
            <img
              alt=""
              src={`${process.env.PUBLIC_URL}/public_assets/play.svg`}
            ></img>
          </GameStart>
        </GameList>
        <Roulette isOpen={isOpen} setIsOpen={setIsOpen}></Roulette>
      </>
    );
  };

  return (
    <>
      <HomePage content={loadGame()}></HomePage>
    </>
  );
}
