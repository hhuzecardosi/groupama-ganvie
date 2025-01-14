import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AgentsStore} from '../../store/agents.store';
import {ReportsStore} from '../../store/reports.store';
import {Agents} from '../agents.model';
import {Missions} from '../../missions/missions.model';
import {MatDialog} from '@angular/material/dialog';
import {ReportsComponent} from '../../reports/reports.component';
import {AsyncPipe, NgForOf} from '@angular/common';
import {firstValueFrom, Observable} from 'rxjs';
import {Reports} from '../../reports/reports.model';

@Component({
  selector: 'app-agent-overview',
  imports: [
    NgForOf,
    AsyncPipe
  ],
  providers: [AgentsStore],
  templateUrl: './agent-overview.component.html',
  styleUrl: './agent-overview.component.css'
})
export class AgentOverviewComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  private agentStore = inject(AgentsStore);
  protected reportsStore = inject(ReportsStore);

  agentId!: string;
  agent!: Agents;
  mission!: Missions;
  reports$!: Observable<{id: string, date: string}[]>;

  constructor(private route: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.agentId = params['id'];
      this.agentStore.getAgentAllInfo(this.agentId).then((info) => {
        this.agent = info.agent || {} as Agents;
        this.mission = info.mission || {} as Missions;
        this.reports$ = this.reportsStore.getReportsListByAgentAndMission(this.agent?.id, this.mission?.id);
      });
    });
  }

  async openDialog(reportId: string): Promise<void> {
    const report =
      this.reportsStore.reports().find(report => report.id === reportId) ||
      await firstValueFrom(this.reportsStore.getReportById(reportId)) || {} as Reports;
    const dialogRef = this.dialog.open(ReportsComponent, {
      maxHeight: '100%',
      maxWidth: '100%',
      width: '80%',
      height: '80%',
      data: {report, agentId: this.agent.id, missionId: this.mission.id}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.reports$ = this.reportsStore.getReportsListByAgentAndMission(this.agent.id, this.mission.id);
    });
  }
}
