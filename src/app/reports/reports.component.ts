import {Component, inject, OnInit} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import moment from 'moment';
import {Reports} from './reports.model';
import {NgIf} from '@angular/common';
import {ReportsStore} from '../store/reports.store';

interface ReportsDialogData {
  report: Reports;
  agentId: string;
  missionId: string;
}

@Component({
  selector: 'app-reports',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    FormsModule,
    NgIf
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<ReportsComponent>);
  readonly data = inject<ReportsDialogData>(MAT_DIALOG_DATA);

  readonly store = inject(ReportsStore);

  reportText = this.data.report.body || '';

  ngOnInit() {
  }


  onClick() {
    const reportData = {
      id: new Date().getTime().toString(),
      missionId: this.data.missionId,
      agentId: this.data.agentId,
      date: moment().format(),
      body: this.reportText
    };
    console.log('Report data:', reportData);
    this.store.addReport(reportData);
    this.dialogRef.close();
  }
}
