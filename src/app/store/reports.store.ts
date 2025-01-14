import {patchState, signalStore, type, withComputed, withMethods, withState} from '@ngrx/signals';

import {Reports} from '../reports/reports.model';
import {computed, inject} from '@angular/core';
import {MockReportsService} from '../reports/reports.service';
import {map, Observable} from 'rxjs';
import {withEntities} from '@ngrx/signals/entities';

type ReportState = {
  isLoading: boolean;
  reports: Reports[];
  initialized: boolean;
}

const initialState: ReportState = {
  isLoading: false,
  initialized: false,
  reports: [],
};

export const ReportsStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withEntities({entity: type<{id: string, date: string}[]>(), collection: 'reportList'}),
  withEntities({entity: type<Reports[]>(), collection: 'reports'}),
  withComputed(({reports}) => ({
    listReports: computed(() => reports().map(report => ({id: report.id, date: report.date}))),
    sortReports: computed(() => reports().sort((a, b) => a.date.localeCompare(b.date)))
  })),
  withMethods((store, reportService = inject(MockReportsService)) => ({
   /*
   * Methods to add
   * 1. Get reports list (id/date) by mission and agent
   * 2. Get a specific report by its id
   * 3. Add a report to the store
   * */
    getReportsListByAgentAndMission(agentId: string, missionId: string): Observable<{ id: string, date: string }[]> {
      return reportService.getReports()
        .pipe(map(reports => {
          const storeReports = store.reports();
          const filteredReports = reports.filter(report => report.agentId === agentId && report.missionId === missionId);

          let ids = storeReports.map(report => report.id);
          patchState(store, state => ({...state, reports: [...storeReports, ...filteredReports.filter(report => !ids.includes(report.id))]}))
          return store.listReports().sort((a, b) => a.date.localeCompare(b.date));
        }));
    },
    getReportById(id: string): Observable<Reports | undefined> {
      return reportService.getReports()
        .pipe(map(reports => {
          const storeReports = store.reports();
          let ids = storeReports.map(report => report.id);
          patchState(store, state => ({...state, reports: [...storeReports, ...reports.filter(report => !ids.includes(report.id))]}));
          return reports.find(report => report.id === id)
        }));
    },
    addReport(report: Reports): void {
      patchState(store, state => ({...state, reports: [...state.reports, report]}));
    },
  }))
);
