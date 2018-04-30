import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../../shared/models/order.model';
import {Subscription} from 'rxjs/Subscription';
import {OrderService} from '../../shared/services/order.service';
import {Token} from '../../shared/models/token.model';

@Component({
  selector: 'wfm-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  orders: Order [] = [];
  showOrders: Order [] = [];
  private startIndex = 0;
  private endIndex = 0;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    const token: Token = new Token(JSON.parse(window.localStorage.getItem('Bearer')));
    this.sub1 = this.orderService.getUserOrder(token)
      .subscribe((userOrdersResponse: Order[]) => {
        userOrdersResponse.map(c => c.isShownAdditionalInformation = false);
        this.orders = userOrdersResponse;
        if (+this.orders.length <= 5) {
          this.endIndex = +this.orders.length;
          this.showOrders = this.orders.slice(this.startIndex, this.endIndex);
        } else {
          this.endIndex = 5;
          this.showOrders = this.orders.slice(this.startIndex, this.endIndex);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  plusPage() {
    if (this.endIndex + 4 > +this.orders.length) {
      this.startIndex = this.endIndex;
      this.endIndex = +this.orders.length;
      this.showOrders = this.orders.slice(this.startIndex, this.endIndex);
    } else {
      this.startIndex = this.endIndex;
      this.endIndex = this.endIndex + 5;
      this.showOrders = this.orders.slice(this.startIndex, this.endIndex);
    }
  }

  minPage() {
    this.endIndex = this.startIndex;
    this.startIndex = this.startIndex - 5;
    this.showOrders = this.orders.slice(this.startIndex, this.endIndex);
  }

}
