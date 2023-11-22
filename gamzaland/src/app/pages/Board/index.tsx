import * as React from 'react';
import { HomePage } from '../HomePage';
import SearchBox from 'app/components/SearchBox';
import BoardTable from 'app/components/BoardTable';
import BoardPage from 'app/components/BoardPage';

const loadBoard = function () {
  return (
    <>
      <SearchBox></SearchBox>
      <BoardTable></BoardTable>
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
