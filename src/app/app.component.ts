import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AgentsListComponent} from './agents/agents-list/agents-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AgentsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
