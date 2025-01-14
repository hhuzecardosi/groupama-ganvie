import {patchState, signalStore, type, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';

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
    getReportsListByAgentAndMission(agentId: string, missionId: string): Observable<{ id: string, date: string }[]> {
      return reportService.getReports()
        .pipe(map(reports => {
          const storeReports = store.reports()
          const storeIds = storeReports.map(report => report.id);

          patchState(store, state => ({...state, reports: [...storeReports, ...reports.filter(report => !storeIds.includes(report.id))]}));
          return store.reports().filter(report => report.agentId === agentId && report.missionId === missionId)
            .map(report => ({id: report.id, date: report.date}));
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
  })),
  withHooks((store, reportService = inject(MockReportsService)) => ({
    onInit() {
      patchState(store, {isLoading: true});
      reportService.getReports()
        .subscribe((reports) => {
          patchState(store, {reports, isLoading: false, initialized: true});
        });
    },
  }))
);
