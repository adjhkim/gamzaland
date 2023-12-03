import * as React from 'react';
import { HomePage } from '../HomePage';
import SearchAndAdd from 'app/components/components-board/SearchAndAdd';

const loadBoard = function () {
  return (
    <>
      <SearchAndAdd></SearchAndAdd>
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
