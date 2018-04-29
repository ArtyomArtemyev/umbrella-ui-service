import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-user-routing.module';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {SystemUserComponent} from './system-user.component';
import {HeaderComponent} from './shared/header/header.component';
import {DropdownDirective} from './shared/directives/dropdown.directives';
import {FindHotelForOrderPageComponent} from './find-hotel-for-order-page/find-hotel-for-order-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { PriceRoomChartComponent } from './price-room-chart/price-room-chart.component';
import { FindTicketsPageComponent } from './find-tickets-page/find-tickets-page.component';
import { MyTicketsPageComponent } from './my-tickets-page/my-tickets-page.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { HotelsReviewsComponent } from './hotels-reviews/hotels-reviews.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule
  ],
  declarations: [
    SystemUserComponent,
    SidebarComponent,
    HeaderComponent,
    DropdownDirective,
    FindHotelForOrderPageComponent,
    OrdersPageComponent,
    PriceRoomChartComponent,
    FindTicketsPageComponent,
    MyTicketsPageComponent,
    ReviewPageComponent,
    HotelsReviewsComponent
  ]
})
export class SystemUserModule {
}
