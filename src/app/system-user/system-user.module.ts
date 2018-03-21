import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-user-routing.module';
import {BillPageComponent} from './bill-page/bill-page.component';
import {HistoryPageComponent} from './history-page/history-page.component';
import {PlanningPageComponent} from './planning-page/planning-page.component';
import {RecordsPageComponent} from './records-page/records-page.component';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {SystemUserComponent} from './system-user.component';
import { HeaderComponent } from './shared/header/header.component';
import {DropdownDirective} from './shared/directives/dropdown.directives';
import { FindPanelComponent } from './bill-page/find-panel/find-panel.component';
import { ResultPanelComponent } from './bill-page/result-panel/result-panel.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule
  ],
  declarations: [
    SystemUserComponent,
    BillPageComponent,
    HistoryPageComponent,
    PlanningPageComponent,
    RecordsPageComponent,
    SidebarComponent,
    HeaderComponent,
    DropdownDirective,
    FindPanelComponent,
    ResultPanelComponent
  ]
})
export class SystemUserModule {}
