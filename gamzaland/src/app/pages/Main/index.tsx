import * as React from 'react';
import { HomePage } from '../HomePage';
import ImportantNotice from 'app/components/compoenets-main/ImportantNotice';
import ImportantSchedule from 'app/components/compoenets-main/ImportantSchedule';
import IconList from 'app/components/compoenets-main/IconList';

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
