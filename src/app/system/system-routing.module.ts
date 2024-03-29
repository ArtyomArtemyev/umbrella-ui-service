import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SystemComponent} from './system.component';
import {AddHotelPageComponent} from './add-hotel-page/add-hotel-page.component';
import {HotelsPageComponent} from './hotels-page/hotels-page.component';
import {RoomsPageComponent} from './rooms-page/rooms-page.component';
import {PricePageComponent} from './price-page/price-page.component';
import {UserOrdersComponent} from './user-orders/user-orders.component';
import {OrdersComponent} from './orders/orders.component';
import {ReviewsComponent} from './reviews/reviews.component';
import {TicketsComponent} from './tickets/tickets.component';
import {FindOrderComponent} from './find-order/find-order.component';

const routes: Routes = [
  {
    path: 'system', component: SystemComponent, children: [
      {path: 'add-hotel', component: AddHotelPageComponent},
      {path: 'hotels', component: HotelsPageComponent},
      {path: 'rooms', component: RoomsPageComponent},
      {path: 'price', component: PricePageComponent},
      {path: 'user-orders', component: UserOrdersComponent},
      {path: 'process-orders', component: OrdersComponent},
      {path: 'reviews', component: ReviewsComponent},
      {path: 'tickets', component: TicketsComponent},
      {path: 'find-order', component: FindOrderComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
