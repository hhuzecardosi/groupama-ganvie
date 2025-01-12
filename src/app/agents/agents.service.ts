import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Agents } from './agents.model';

@Injectable({ providedIn: 'root'})
export class AgentsService {
  constructor(private http: HttpClient) {}

  getAgents(): Observable<Array<Agents>> {
    return this.http.get<Array<Agents>>('');
  }
}

@Injectable({ providedIn: 'root'})
export class MockAgentsService {

  MOCK_DATA: Agents[] = [
    { id: '1', codeName: 'Malotru', mission: 'Mission 1' },
    { id: '2', codeName: 'Phénomène', mission: 'Mission 2' },
    { id: '3', codeName: 'Moule à gaufres', mission: 'Mission 3' },
  ]

  constructor() {}

  getAgents(): Observable<Array<Agents>> {
    return of(this.MOCK_DATA);
  }
}
