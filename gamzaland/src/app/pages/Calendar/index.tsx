import * as React from 'react';
import { HomePage } from '../HomePage';
import CalendarPage from 'app/components/components-calendar/CalendarPage';

const loadCalendar = function () {
  return (
    <>
      <CalendarPage></CalendarPage>
    </>
  );
};

export function Calendar() {
  return (
    <>
      <HomePage content={loadCalendar()}></HomePage>
    </>
  );
}
