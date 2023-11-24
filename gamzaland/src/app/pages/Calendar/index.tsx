import * as React from 'react';
import { HomePage } from '../HomePage';
import CalendarTable from 'app/components/components-calendar/CalendarTable';
import CalendarPage from 'app/components/components-calendar/CalendarPage';
import CalendarDetail from 'app/components/components-calendar/CalendarDetail';

const loadCalendar = function () {
  return (
    <>
      <CalendarPage></CalendarPage>
      <CalendarTable></CalendarTable>
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
