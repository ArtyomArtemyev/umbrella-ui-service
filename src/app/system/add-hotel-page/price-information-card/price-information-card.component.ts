import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DefaultTypeRoom} from '../../shared/models/default-type-room.model';
import {NgForm} from '@angular/forms';
import {ServicePrice} from '../../shared/models/service-price.model';

@Component({
  selector: 'wfm-price-imformation-card',
  templateUrl: './price-information-card.component.html',
  styleUrls: ['./price-information-card.component.scss']
})
export class PriceInformationCardComponent implements OnInit {
  @Input() rooms: DefaultTypeRoom [];
  @Output('onAddServicePrice') onAddServicePrice =  new EventEmitter<ServicePrice[]>();
  servicesPrices: ServicePrice [] = [];

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < this.rooms.length; i++) {
      let singelServicePrice: ServicePrice = new ServicePrice(this.rooms[i].typeRoomName, 0);
      this.servicesPrices.push(singelServicePrice);
    }
    this.servicesPrices.push(new ServicePrice('Телевизор', 0));
    this.servicesPrices.push(new ServicePrice('Бар', 0));
    this.servicesPrices.push(new ServicePrice('Балкон', 0));
    this.servicesPrices.push(new ServicePrice('Wi-fi', 0));
    this.servicesPrices.push(new ServicePrice('Детская кровать', 0));
  }

  onSubmit(form: NgForm) {
    console.log(form);
    console.log(this.servicesPrices);
    this.onAddServicePrice.emit(this.servicesPrices);
  }

}
