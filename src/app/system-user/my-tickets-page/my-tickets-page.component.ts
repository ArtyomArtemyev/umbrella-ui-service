import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderVoyage} from '../../shared/models/order-voyage.model';
import {TicketService} from '../../shared/services/ticktet.service';
import {Subscription} from 'rxjs/Subscription';
import {Token} from '../../shared/models/token.model';

@Component({
  selector: 'wfm-my-tickets-page',
  templateUrl: './my-tickets-page.component.html',
  styleUrls: ['./my-tickets-page.component.scss']
})
export class MyTicketsPageComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  orderVoyages: OrderVoyage[] = [];

  constructor(private ticketService: TicketService) {
  }

  ngOnInit() {
    const token: Token = new Token(JSON.parse(window.localStorage.getItem('Bearer')));
    this.sub1 = this.ticketService.findOrderVoyagesForUser(token)
      .subscribe((response: OrderVoyage[]) => {
        response.map(c => c.isShow = false);
        this.orderVoyages = response;
      });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
