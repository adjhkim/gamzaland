import * as React from 'react';
import { HomePage } from '../HomePage';
import SearchBox from 'app/components/SearchBox';
import BoardTable from 'app/components/BoardTable';

const loadBoard = function () {
  return (
    <>
      <SearchBox></SearchBox>
      <BoardTable></BoardTable>
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
