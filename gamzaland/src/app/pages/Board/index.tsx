import * as React from 'react';
import { HomePage } from '../HomePage';
import SearchAndAdd from 'app/components/SearchAndAdd';
import BoardTable from 'app/components/BoardTable';
import BoardPage from 'app/components/BoardPage';

const loadBoard = function () {
  return (
    <>
      <SearchAndAdd></SearchAndAdd>
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
