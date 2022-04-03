import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { ViewAllRecordsComponent } from './view-all-records/view-all-records.component';
import { CreateNewRecordComponent } from './create-new-record/create-new-record.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ViewAllRecordsComponent,
    CreateNewRecordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
