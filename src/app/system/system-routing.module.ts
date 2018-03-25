import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SystemComponent} from './system.component';
import {HistoryPageComponent} from './history-page/history-page.component';
import {PlanningPageComponent} from './planning-page/planning-page.component';
import {RecordsPageComponent} from './records-page/records-page.component';
import {AddHotelPageComponent} from './add-hotel-page/add-hotel-page.component';
import {HotelsPageComponent} from './hotels-page/hotels-page.component';

const routes: Routes = [
  {path: 'system', component: SystemComponent, children: [
      {path: 'history', component: HistoryPageComponent},
      {path: 'planning', component: PlanningPageComponent},
      {path: 'records', component: RecordsPageComponent},
      {path: 'add-hotel', component: AddHotelPageComponent},
      {path: 'hotels', component: HotelsPageComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
