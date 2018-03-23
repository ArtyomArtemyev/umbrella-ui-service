import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { SystemComponent } from './system.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import {DropdownDirective} from './shared/directives/dropdown.directives';
import { AddInformationCardComponent } from './bill-page/add-information-card/add-information-card.component';
import {AddRoomCardComponent} from './bill-page/add-room-card/add-room-card.component';
import { AddPhotoComponent } from './bill-page/add-photo/add-photo.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule
  ],
  declarations: [
    SystemComponent,
    BillPageComponent,
    HistoryPageComponent,
    PlanningPageComponent,
    RecordsPageComponent,
    SidebarComponent,
    HeaderComponent,
    DropdownDirective,
    AddInformationCardComponent,
    AddRoomCardComponent,
    AddPhotoComponent
  ]
})
export class SystemModule {}
