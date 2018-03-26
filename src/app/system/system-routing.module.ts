import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SystemComponent} from './system.component';
import {AddHotelPageComponent} from './add-hotel-page/add-hotel-page.component';
import {HotelsPageComponent} from './hotels-page/hotels-page.component';

const routes: Routes = [
  {
    path: 'system', component: SystemComponent, children: [
      {path: 'add-hotel', component: AddHotelPageComponent},
      {path: 'hotels', component: HotelsPageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
