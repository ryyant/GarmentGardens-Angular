import { Injectable } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Record } from '../models/record';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  records: Record[] | null;

  constructor(private sessionService: SessionService) {
    this.records = this.sessionService.getRecords();

    if (this.records == null) {
      this.records = new Array();

      let record: Record;
      record = new Record(1, 'Record A');
      this.records.push(record);
      record = new Record(2, 'Record B');
      this.records.push(record);
      record = new Record(3, 'Record C');
      this.records.push(record);
      record = new Record(4, 'Record D');
      this.records.push(record);
      record = new Record(5, 'Record E');
      this.records.push(record);

      this.sessionService.setRecords(this.records);
    }
  }

  getRecords() {
    return this.records;
  }

  createNewRecord(newRecord: Record) {
    if (this.records != null) {
      let record: Record = new Record();
      record.recordId = newRecord.recordId;
      record.recordName = newRecord.recordName;

      this.records.push(record);

      this.sessionService.setRecords(this.records);
    }
  }
}
