import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Hotel} from '../../system/shared/models/hotel.model';
import {NgForm} from '@angular/forms';
import {Message} from '../../shared/models/message.models';
import {HotelsService} from '../../shared/services/hotels.service';
import {FindHotel} from '../../system/shared/models/find-hotel.model';
import {HotelSuggestion} from '../shared/models/hotel-suggestion.model';
import {Subscription} from 'rxjs/Subscription';
import {OrderSuggestion} from '../shared/models/order-suggestion.model';
import {Token} from '../../shared/models/token.model';
import {Order} from '../../shared/models/order.model';
import {OrderService} from '../../shared/services/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'wfm-find-hotel-for-order-page',
  templateUrl: './find-hotel-for-order-page.component.html',
  styleUrls: ['./find-hotel-for-order-page.component.scss']
})
export class FindHotelForOrderPageComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  sub2: Subscription;

  message: Message;
  isShowMessageBlock: boolean;
  hotels: Hotel [] = [];
  hotelSuggestions: HotelSuggestion [] = [];
  startDate: Date = new Date();
  endDate: Date = new Date();
  countOfMan: number;

  @ViewChild('showMessageBlock') showMessageBlock: ElementRef;
  existChildBedInRoom: boolean;

  constructor(private hotelService: HotelsService, private orderService: OrderService, private router: Router) {
  }

  ngOnInit() {
    this.existChildBedInRoom = false;
    this.isShowMessageBlock = false;
  }

  onSubmit(form: NgForm) {
    console.log(form);
    const {childBedInRoom, findHotelPageCityInput, findHotelPageCountMenDiv, findHotelPageDateEndInput, findHotelPageDateInput} = form.value;
    if (findHotelPageCountMenDiv <= 0) {
      this.showMessage(new Message('danger', 'Количество человек не может быть меньше нуля или равным нулю'));
    } else {
      if (new Date(findHotelPageDateEndInput) <= new Date(findHotelPageDateInput)) {
        this.showMessage(new Message('danger', 'Дата выезда не может быть раньше даты заезда или быть одинаковой'));
      } else {
        const findHotelObject = new FindHotel(this.existChildBedInRoom, findHotelPageCityInput, +findHotelPageCountMenDiv, findHotelPageDateInput, findHotelPageDateEndInput);
        this.sub1 = this.hotelService.findHotel(findHotelObject)
          .subscribe((response: HotelSuggestion []) => {
            this.hotelSuggestions = response;
            this.hotelSuggestions.map(c => c.isShowSuggestion = false);
            this.hotelSuggestions.map(c => c.orderSuggestions.map(oc => oc.isShow = false));
            this.startDate = findHotelPageDateInput;
            this.endDate = findHotelPageDateEndInput;
            this.countOfMan = findHotelPageCountMenDiv;
            console.log(this.hotelSuggestions);
          });
      }
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

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  createOrder(hotelSuggestion: HotelSuggestion, orderSuggestion: OrderSuggestion) {
    const token: Token = new Token(JSON.parse(window.localStorage.getItem('Bearer')));
    const order: Order = new Order(hotelSuggestion.hotel, hotelSuggestion.hotel.city, this.startDate, this.endDate, this.countOfMan, orderSuggestion, 'В ожидании обработки', token);
    this.sub2 = this.orderService.createOrder(order, token).subscribe((response: Order) => {
      if (response !== undefined) {
        this.showMessage(new Message('success', 'Заказ успешно оформлен. Следите за его статусом'));
        window.setTimeout(() => {
          this.router.navigate(['/system-user', 'orders']);
        }, 2000);
      }
    });
  }
}
