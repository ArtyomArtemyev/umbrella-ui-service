import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {SystemUserComponent} from './system-user.component';
import {FindHotelForOrderPageComponent} from './find-hotel-for-order-page/find-hotel-for-order-page.component';

const routes: Routes = [
  {
    path: 'system-user', component: SystemUserComponent, children: [
      {path: 'order/find-hotel', component: FindHotelForOrderPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
