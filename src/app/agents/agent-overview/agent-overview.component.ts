import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AgentsStore} from '../../store/agents.store';
import {Agents} from '../agents.model';
import {Missions} from '../../missions/missions.model';
import {MatDialog} from '@angular/material/dialog';
import {ReportsComponent} from '../../reports/reports.component';

@Component({
  selector: 'app-agent-overview',
  imports: [],
  providers: [AgentsStore],
  templateUrl: './agent-overview.component.html',
  styleUrl: './agent-overview.component.css'
})
export class AgentOverviewComponent implements OnInit {
  readonly dialog = inject(MatDialog);

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
        this.agent = info.agent || {} as Agents;
        this.mission = info.mission || {} as Missions;
        this.reports = info.reports || [];
      });
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReportsComponent, {});
  }
}
