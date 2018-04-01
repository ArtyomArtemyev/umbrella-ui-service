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
    PriceRoomChartComponent
  ]
})
export class SystemUserModule {
}
