import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DefaultTypeRoom} from '../../system/shared/models/default-type-room.model';
import {Subscription} from 'rxjs/Subscription';
import {TypeRoomService} from '../../shared/services/type-room.service';
import {HotelsService} from '../../shared/services/hotels.service';
import {Hotel} from '../../system/shared/models/hotel.model';
import {NgForm} from '@angular/forms';
import {Message} from '../../shared/models/message.models';

@Component({
  selector: 'wfm-price-room-chart',
  templateUrl: './price-room-chart.component.html',
  styleUrls: ['./price-room-chart.component.scss']
})
export class PriceRoomChartComponent implements OnInit, OnDestroy {
  @ViewChild('defaultTypeOfRoomSelector') defaultTypeOfRoomSelector: ElementRef;
  @ViewChild('hotelSelector') hotelSelector: ElementRef;
  sub1: Subscription;
  hotels: Hotel [];
  defaultTypeRooms: DefaultTypeRoom[];
  showDefaultTypeRoom: DefaultTypeRoom = new DefaultTypeRoom();
  showHotel: Hotel;
  isHotelDefine: boolean;
  isRoomDefine: boolean;
  isShowMessageBlock: boolean;
  message: Message;
  isShowChart: boolean;
  view: any[] = [650, 450];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  data = [] = [];
  currentHotel: Hotel;
  isDefineCurrentHotel: boolean;
  autoScale = true;

  constructor(private defaultTypeRoomService: TypeRoomService, private hotelService: HotelsService) {
  }

  ngOnInit() {
    this.isDefineCurrentHotel = false;
    this.isShowChart = false;
    this.isHotelDefine = false;
    this.isRoomDefine = false;
    this.sub1 = this.hotelService.getHotels()
      .subscribe((response: Hotel[]) => {
        this.currentHotel = response[0];
        this.isDefineCurrentHotel = true;
        this.hotels = response;
        for (let k = 0; k < this.hotels.length; k++) {
          for (let i = 0; i < this.hotels[k].rooms.length; i++) {
            this.hotels[k].rooms[i].isVisible = false;
          }
        }
      });
  }

  definePrice() {
    this.data = [];
    if (!this.isHotelDefine) {
      this.showMessage(new Message('danger', 'Выберите отель из списка'));
    } else {
      if (!this.isRoomDefine) {
        this.showMessage(new Message('danger', 'Выберите тип номера из списка'));
      }
    }
    let price1 = 0;
    for (let i = 0; i < this.hotels.length; i++) {
      if (this.hotels[i].name === this.hotelSelector.nativeElement.value) {
        for (let k = 0; this.hotels[i].servicesPrices.length - 1; k++) {
          if (this.hotels[i].servicesPrices[k].service === this.defaultTypeOfRoomSelector.nativeElement.value) {
            price1 = this.hotels[i].servicesPrices[k].price;
            break;
          }

        }
      }
    }
    this.data.push({
      "name": "Базовая стоимость",
      "value": +price1
    });
    if (this.showDefaultTypeRoom.existBar) {
      let priceBar = +this.showHotel.servicesPrices.find(c => c.service === 'Бар').price;
      this.data.push({
        "name": "Бар",
        "value": +priceBar
      });
    }
    if (this.showDefaultTypeRoom.existChildBed) {
      let priceChildBed = +this.showHotel.servicesPrices.find(c => c.service === "Детская кровать").price;
      this.data.push({
        "name": "Детская кровать",
        "value": +priceChildBed
      });
    }
    if (this.showDefaultTypeRoom.existTV) {
      let priceTV = +this.showHotel.servicesPrices.find(c => c.service === "Телевизор").price;
      this.data.push({
        "name": "Телевизор",
        "value": +priceTV
      });
    }
    if (this.showDefaultTypeRoom.existBalcony) {
      let priceBalcony = +this.showHotel.servicesPrices.find(c => c.service === "Балкон").price;
      this.data.push({
        "name": "Балкон",
        "value": +priceBalcony
      });
    }
    if (this.showDefaultTypeRoom.existBalcony) {
      let priceWifi = +this.showHotel.servicesPrices.find(c => c.service === "Wi-fi").price;
      this.data.push({
        "name": "Wi-fi",
        "value": +priceWifi
      });
    }
    let single: any[];
    single = this.data;
    Object.assign(this, {single});
    this.isShowChart = true;
  }

  getCurrentDefaultTypeOfRoom() {
    console.log(this.defaultTypeOfRoomSelector.nativeElement.value);
    this.showDefaultTypeRoom = this.defaultTypeRooms.find(c => c.typeRoomName === this.defaultTypeOfRoomSelector.nativeElement.value);
    this.isRoomDefine = true;
  }

  getCurrentHotel() {
    console.log(this.hotelSelector.nativeElement.value);
    this.showHotel = this.hotels.find(c => c.name === this.hotelSelector.nativeElement.value);
    this.defaultTypeRooms = this.showHotel.rooms;
    this.isHotelDefine = true;
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
    }, 3000);
  }

}
