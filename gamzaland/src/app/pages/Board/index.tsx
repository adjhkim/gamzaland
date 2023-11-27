import * as React from 'react';
import { HomePage } from '../HomePage';
import SearchAndAdd from 'app/components/components-board/SearchAndAdd';
import BoardPage from 'app/components/components-board/BoardPage';

const loadBoard = function () {
  return (
    <>
      <SearchAndAdd></SearchAndAdd>
      <BoardPage></BoardPage>
    </>
  );
};

export function Board() {
  return (
    <>
      <HomePage content={loadBoard()}></HomePage>
    </>
  );
}
