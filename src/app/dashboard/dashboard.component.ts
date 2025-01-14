import { Component } from '@angular/core';
import {AgentsListComponent} from '../agents/agents-list/agents-list.component';
import {CalendarComponent} from '../calendar/calendar.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    AgentsListComponent,
    CalendarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
