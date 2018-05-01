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
  sub2: Subscription;
  message: Message;
  isShowMessageBlock: boolean;
  orders: Order[] = [];
  showOrders: Order[] = [];
  searchPlaceholder = 'Количество человек';
  searchField = 'countOfMan';
  searchValue = '';
  private startIndex = 0;
  private endIndex = 0;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.sub1 = this.orderService.getAllUserOrders().subscribe((response: Order[]) => {
      console.log(response);
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
      city: 'Город',
      id: 'Номер'
    };
    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
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

  updateStatusToDone(order: Order) {
    console.log(order);
    const token: Token = new Token(JSON.parse(window.localStorage.getItem('Bearer')));
    order.token = token;
    order.status = 'Обработана';
    this.sub2 = this.orderService.updateOrder(order, order.id)
      .subscribe((response: any) => {
        this.showMessage(new Message('success', 'Изменения сохранены'));
        order.isShownAdditionalInformation = !order.isShownAdditionalInformation;
      });
  }

}
