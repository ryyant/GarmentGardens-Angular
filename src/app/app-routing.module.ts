import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewAllRecordsComponent } from './view-all-records/view-all-records.component';
import { CreateNewRecordComponent } from './create-new-record/create-new-record.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'viewAllRecords', component: ViewAllRecordsComponent },
  { path: 'createNewRecord', component: CreateNewRecordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
