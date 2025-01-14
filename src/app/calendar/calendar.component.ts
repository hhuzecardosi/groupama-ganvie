import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'multiMonthYear',
    locale: frLocale,
    dayMaxEventRows: 5,
    eventMaxStack: 4,
    views : {
      multiMonthYear: {
        type: 'multiMonth',
        duration: { months: 3 },
        visibleRange: {
          start: '2025-01-01',
          end: '2025-03-31'
        }

      },
    },
    plugins: [multiMonthPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    events: [
      { title: '', start: '2025-01-01', end: '2025-02-01', color: '#FF0000'},
      { title: '', start: '2025-02-08', end: '2025-04-01', color: '#FF0000'},
      { title: '', start: '2025-02-01', end: '2025-02-08', color: '#7F1E1E'},
    ]
  };

  handleDateClick(arg: any) {
    console.log('date click! ' + arg.dateStr)
  }
}
