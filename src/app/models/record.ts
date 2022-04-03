export class Record {
  recordId: number | undefined;
  recordName: string | undefined;

  constructor(recordId?: number, recordName?: string) {
    this.recordId = recordId;
    this.recordName = recordName;
  }
}
