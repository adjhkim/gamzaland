import * as React from 'react';
import { HomePage } from '../HomePage';

const loadBoard = function () {
  return <></>;
};

export function Board() {
  return (
    <>
      <HomePage content={loadBoard()}></HomePage>
    </>
  );
}
