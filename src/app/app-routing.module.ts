import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadingReportComponent } from './feature/reading-report/reading-report.component';
const routes: Routes = [
  {
    path: '',
    component: ReadingReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
