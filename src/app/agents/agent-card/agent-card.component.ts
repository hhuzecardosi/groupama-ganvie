import {Component, Input} from '@angular/core';
import {Agents} from '../agents.model';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-agent-card',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './agent-card.component.html',
  styleUrl: './agent-card.component.css'
})
export class AgentCardComponent {
  @Input() agent: Agents = {} as Agents;
}
