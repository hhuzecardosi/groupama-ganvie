import { TestBed } from '@angular/core/testing';
import { AgentsStore } from './agents.store';

describe('AgentsStore', () => {
  it('should verify that the agents store is initialized with 3', () => {
    const store = TestBed.inject(AgentsStore);
    expect(store.agents().length).toEqual(3);
  });
});
