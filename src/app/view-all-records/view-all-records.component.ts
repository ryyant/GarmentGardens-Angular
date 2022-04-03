import { Component, OnInit } from '@angular/core';
import { Record } from '../models/record';
import { RecordService } from '../services/record.service';

@Component({
  selector: 'app-view-all-records',
  templateUrl: './view-all-records.component.html',
  styleUrls: ['./view-all-records.component.css'],
})
export class ViewAllRecordsComponent implements OnInit {
  records: Record[] | null;

  constructor(private recordService: RecordService) {
    this.records = new Array();
  }

  ngOnInit(): void {
    this.records = this.recordService.getRecords();
  }
}
