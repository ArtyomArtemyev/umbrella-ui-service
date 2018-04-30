import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../../shared/models/order.model';
import {Subscription} from 'rxjs/Subscription';
import {OrderService} from '../../shared/services/order.service';
import {Message} from '../../shared/models/message.models';
import {Token} from '../../shared/models/token.model';

@Component({
  selector: 'wfm-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  sub2: Subscription;
  message: Message;
  isShowMessageBlock: boolean;
  orders: Order[] = [];
  showOrders: Order[] = [];
  private startIndex = 0;
  private endIndex = 0;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.sub1 = this.orderService.getAllUnprocessedUserOrders().subscribe((response: Order[]) => {
      this.orders = response;
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
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  updateStatusToDone(order: Order) {
    const token: Token = new Token(JSON.parse(window.localStorage.getItem('Bearer')));
    order.token = token;
    this.sub2 = this.orderService.updateOrder(order, order.id)
      .subscribe((response: any) => {
        this.showMessage(new Message('success', 'Изменения сохранены'));
        order.status = 'Обработана';
        order.isShownAdditionalInformation = !order.isShownAdditionalInformation;
      });
  }

  private showMessage(message: Message) {
    this.isShowMessageBlock = true;
    this.message = message;

    window.setTimeout(() => {
      this.isShowMessageBlock = false;
      this.message.text = '';
    }, 500);
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
