import * as React from 'react';
import { HomePage } from '../HomePage';
import CalendarPage from 'app/components/components-calendar/CalendarPage';
import CalendarDetail from 'app/components/components-calendar/CalendarDetail';

const loadCalendar = function () {
  return (
    <>
      <CalendarPage></CalendarPage>
      <CalendarDetail></CalendarDetail>
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
