import * as React from 'react';
import { HomePage } from '../HomePage';

const loadCalendar = function () {
  return <></>;
};

export function Calendar() {
  return (
    <>
      <HomePage content={loadCalendar()}></HomePage>
    </>
  );
}
