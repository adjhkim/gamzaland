import * as React from 'react';
import { HomePage } from '../HomePage';
import ImportantNotice from 'app/components/ImportantNotice';
import ImportantSchedule from 'app/components/ImportantSchedule';
import IconList from 'app/components/IconList';

const loadMain = function () {
  return (
    <>
      <ImportantNotice></ImportantNotice>
      <ImportantSchedule></ImportantSchedule>
      <IconList></IconList>
    </>
  );
};

export function Main() {
  return (
    <>
      <HomePage content={loadMain()}></HomePage>
    </>
  );
}
