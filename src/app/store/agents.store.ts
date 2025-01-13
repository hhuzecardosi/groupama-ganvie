import {effect, inject} from '@angular/core';
import {getState, patchState, signalStore, withHooks, withMethods, withState} from '@ngrx/signals';
import {catchError, firstValueFrom, of } from 'rxjs';

import {Agents} from '../agents/agents.model';
import {MockAgentsService} from '../agents/agents.service';
import {MockMissionsService} from '../missions/missions.service';

type AgentsState = {
  isLoading: boolean;
  agents: Agents[];
  initialized: boolean;
  authorities: string[];
}

const initialState: AgentsState = {
  isLoading: false,
  initialized: false,
  agents: [],
  authorities: ['READ_ONLY']
}

export const AgentsStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store, missionService = inject(MockMissionsService)) => ({
    getAgents: () => getState(store).agents,
    getMissionById(id: string) {
      return missionService.getMissionById(id);
    },
    async getAgentAllInfo(id: string) {
      return {
        agent: getState(store).agents.find(agent => agent.id === id),
        mission: await firstValueFrom(missionService.getMissionById(id)),
        reports: []
      }
    }
  })),
  withHooks({
    onInit(store, agentsService = inject(MockAgentsService)) {
      patchState(store, {isLoading: true});
      effect(() => {
        const state = getState(store);
        if (state.initialized) {}
      });
      agentsService.getAgents()
        .pipe(
          catchError((error) => {
              console.error('Error loading agents', error);
              return of([]);
            }
          ))
        .subscribe((agents) => {
          patchState(store, {agents, isLoading: false, initialized: true});
        });
    },
  }),
);
