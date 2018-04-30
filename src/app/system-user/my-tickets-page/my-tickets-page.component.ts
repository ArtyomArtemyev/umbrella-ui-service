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
  showOrderVoyages: OrderVoyage[] = [];
  private startIndex = 0;
  private endIndex = 0;

  constructor(private ticketService: TicketService) {
  }

  ngOnInit() {
    const token: Token = new Token(JSON.parse(window.localStorage.getItem('Bearer')));
    this.sub1 = this.ticketService.findOrderVoyagesForUser(token)
      .subscribe((response: OrderVoyage[]) => {
        response.map(c => c.isShow = false);
        this.orderVoyages = response;
        if (+this.orderVoyages.length <= 5) {
          this.endIndex = +this.orderVoyages.length;
          this.showOrderVoyages = this.orderVoyages.slice(this.startIndex, this.endIndex);
        } else {
          this.endIndex = 5;
          this.showOrderVoyages = this.orderVoyages.slice(this.startIndex, this.endIndex);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  plusPage() {
    if (this.endIndex + 4 > +this.orderVoyages.length) {
      this.startIndex = this.endIndex;
      this.endIndex = +this.orderVoyages.length;
      this.showOrderVoyages = this.orderVoyages.slice(this.startIndex, this.endIndex);
    } else {
      this.startIndex = this.endIndex;
      this.endIndex = this.endIndex + 5;
      this.showOrderVoyages = this.orderVoyages.slice(this.startIndex, this.endIndex);
    }
  }

  minPage() {
    this.endIndex = this.startIndex;
    this.startIndex = this.startIndex - 5;
    this.showOrderVoyages = this.orderVoyages.slice(this.startIndex, this.endIndex);
  }

}
