import { Component, OnInit } from '@angular/core';
import { Record } from '../models/record';
import { RecordService } from '../services/record.service';

@Component({
  selector: 'app-create-new-record',
  templateUrl: './create-new-record.component.html',
  styleUrls: ['./create-new-record.component.css'],
})
export class CreateNewRecordComponent implements OnInit {
  record: Record;

  constructor(private recordService: RecordService) {
    this.record = new Record();
  }

  createRecord() {
    this.recordService.createNewRecord(this.record);
  }

  ngOnInit(): void {}
}
