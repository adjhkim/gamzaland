import * as React from 'react';
import { HomePage } from '../HomePage';
import CalendarTable from 'app/components/components-calendar/CalendarTable';
import CalendarPage from 'app/components/components-calendar/CalendarPage';

const loadCalendar = function () {
  return (
    <>
      <CalendarPage></CalendarPage>
      <CalendarTable></CalendarTable>
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
