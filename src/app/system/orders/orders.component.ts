import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../../shared/models/order.model';
import {Token} from '../../shared/models/token.model';
import {OrderService} from '../../shared/services/order.service';
import {Subscription} from 'rxjs/Subscription';
import {Message} from '../../shared/models/message.models';

@Component({
  selector: 'wfm-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  message: Message;
  isShowMessageBlock: boolean;
  orders: Order[] = [];
  searchPlaceholder = 'Количество человек';
  searchField = 'countOfMan';
  searchValue = '';

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.sub1 = this.orderService.getAllUserOrders().subscribe((response: Order[]) => {
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

  private showMessage(message: Message) {
    this.isShowMessageBlock = true;
    this.message = message;

    window.setTimeout(() => {
      this.isShowMessageBlock = false;
      this.message.text = '';
    }, 500);
  }

  changeCriteria(field: string) {
    const namesMap = {
      countOfMan: 'Количество человек',
      city: 'Город'
    };
    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }

}
