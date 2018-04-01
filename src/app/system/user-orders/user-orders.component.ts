import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../../shared/models/order.model';
import {Subscription} from 'rxjs/Subscription';
import {OrderService} from '../../shared/services/order.service';

@Component({
  selector: 'wfm-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  orders: Order[] = [];

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.sub1 = this.orderService.getAllUnprocessedUserOrders().subscribe((response: Order[]) => {
      console.log(response);
      this.orders = response;
      console.log(this.orders);
    });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
