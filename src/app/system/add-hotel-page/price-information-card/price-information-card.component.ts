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
  @Output('onAddServicePrice') onAddServicePrice = new EventEmitter<ServicePrice[]>();
  servicesPrices: ServicePrice [] = [];

  constructor() {
  }

  ngOnInit() {
    this.servicesPrices.push(new ServicePrice('Телевизор', 0, false));
    this.servicesPrices.push(new ServicePrice('Бар', 0, false));
    this.servicesPrices.push(new ServicePrice('Балкон', 0, false));
    this.servicesPrices.push(new ServicePrice('Wi-fi', 0, false));
    this.servicesPrices.push(new ServicePrice('Детская кровать', 0, false));
    let typeRoomsWithFilter: DefaultTypeRoom [] ;
    typeRoomsWithFilter = this.filterRooms(this.rooms);
    for (let i = 0; i < typeRoomsWithFilter.length; i++) {
      let singelServicePrice: ServicePrice = new ServicePrice(typeRoomsWithFilter[i].typeRoomName, 0, true);
      this.servicesPrices.push(singelServicePrice);
    }

  }

  filterRooms(inisialRooms: DefaultTypeRoom []): DefaultTypeRoom [] {
    let filterTypeRooms: DefaultTypeRoom [] = [];
    console.log(inisialRooms);
    filterTypeRooms.push(inisialRooms[0]);
    if (inisialRooms.length !== 1) {
      for (let i = 1; i < inisialRooms.length; i++) {
        for (let k = 0; k < filterTypeRooms.length; k++) {
          if (filterTypeRooms[k].typeRoomName !== inisialRooms[i].typeRoomName) {
            filterTypeRooms.push(inisialRooms[i]);
          }
        }
      }
    }
    console.log(filterTypeRooms);
    return filterTypeRooms;
  }

  onSubmit(form: NgForm) {
    console.log(form);
    console.log(this.servicesPrices);
    this.onAddServicePrice.emit(this.servicesPrices);
  }

}
