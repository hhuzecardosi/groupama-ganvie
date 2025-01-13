import { TestBed } from '@angular/core/testing';
import { AgentsStore } from './agents.store';
import {Missions} from '../missions/missions.model';

describe('AgentsStore', () => {
  it('should verify that the agents store is initialized with 3', () => {
    const store = TestBed.inject(AgentsStore);
    expect(store.agents().length).toEqual(3);
  });
  it('should return the mission with the id 1', () => {
    const store = TestBed.inject(AgentsStore);
    store.getMissionById('1').subscribe((mission) => {
      const receivedMission: Missions = mission as Missions;
      expect(receivedMission?.id).toEqual('1');
      expect(receivedMission?.text.startsWith('Clément')).toBeTrue();
    });
  });
});
