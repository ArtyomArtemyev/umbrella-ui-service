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

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    const token: Token = new Token(JSON.parse(window.localStorage.getItem('Bearer')));
    this.sub1 = this.orderService.getUserOrder(token)
      .subscribe((userOrdersResponse: Order[]) => {
        userOrdersResponse.map(c => c.isShownAdditionalInformation = false);
        this.orders = userOrdersResponse;
      });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
