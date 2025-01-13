import {Component, inject} from '@angular/core';
import {NgForOf} from "@angular/common";
import {AgentCardComponent} from '../agent-card/agent-card.component';
import {AgentsStore} from '../../store/agents.store';

@Component({
  selector: 'app-agents-list',
  imports: [
    NgForOf,
    AgentCardComponent
  ],
  providers: [AgentsStore],
  templateUrl: './agents-list.component.html',
  styleUrl: './agents-list.component.css'
})
export class AgentsListComponent {
  store = inject(AgentsStore);
  agents = this.store.agents();
}
