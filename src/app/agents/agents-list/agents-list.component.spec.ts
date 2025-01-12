import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsListComponent } from './agents-list.component';

describe('AgentListComponent', () => {
  let component: AgentsListComponent;
  let fixture: ComponentFixture<AgentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test the length of agent store', () => {
    expect(component.store.agents().length).toBeGreaterThan(0);
  });
});
