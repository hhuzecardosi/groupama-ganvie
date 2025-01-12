import {effect, inject} from '@angular/core';
import {getState, patchState, signalStore, withHooks, withState} from '@ngrx/signals';
import {catchError, of} from 'rxjs';

import {Agents} from '../agents/agents.model';
import {MockAgentsService} from '../agents/agents.service';

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
