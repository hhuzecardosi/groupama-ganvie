import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgentOverviewComponent } from './agents/agent-overview/agent-overview.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'agent/:id', component: AgentOverviewComponent },
];
