import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AgentOverviewComponent } from './agent-overview.component';
import { AgentsStore } from '../../store/agents.store';

describe('AgentOverviewComponent', () => {
  let component: AgentOverviewComponent;
  let fixture: ComponentFixture<AgentOverviewComponent>;
  // @ts-ignore
  let mockAgentsStore: jasmine.SpyObj<AgentsStore>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockAgentsStore = jasmine.createSpyObj('AgentsStore', ['getAgentAllInfo']);
    mockActivatedRoute = {
      params: of({ id: '1' })
    };

    await TestBed.configureTestingModule({
      imports: [AgentOverviewComponent],
      providers: [
        { provide: AgentsStore, useValue: mockAgentsStore },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AgentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch agent information on init', async () => {
    const mockAgentInfo = {
      agent: { id: '1', codeName: 'Malotru', mission: '1' },
      mission: { id: '1', text: 'Mission 456' },
      reports: []
    };
    mockAgentsStore.getAgentAllInfo.and.returnValue(Promise.resolve(mockAgentInfo));

    await component.ngOnInit();

    expect(component.agentId).toBe('1');
    expect(component.agent.id).toEqual(mockAgentInfo.agent.id);
    expect(component.mission.id).toEqual(mockAgentInfo.mission.id);
    expect(component.reports.length).toEqual(mockAgentInfo.reports.length);
  });
});
