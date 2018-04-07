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
    let typeRoomsWithFilter: string [] ;
    typeRoomsWithFilter = PriceInformationCardComponent.getTypeRoomName(this.rooms);
    for (let i = 0; i < typeRoomsWithFilter.length; i++) {
      let singelServicePrice: ServicePrice = new ServicePrice(typeRoomsWithFilter[i], 0, true);
      this.servicesPrices.push(singelServicePrice);
    }

  }

  static getTypeRoomName(inisialRooms: DefaultTypeRoom []): string[] {
    let set = new Set();
    let typeRoomNames: string[] = [];
    inisialRooms.map(c => set.add(c.typeRoomName))
    console.log(set);
    set.forEach( c => typeRoomNames.push(c));
    console.log(typeRoomNames);
    return typeRoomNames;
  }

  onSubmit(form: NgForm) {
    console.log(form);
    console.log(this.servicesPrices);
    this.onAddServicePrice.emit(this.servicesPrices);
  }

}
