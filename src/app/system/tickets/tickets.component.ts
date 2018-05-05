import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderVoyage} from '../../shared/models/order-voyage.model';
import {TicketService} from '../../shared/services/ticktet.service';
import {Subscription} from 'rxjs/Subscription';
import {Token} from '../../shared/models/token.model';
import {Message} from '../../shared/models/message.models';

@Component({
  selector: 'wfm-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  sub2: Subscription;
  orderVoyages: OrderVoyage[] = [];
  showOrderVoyages: OrderVoyage[] = [];
  private startIndex = 0;
  private endIndex = 0;
  message: Message;
  isShowMessageBlock: boolean;

  constructor(private ticketService: TicketService) {
  }

  ngOnInit() {
    this.isShowMessageBlock = false;
    this.sub1 = this.ticketService.getAllOrderVoyage()
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

  updateOrderVoyageStatus(orderVoyage: OrderVoyage) {
    orderVoyage.status = 'Обработана';
    this.sub2 = this.ticketService.changeStatus(orderVoyage)
      .subscribe((response: any) => {
        this.showMessage(new Message('success', 'Изменения сохранены'));
      });
  }

  private showMessage(message: Message) {
    this.isShowMessageBlock = true;
    this.message = message;

    window.setTimeout(() => {
      this.isShowMessageBlock = false;
      this.message.text = '';
    }, 3000);
  }
}
