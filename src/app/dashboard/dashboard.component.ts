import { Component } from '@angular/core';
import {AgentsListComponent} from '../agents/agents-list/agents-list.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    AgentsListComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
