import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { SystemComponent } from './system.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import {DropdownDirective} from './shared/directives/dropdown.directives';
import { AddHotelPageComponent } from './add-hotel-page/add-hotel-page.component';
import { MainInformationCardComponent } from './add-hotel-page/main-information-card/main-information-card.component';
import { RoomInformationCardComponent } from './add-hotel-page/room-information-card/room-information-card.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule
  ],
  declarations: [
    SystemComponent,
    HistoryPageComponent,
    PlanningPageComponent,
    RecordsPageComponent,
    SidebarComponent,
    HeaderComponent,
    DropdownDirective,
    AddHotelPageComponent,
    MainInformationCardComponent,
    RoomInformationCardComponent
  ]
})
export class SystemModule {}
