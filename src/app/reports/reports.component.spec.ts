import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportsComponent } from './reports.component';
import { ReportsStore } from '../store/reports.store';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import moment from 'moment';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ReportsComponent>>;
  // @ts-ignore
  let mockReportsStore: jasmine.SpyObj<ReportsStore>;
  const mockDialogData = {
    report: { id: '1', agentId: '123', missionId: '456', date: '2023-01-01', body: 'Test report' },
    agentId: '123',
    missionId: '456'
  };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockReportsStore = jasmine.createSpyObj('ReportsStore', ['addReport']);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: ReportsStore, useValue: mockReportsStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize reportText with data from dialog', () => {
    expect(component.reportText).toBe(mockDialogData.report.body);
  });

  it('should call addReport and close the dialog on onClick', () => {
    const reportData = {
      id: jasmine.any(String),
      missionId: mockDialogData.missionId,
      agentId: mockDialogData.agentId,
      date: moment().format(),
      body: component.reportText
    };

    component.onClick();

    expect(mockReportsStore.addReport).toHaveBeenCalledWith(reportData);
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
