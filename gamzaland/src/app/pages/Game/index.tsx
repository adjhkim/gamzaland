import * as React from 'react';
import { HomePage } from '../HomePage';

const loadGame = function () {
  return <></>;
};

export function Game() {
  return (
    <>
      <HomePage content={loadGame()}></HomePage>
    </>
  );
}
