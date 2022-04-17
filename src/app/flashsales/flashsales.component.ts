import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-flashsales',
  templateUrl: './flashsales.component.html',
  styleUrls: ['./flashsales.component.css'],
})
export class FlashsalesComponent implements OnInit {
  private subscription: Subscription | undefined;
  @Output() TimerExpired: EventEmitter<any> = new EventEmitter();

  @Input() SearchDate: moment.Moment = moment();
  @Input() ElapsTime: number = 1;

  searchEndDate: moment.Moment;
  remainingTime: number;
  minutes: number;
  seconds: number;

  everySecond: Observable<any> = timer(0, 1000);

  constructor(private ref: ChangeDetectorRef) {
    this.searchEndDate = this.SearchDate.add(this.ElapsTime, 'minutes');
    this.remainingTime = 0;
    this.minutes = 0;
    this.seconds = 0;
  }

  ngOnInit() {
    this.subscription = this.everySecond.subscribe((seconds) => {
      var currentTime: moment.Moment = moment();
      this.remainingTime = this.searchEndDate.diff(currentTime);
      this.remainingTime = this.remainingTime / 1000;

      if (this.remainingTime <= 0) {
        this.SearchDate = moment();
        this.searchEndDate = this.SearchDate.add(this.ElapsTime, 'minutes');

        this.TimerExpired.emit();
      } else {
        this.minutes = Math.floor(this.remainingTime / 60);
        this.seconds = Math.floor(this.remainingTime - this.minutes * 60);
      }
      this.ref.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
