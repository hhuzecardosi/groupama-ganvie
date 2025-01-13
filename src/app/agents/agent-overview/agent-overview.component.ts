import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AgentsStore} from '../../store/agents.store';
import {Agents} from '../agents.model';
import {Missions} from '../../missions/missions.model';

@Component({
  selector: 'app-agent-overview',
  imports: [],
  providers: [AgentsStore],
  templateUrl: './agent-overview.component.html',
  styleUrl: './agent-overview.component.css'
})
export class AgentOverviewComponent implements OnInit {
  private store = inject(AgentsStore);

  agentId!: string;
  agent!: Agents;
  mission!: Missions;
  reports: any[] = [];

  constructor(private route: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.agentId = params['id'];
      this.store.getAgentAllInfo(this.agentId).then((info) => {
        console.log(info);
        this.agent = info.agent || {} as Agents;
        this.mission = info.mission || {} as Missions;
        this.reports = info.reports || [];
      });
    });
  }
}
