import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HotelsService} from '../../shared/services/hotels.service';
import {Subscription} from 'rxjs/Subscription';
import {NgForm} from '@angular/forms';
import {Token} from '../../shared/models/token.model';
import {User} from '../../shared/models/user.model';
import {Hotel} from '../shared/models/hotel.model';
import {Message} from '../../shared/models/message.models';
import {Review} from '../../shared/models/review.model';
import {OrderService} from '../../shared/services/order.service';
import {TicketService} from '../../shared/services/ticktet.service';
import {Order} from '../../shared/models/order.model';
import {OrderVoyage} from '../../shared/models/order-voyage.model';

@Component({
  selector: 'wfm-find-order',
  templateUrl: './find-order.component.html',
  styleUrls: ['./find-order.component.scss']
})
export class FindOrderComponent implements OnInit, OnDestroy {
  @ViewChild('typeOfFindSelector') typeOfFindSelector: ElementRef;
  findCriteria: string;
  hotels: Hotel [] = [];
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  @ViewChild('review') review: ElementRef;
  user: User;
  message: Message;
  isShowMessageBlock: boolean;
  showNoFind: boolean;

  order: Order;
  orderVoyage: OrderVoyage;

  constructor(private orderService: OrderService, private ticketService: TicketService) {
  }

  ngOnInit() {
    this.isShowMessageBlock = false;
    this.showNoFind = false;
  }

  setTypeOfFind() {
    this.findCriteria = this.typeOfFindSelector.nativeElement.value;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (this.showNoFind) {
      this.showNoFind = false;
      this.order = undefined;
      this.orderVoyage = undefined;
    }
    if (this.typeOfFindSelector.nativeElement.value === 'findOrder') {
      this.sub1 = this.orderService.getOrderById(form.value.valueForFind)
        .subscribe((response: Order []) => {
          if (response.length === 0) {
            this.showNoFind = true;
          } else {
            response[0].isShownAdditionalInformation = false;
            this.order = response[0];
            // response.map(c => c.isShownAddInformation = false);
            // this.hotels = [];
            // this.hotels = response;
          }
        });
    } else {
      this.sub2 = this.ticketService.getTicktetById(form.value.valueForFind)
        .subscribe((response: OrderVoyage []) => {
          if (response.length === 0) {
            this.showNoFind = true;
          } else {
            response[0].isShow = false;
            this.orderVoyage = response[0];
            // response.map(c => c.isShownAddInformation = false);
            // this.hotels = [];
            // this.hotels = response;
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
    if (this.sub3) {
      this.sub3.unsubscribe();
    }
  }

  private showMessage(message: Message) {
    this.isShowMessageBlock = true;
    this.message = message;

    window.setTimeout(() => {
      this.isShowMessageBlock = false;
      this.message.text = '';
    }, 3000);
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

  updateOrderVoyageStatus(orderVoyage: OrderVoyage) {
    orderVoyage.status = 'Обработана';
    this.sub2 = this.ticketService.changeStatus(orderVoyage)
      .subscribe((response: any) => {
        this.showMessage(new Message('success', 'Изменения сохранены'));
      });
  }

}
