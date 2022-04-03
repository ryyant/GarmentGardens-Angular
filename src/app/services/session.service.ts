import { Injectable } from '@angular/core';
import { Record } from '../models/record';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  getRecords(): Record[] | null {
    try {
      return JSON.parse(sessionStorage['records']);
    } catch {
      return null;
    }
  }

  setRecords(records: Record[]): void {
    sessionStorage['records'] = JSON.stringify(records);
  }
}
