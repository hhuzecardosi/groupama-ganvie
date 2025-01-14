import {Component, Input} from '@angular/core';
import {Agents} from '../agents.model';
import {NgOptimizedImage} from '@angular/common';
import {Router} from '@angular/router';

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

  constructor(private readonly router: Router) {
  }

  onCardClick() {
    this.router.navigate(['/agent/', this.agent.id])
      .then(() => {},
        error => {
        console.error(`Error navigating to agent ${this.agent?.id}, error: ${error}`);
        });
  };
}
